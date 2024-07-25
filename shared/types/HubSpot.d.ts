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
};

type HubSpotFormResponse = {
  inlineMessage?: string;
};
