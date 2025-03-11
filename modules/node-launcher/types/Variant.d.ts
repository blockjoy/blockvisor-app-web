type NodeLauncherStep = 'protocol' | 'config' | 'checkout' | 'summary';

type Variant = {
  client?: string;
  network?: string;
  nodeType?: string;
};
