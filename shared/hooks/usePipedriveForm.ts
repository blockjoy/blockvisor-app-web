import { useRef } from 'react';
import { useRecoilValue } from 'recoil';
import { organizationSelectors } from '@modules/organization';
import { authAtoms } from '@modules/auth';
import { Pipedrive } from '@shared/index';

type UsePipedriveFormHook = {
  registerForm: ({ user }: PipedriveRegisterFormParams) => Promise<void>;
  nodeLauncherForm: ({
    leadData,
    callback,
  }: PipedriveNodeLauncherFormParams) => Promise<void>;
};

export const usePipedriveForm = (): UsePipedriveFormHook => {
  const user = useRecoilValue(authAtoms.user);
  const defaultOrganization = useRecoilValue(
    organizationSelectors.defaultOrganization,
  );
  const externalOrganizationID = useRef<number | null>(null);
  const externalPersonID = useRef<number | null>(null);

  const registerForm = async ({ user }: PipedriveRegisterFormParams) => {
    try {
      // Create a person during registration
      const addPersonResponse = await Pipedrive.addPerson(
        user,
        externalOrganizationID.current,
      );

      if (!addPersonResponse.success)
        throw new Error(`AddPerson Error ${addPersonResponse.error}`);
    } catch (err: any) {
      console.log('Error occured while submitting data to the Pipedrive', err);
    }
  };

  const nodeLauncherForm = async ({
    leadData,
    callback,
  }: PipedriveNodeLauncherFormParams) => {
    try {
      // Search for an existing external organization by OrgID
      const searchOrganizationResponse = await Pipedrive.searchOrganization(
        defaultOrganization?.id,
      );

      if (!searchOrganizationResponse.success)
        throw new Error(
          `SearchOrganization Error ${searchOrganizationResponse.error}`,
        );

      // If the organization exists, store its external ID
      if (searchOrganizationResponse?.data?.items?.[0]?.item?.id) {
        externalOrganizationID.current =
          searchOrganizationResponse?.data?.items?.[0]?.item?.id;
      } else {
        // If the organization does not exist, create a new one
        const addOrganizationResponse = await Pipedrive.addOrganization(
          defaultOrganization?.name,
          defaultOrganization?.id,
        );

        if (!addOrganizationResponse.success)
          throw new Error(
            `AddOrganization Error ${addOrganizationResponse.error}`,
          );

        externalOrganizationID.current = addOrganizationResponse?.data?.id;
      }

      // Search for an existing external person by email
      const searchPersonResponse = await Pipedrive.searchPerson(user?.email);

      if (!searchPersonResponse.success)
        throw new Error(`SearchPerson Error ${searchPersonResponse.error}`);

      // If the person exists, store their external ID
      if (searchPersonResponse?.data?.items?.[0]?.item?.id) {
        externalPersonID.current =
          searchPersonResponse?.data?.items?.[0]?.item?.id;

        // If the person doesn't belong to an external org, update their profile
        if (
          searchPersonResponse?.data?.items?.[0]?.item?.organization?.id !==
          externalOrganizationID.current
        ) {
          const updatePersonResponse = await Pipedrive.updatePerson(
            externalPersonID.current,
            externalOrganizationID.current,
          );

          if (!updatePersonResponse.success)
            throw new Error(`UpdatePerson Error ${updatePersonResponse.error}`);
        }
      } else {
        // If the person does not exist, create a new one
        const addPersonResponse = await Pipedrive.addPerson(
          user,
          externalOrganizationID.current,
        );

        if (!addPersonResponse.success)
          throw new Error(`AddPerson Error ${addPersonResponse.error}`);

        externalPersonID.current = addPersonResponse?.data?.id;
      }

      // Add a lead associated with the external person and external organization
      const addLeadResponse = await Pipedrive.addLead(
        user,
        leadData,
        externalPersonID.current,
        externalOrganizationID.current,
      );

      if (!addLeadResponse.success)
        throw new Error(`AddLead Error ${addLeadResponse.error}`);

      callback?.(
        addLeadResponse.success
          ? 'Thank you for your interest in launching a node! We have received your request and will contact you shortly.'
          : '',
      );
    } catch (err: any) {
      console.log('Error occured while submitting data to the Pipedrive', err);
    }
  };

  return {
    registerForm,
    nodeLauncherForm,
  };
};
