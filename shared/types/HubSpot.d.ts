type HubSpotForm = {
  formId: string;
  formData: HubSpotFormData;
  callback?: VoidFunction;
};

type HubSpotFormData = {
  email?: string;
  firstname?: string;
  lastname?: string;
  node_info?: HubSpotFormNodeInfo;
  what_network_s__?: string;
};
