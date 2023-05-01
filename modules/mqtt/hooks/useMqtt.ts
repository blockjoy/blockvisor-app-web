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
import { authAtoms } from '@modules/auth';

// hardcode eqmx url for testing
const EQMX_URL: string = `wss://mqtt.dev.blockjoy.com:8084/mqtt`;

export const useMqtt = (): IMqttHook => {
  const [error, setError] = useState<string | null>(null);
  const [message, setMessage] = useState<Message | null>(null);
  const [connectStatus, setConnectStatus] =
    useState<ConnectionStatus>('Connect');

  const user = useRecoilValue(authAtoms.user);
  const defaultOrganization = useRecoilValue(
    organizationAtoms.defaultOrganization,
  );

  const client = useRef<MqttClient | null>(null);

  const currentOrganization = useRef<string>('');

  const subscribedChannels = useRef<string[]>([]);
  const activeChannels = useRef<string[]>([]);

  const { handleNodeUpdate } = useNodeUpdates();
  const { handleOrganizationUpdate } = useOrgUpdates();

  const token: string = Buffer.from(user?.accessToken!, 'base64').toString(
    'binary',
  );

  const options: IClientOptions = {
    clean: true,
    username: token,
    password: token,
    reconnectPeriod: 10000,
  };

  useEffect(() => {
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
        mqttClient.unsubscribe(subscribedChannels.current, (err: string) => {
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

    mqttClient.on('error', (err: string) => {
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

    return () => mqttDisconnect();
  }, [user?.accessToken]);

  const handleMessage = useCallback((channel: string, payload: any) => {
    const type: Channel = getActiveChannel(channel);

    setMessage({ type, channel, payload });
  }, []);

  const mqttConnect = (options: any) => {
    setConnectStatus('Connecting');

    console.log('EQMX URL: ', EQMX_URL);

    return mqtt.connect(EQMX_URL, options);
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

  return { client, error, message, connectStatus };
};

export default useMqtt;
