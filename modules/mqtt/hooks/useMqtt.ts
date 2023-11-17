import { useCallback, useEffect, useRef, useState } from 'react';
import { useRecoilValue } from 'recoil';
import mqtt, { MqttClient, IClientOptions } from 'mqtt';
import { env } from '@shared/constants/env';
import { getActiveTopic, createWebWorker, keepAlive } from '@modules/mqtt';
import { useUpdates as useNodeUpdates } from '@modules/node';
import {
  useUpdates as useOrgUpdates,
  organizationAtoms,
} from '@modules/organization';
import { getIdentity } from '@modules/grpc';

type IMqttHook = {
  connect: VoidFunction;
  reconnect: VoidFunction;
  client: MqttClient | null;
  error?: Error | null;
  message?: Message | null;
  connectStatus: ConnectionStatus;
  updateSubscription: VoidFunction;
};

export const useMqtt = (): IMqttHook => {
  const { handleNodeUpdate } = useNodeUpdates();
  const { handleOrganizationUpdate } = useOrgUpdates();

  const defaultOrganization = useRecoilValue(
    organizationAtoms.defaultOrganization,
  );

  const [client, setClient] = useState<MqttClient | null>(null);
  const [connectStatus, setConnectStatus] =
    useState<ConnectionStatus>('Connect');
  const [message, setMessage] = useState<Message | null>(null);
  const [error, setError] = useState<Error | null>(null);

  const subscribedTopics = useRef<string[]>([]);

  const keepAliveWorker = useRef<Worker | null>(null);

  const mqttConnect = () => {
    if (client?.connected) return;
    setConnectStatus('Connecting');

    const options: IClientOptions = {
      protocolVersion: 5,
      clean: true,
      reconnectPeriod: 1000,
      keepalive: 0,
      transformWsUrl: (url, options, client) => {
        const token: string = getIdentity()?.accessToken;

        client.options.username = token;
        client.options.password = token;

        return url;
      },
    };

    try {
      const mqttClient = mqtt.connect(env.mqttUrl!, options);
      setClient(mqttClient);
    } catch (err: any) {
      console.error('Error while connecting to MQTT client', error);
    }
  };

  const mqttUpdateSubscription = () => {
    if (!client || !client.connected || !defaultOrganization) return;

    const topics = [
      `/orgs/${defaultOrganization.id}`,
      `/orgs/${defaultOrganization.id}/nodes`,
    ];

    if (subscribedTopics.current.length) mqttUnSubscribe();
    mqttSubscribe(topics);
  };

  const mqttSubscribe = (topics: string[]) => {
    if (!client?.connected) return;
    client?.subscribe(topics, (err: Error | null) => {
      if (err) {
        console.error(`Failed to subscribe to ${topics}: ${err}`);
        return;
      }

      subscribedTopics.current = topics;
    });
  };

  const mqttUnSubscribe = () => {
    if (!client?.connected) return;
    client?.unsubscribe(subscribedTopics.current, (err?: Error) => {
      if (err) {
        console.error(
          `Failed to unsubscribe from ${subscribedTopics.current}: ${err}`,
        );
        return;
      }
      subscribedTopics.current = [];
    });
  };

  const mqttReconnect = async () => {
    if (!client || client.reconnecting) return;
    console.log('Attempting MQTT reconnection...');

    if (client.disconnected || client.disconnecting) handleReconnect();
    else
      client.end(false, () => {
        handleReconnect();
      });
  };

  useEffect(() => {
    if (client) {
      client.on('connect', () => {
        setConnectStatus('Connected');
        mqttUpdateSubscription();
        setError(null);

        manageKeepAliveWorker();
      });

      client.on('error', (err: Error) => {
        console.error('Connection error: ', err, client);
        setError(err);
        mqttReconnect();
      });

      client.on('reconnect', () => {
        console.log('Reconnecting');
        setConnectStatus('Reconnecting');
      });

      client.on('message', (topic: string, payload: Uint8Array) => {
        console.log({ topic, payload });
        try {
          handleMessage(topic, payload);
        } catch (err) {
          console.error(`Failed to handle message: ${err}`);
        }
      });

      client.on('close', () => {
        console.log('Disconnected from broker.');
        keepAliveWorker.current?.terminate();
        setConnectStatus('Connect');
      });

      client.on('offline', () => {
        console.log('MQTT client offline');
        setConnectStatus('Connect');
      });

      client.on('packetreceive', () => {
        client.pingResp = true;
      });
    }

    return () => {
      client?.end();
    };
  }, [client]);

  useEffect(() => {
    if (!message) return;

    switch (message.type) {
      case 'nodes':
        handleNodeUpdate(message);
        break;
      case 'organization':
        handleOrganizationUpdate(message);
        break;
      default:
        break;
    }

    return () => setMessage(null);
  }, [message]);

  const handleMessage = useCallback((topic: string, payload: Uint8Array) => {
    const type: Topic = getActiveTopic(topic);

    setMessage({ type, topic, payload });
  }, []);

  const handleReconnect = () => {
    if (!client) return;

    const token: string = getIdentity()?.accessToken;

    client.options.username = token;
    client.options.password = token;

    client.reconnect();
  };

  const manageKeepAliveWorker = () => {
    if (!keepAliveWorker.current) return;

    keepAliveWorker.current = createWebWorker(keepAlive);
    keepAliveWorker.current?.addEventListener('message', (event: any) => {
      (client as any)._sendPacket({ cmd: 'pingreq' });
    });
  };

  return {
    connect: mqttConnect,
    reconnect: mqttReconnect,
    client,
    error,
    message,
    connectStatus,
    updateSubscription: mqttUpdateSubscription,
  };
};

export default useMqtt;
