import { apiClient } from '@modules/client';
import { Organization } from '@blockjoy/blockjoy-grpc/dist/out/common_pb';
import { useState } from 'react';
import { useRecoilState } from 'recoil';
import { organisationAtoms } from '../store/organizationAtoms';
import { delay } from '@shared/utils/delay';
import { env } from '@shared/constants/env';
import {
  getDefaultOrgFromStorage,
  saveDefaultOrgToStorage,
} from '@shared/utils/browserStorage';

// used for generating mock member count
function randomIntFromInterval(min: number, max: number) {
  return Math.floor(Math.random() * (max - min + 1) + min);
}

export const useOrganizations = () => {
  const [loading, setIsLoading] = useState(false);
  const [organizations, setOrganizations] = useRecoilState(
    organisationAtoms.allOrganizations,
  );
  const [selectedOrganization, setSelectedOrganization] = useRecoilState(
    organisationAtoms.selectedOrganization,
  );

  const [defaultOrganization, setDefaultOrganization] = useRecoilState(
    organisationAtoms.defaultOrganization,
  );

  const getOrganizations = async () => {
    setIsLoading(true);

    const res: any = await apiClient.getOrganizations();
    await delay(env.loadingDuration);

    setOrganizations(res);

    setIsLoading(false);
  };

  const getDefaultOrganization = async () => {
    setIsLoading(true);

    const defaultOrg = getDefaultOrgFromStorage();

    console.log('defaultOrg', defaultOrg);

    if (!defaultOrg) {
      const res: any = await apiClient.getOrganizations();

      console.log('organizations', res);

      await delay(env.loadingDuration);

      const { name, id } = res[0];
      saveDefaultOrgToStorage(name, id);
      setDefaultOrganization({ name, id });
      return;
    }
    setDefaultOrganization({
      name: defaultOrg.name ?? '',
      id: defaultOrg.id ?? '',
    });
    setIsLoading(false);
  };

  const getOrganization = async (id: string) => {
    setIsLoading(true);
    // mocked part
    const res: any = await apiClient.getOrganizations();
    setSelectedOrganization(res[0]);
    await delay(2000);
    setIsLoading(false);
  };

  const selectOrganization = (id: string) => {
    const selectedOrg = organizations.find((org) => org.id?.value === id);

    if (selectedOrg) {
      setSelectedOrganization(selectedOrg);
    }
  };

  const renameOrganization = (id: string, name: string) => {
    //mocked
    const org = organizations.find((org) => org.id?.value === id);

    if (org) {
      org.name = name;
    }
  };

  const updateOrganization = async (id: string, name: string) => {
    const organisation = new Organization();
    const uuid = id;
    organisation.setName(name);
    const res = await apiClient.updateOrganization(organisation);

    //mocked part
    const selected = { ...selectedOrganization, name };
    setSelectedOrganization(selected);
    const found = organizations.find((org) => org.id?.value === id);
    const others = organizations.filter((org) => org.id?.value !== id);

    if (found) {
      const updated = { ...found, name };

      setOrganizations([...(others ?? []), updated]);
    }
  };

  const createOrganization = async (name: string) => {
    setIsLoading(true);

    const organization = new Organization();
    const uuid = Math.random().toString();
    organization.setId(uuid);
    organization.setName(name);
    organization.setMemberCount(randomIntFromInterval(1, 100));

    const clientOrganization: ClientOrganization = {
      name: organization.getName(),
      id: { value: organization.getId()?.toString() ?? '' },
      memberCount: organization.getMemberCount(),
    };

    const res = await apiClient.createOrganization(organization);

    await delay(env.loadingDuration);
    setOrganizations([...(organizations ?? []), clientOrganization]);
  };

  const removeOrganization = async (id: string) => {
    const orgs = organizations.filter((org) => org.id?.value !== id);
    const uuid = id;
    const res = await apiClient.deleteOrganization(uuid);
    setOrganizations(orgs);
  };

  return {
    organizations,
    loadingOrganizations: loading,
    selectedOrganization,
    defaultOrganization,
    getDefaultOrganization,
    getOrganizations,
    createOrganization,
    removeOrganization,
    selectOrganization,
    updateOrganization,
    getOrganization,
    renameOrganization,
  };
};
