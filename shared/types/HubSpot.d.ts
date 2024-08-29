type HubSpotForm = {
  formId: string;
  formData: HubSpotFormData;
  callback?: (message?: string) => void;
};

type HubSpotFormData = {
  email?: string;
  firstname?: string;
  lastname?: string;
  node_info?: string;
  node_issues?: string;
};

type HubSpotFormResponse = {
  inlineMessage?: string;
};
