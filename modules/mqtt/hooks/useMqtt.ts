import { useCallback, useEffect, useRef, useState } from 'react';
import { useRecoilValue } from 'recoil';
import mqtt, { MqttClient, IClientOptions } from 'mqtt';
import { env } from '@shared/constants/env';
import { getActiveTopic } from '@modules/mqtt';
import { useUpdates as useNodeUpdates } from '@modules/node';
import {
  useUpdates as useOrgUpdates,
  organizationAtoms,
} from '@modules/organization';
import { arraysEqual } from 'utils/arraysEqual';
import { getIdentity } from '@modules/grpc';

type IMqttHook = {
  connect: VoidFunction;
  client: MqttClient | null;
  error?: Error | null;
  message?: Message | null;
  connectStatus: ConnectionStatus;
  updateConnection: VoidFunction;
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

  const mqttConnect = () => {
    if (client) return;
    setConnectStatus('Connecting');

    const options: IClientOptions = {
      clean: true,
      reconnectPeriod: 1000,
      transformWsUrl: (url, options, client) => {
        const token: string = getIdentity()?.accessToken;

        client.options.username = token;
        client.options.password = token;

        return url;
      },
    };

    setClient(mqtt.connect(env.mqttUrl!, options));
  };

  const mqttUpdateSubscription = () => {
    if (!client) return;

    const topics = [
      `/orgs/${defaultOrganization?.id}`,
      `/orgs/${defaultOrganization?.id}/nodes`,
    ];

    mqttUnSubscribe(topics);
    mqttSubscribe(topics);
  };

  const mqttSubscribe = (topics: string[]) => {
    client?.subscribe(topics, (err: Error) => {
      if (err) {
        console.error(`Failed to subscribe to ${topics}: ${err}`);
        return;
      }

      subscribedTopics.current = topics;
    });
  };

  const mqttUnSubscribe = (topics: string[]) => {
    if (
      subscribedTopics.current.length &&
      !arraysEqual(subscribedTopics.current, topics)
    ) {
      client?.unsubscribe(subscribedTopics.current, (err: Error) => {
        if (err) {
          console.error(
            `Failed to unsubscribe from ${subscribedTopics.current}: ${err}`,
          );
          return;
        }
        subscribedTopics.current = [];
      });
    }
  };

  const mqttDisconnect = () => {
    if (client) {
      client.end(true, () => {
        setConnectStatus('Connect');
        setError(null);
        setMessage(null);
        subscribedTopics.current = [];
      });
    }
  };

  useEffect(() => {
    if (client) {
      client.on('connect', () => {
        console.log('Connected to broker.');
        setConnectStatus('Connected');
        mqttUpdateSubscription();
      });

      client.on('error', (err: Error) => {
        console.error('Connection error: ', err);
        setError(err);
        mqttDisconnect();
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

      client?.on('close', () => {
        console.log('Disconnected from broker.');
        setConnectStatus('Connect');
      });

      client?.on('offline', () => {
        console.log('MQTT client offline');
        setConnectStatus('Connect');
      });
    }
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

  return {
    connect: mqttConnect,
    client,
    error,
    message,
    connectStatus,
    updateConnection: mqttUpdateSubscription,
  };
};

export default useMqtt;
