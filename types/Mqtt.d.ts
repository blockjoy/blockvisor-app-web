interface IMqttHook {
  client: MqttClient | null;
  error?: string | null;
  message?: Message | null;
  connectStatus: ConnectionStatus;
}

type ConnectionStatus = 'Connect' | 'Connecting' | 'Connected' | 'Reconnecting';

type Channel = 'organization' | 'nodes' | null;

type Message = {
  type: Channel;
  channel: string;
  payload: any;
};
