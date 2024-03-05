import { HUBSPOT_FORMS } from '@shared/constants/forms';

export const useHubSpotForm = () => {
  const submitHubSpotForm = async ({
    portalId,
    formId,
    formData,
  }: HubSpotForm) => {
    const formFields = Object.keys(formData).map((key: string) => {
      return {
        objectTypeId: HUBSPOT_FORMS.register.objectTypeId,
        name: key,
        value: formData[key],
      };
    });

    try {
      await window.fetch(
        `https://api.hsforms.com/submissions/v3/integration/submit/${portalId}/${formId}`,
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
    } catch (err: any) {
      console.error('Error occured while submitting data to HubSpot', err);
    }
  };

  return {
    submitHubSpotForm,
  };
};
