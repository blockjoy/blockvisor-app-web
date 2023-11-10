type ConnectionStatus = 'Connect' | 'Connecting' | 'Connected' | 'Reconnecting';

type Topic = 'organization' | 'nodes' | null;

type Message = {
  type: Channel;
  topic: string;
  payload: Uint8Array;
};
