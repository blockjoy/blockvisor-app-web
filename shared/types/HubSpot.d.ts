type HubSpotForm = {
  formId: string;
  formData: HubSpotFormData;
  callback?: (message?: string) => void;
};

type HubSpotFormData = {
  email?: string;
  firstname?: string;
  lastname?: string;
  node_info?: HubSpotFormNodeInfo;
  what_network_s__?: string;
};

type HubSpotFormResponse = {
  inlineMessage?: string;
};
