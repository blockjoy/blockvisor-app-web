import { useCallback, useEffect, useRef, useState } from 'react';
import mqtt, { MqttClient, IClientOptions } from 'mqtt';
import { useRecoilValue } from 'recoil';
import { env } from '@shared/constants/env';
import { getActiveChannel } from '@modules/mqtt';
import { useUpdates as useNodeUpdates } from '@modules/node';
import {
  useUpdates as useOrgUpdates,
  organizationAtoms,
} from '@modules/organization';
import { arraysEqual } from 'utils/arraysEqual';
import { useIdentity } from '@modules/auth';
import { authClient, getIdentity } from '@modules/grpc';

export const useMqtt = (): IMqttHook => {
  const [error, setError] = useState<string | null>(null);
  const [message, setMessage] = useState<Message | null>(null);
  const [connectStatus, setConnectStatus] =
    useState<ConnectionStatus>('Connect');

  const defaultOrganization = useRecoilValue(
    organizationAtoms.defaultOrganization,
  );

  const client = useRef<MqttClient | null>(null);

  const currentOrganization = useRef<string>('');

  const subscribedChannels = useRef<string[]>([]);
  const activeChannels = useRef<string[]>([]);

  const { handleNodeUpdate } = useNodeUpdates();
  const { handleOrganizationUpdate } = useOrgUpdates();

  const connect = async () => {
    await authClient.refreshToken();

    const token: string = getIdentity()?.accessToken;

    if (!token) {
      console.log('ERROR CONNECTING: No valid token');
      return;
    }

    const options: IClientOptions = {
      clean: true,
      username: token,
      password: token,
      reconnectPeriod: 10000,
    };

    if (defaultOrganization?.id === currentOrganization.current) return;
    currentOrganization.current = defaultOrganization?.id!;

    if (defaultOrganization?.id) {
      activeChannels.current = [
        `/orgs/${defaultOrganization?.id}`,
        `/orgs/${defaultOrganization?.id}/nodes`,
      ];
    }

    mqttDisconnect();

    const mqttClient: MqttClient = mqttConnect(options);

    mqttClient.on('connect', () => {
      console.log('CONNECTED', mqttClient);
      if (!mqttClient.connected && !mqttClient.reconnecting) mqttReconnect();

      setConnectStatus('Connected');
      client.current = mqttClient;

      if (
        subscribedChannels.current.length &&
        !arraysEqual(subscribedChannels.current, activeChannels.current)
      ) {
        mqttClient.unsubscribe(subscribedChannels.current, (err: any) => {
          if (err) {
            console.error(
              `Failed to unsubscribe from ${subscribedChannels.current}: ${err}`,
            );
            return;
          }
          subscribedChannels.current = [];
          console.log(`Unsubscribed from ${subscribedChannels.current}`);
        });
      }

      mqttClient.subscribe(activeChannels.current, (err: any) => {
        if (err) {
          console.error(
            `Failed to subscribe to ${activeChannels.current}: ${err}`,
          );
          return;
        }
        subscribedChannels.current = activeChannels.current;

        mqttClient.on('message', (channel: string, payload: any) => {
          try {
            handleMessage(channel, payload);
          } catch (err) {
            console.error(`Failed to handle message: ${err}`);
          }
        });
      });
    });

    mqttClient.on('error', (err: any) => {
      console.error(`MQTT connection error: ${err}`);
      mqttDisconnect();
      setError(err);
    });

    mqttClient.on('reconnect', () => {
      console.log('reconnecting');
      setConnectStatus('Reconnecting');
    });

    mqttClient.on('offline', () => {
      console.log('MQTT client offline');
      setConnectStatus('Connect');
    });

    mqttClient.on('close', () => {
      console.log('Disconnected from broker.');
      setConnectStatus('Connect');
    });

    // TODO: handle disconnect
    // return () => mqttDisconnect();
  };

  const handleMessage = useCallback((channel: string, payload: any) => {
    const type: Channel = getActiveChannel(channel);

    setMessage({ type, channel, payload });
  }, []);

  const mqttConnect = (options: any) => {
    setConnectStatus('Connecting');
    console.log('MQTT Connect - URL: ', env.mqttUrl!);
    return mqtt.connect(env.mqttUrl!, options);
  };

  const mqttReconnect = () => {
    if (
      client.current &&
      !client.current.connected &&
      !client.current.reconnecting
    ) {
      console.log('Attempting MQTT reconnection...', connectStatus);
      client.current.reconnect();
    }
  };

  const mqttDisconnect = () => {
    if (client.current) {
      console.log('MQTT client disconnected');
      client.current.end(true, () => {
        setConnectStatus('Connect');
        client.current = null;
        setError(null);
        setMessage(null);
        subscribedChannels.current = [];
      });
    }
  };

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

  return { connect, client, error, message, connectStatus };
};

export default useMqtt;
