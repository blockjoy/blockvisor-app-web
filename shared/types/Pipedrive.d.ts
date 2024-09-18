type PipedriveRequest = {
  endpoint: string;
  method: 'GET' | 'POST' | 'PUT';
  body: Record<string, any> | null = null;
  params: Record<string, any> | null = null;
};

type PipedriveResponse = {
  success?: boolean;
  data?: any;
  error?: string;
};

type PipedriveAddLeadParams = {
  nodeInfo?: string;
  nodeIssues?: string;
};

type PipedriveRegisterFormParams = {
  user?: User | null;
};

type PipedriveNodeLauncherFormParams = {
  leadData?: PipedriveAddLeadParams;
  callback?: (message?: string) => void;
};
