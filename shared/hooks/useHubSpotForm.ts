type UseHubSpotFormHook = {
  submitForm: ({ formId, formData }: HubSpotForm) => Promise<void>;
};

export const useHubSpotForm = (): UseHubSpotFormHook => {
  const submitForm = async ({ formId, formData, callback }: HubSpotForm) => {
    const formFields = Object.keys(formData).map((key: string) => {
      return {
        objectTypeId: '0-1',
        name: key,
        value: formData[key],
      };
    });

    try {
      await window.fetch(
        `https://api.hsforms.com/submissions/v3/integration/submit/23318034/${formId}`,
        {
          method: 'POST',
          headers: {
            'content-type': 'application/json;charset=UTF-8',
          },
          body: JSON.stringify({
            submittedAt: new Date().getTime(),
            fields: formFields,
          }),
        },
      );

      callback?.();
    } catch (err: any) {
      console.error('Error occured while submitting data to HubSpot', err);
    }
  };

  return {
    submitForm,
  };
};
