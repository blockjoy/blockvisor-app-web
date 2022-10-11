import { apiClient } from '@modules/client';
import { Organization } from '@blockjoy/blockjoy-grpc/dist/out/common_pb';
import { useState } from 'react';
import { useRecoilState } from 'recoil';
import { organisationAtoms } from '../store/organisationAtoms';

import { isStatusResponse } from '../utils/typeGuards';
import { delay } from '@shared/utils/delay';
import { env } from '@shared/constants/env';

// used for generating mock member count
function randomIntFromInterval(min: number, max: number) {
  return Math.floor(Math.random() * (max - min + 1) + min);
}

export const useOrganisations = () => {
  const [loading, setIsLoading] = useState(false);
  const [organisations, setOrganisations] = useRecoilState(
    organisationAtoms.allOrganisations,
  );
  const [selectedOrganisation, setSelectedOrganisation] = useRecoilState(
    organisationAtoms.selectedOrganisation,
  );

  const getOrganizations = async () => {
    setIsLoading(true);

    const res: any = await apiClient.getOrganizations();

    console.log('organizations', res);

    await delay(env.loadingDuration);

    setOrganisations(res);
    setIsLoading(false);
  };

  const getOrganisation = async (id: string) => {
    setIsLoading(true);
    // mocked part
    const res: any = await apiClient.getOrganizations();
    setSelectedOrganisation(res[0]);
    await delay(2000);
    setIsLoading(false);
  };

  const selectOrganisation = (id: string) => {
    const selectedOrg = organisations.find((org) => org.id?.value === id);

    if (selectedOrg) {
      setSelectedOrganisation(selectedOrg);
    }
  };

  const renameOrganisation = (id: string, name: string) => {
    //mocked
    const org = organisations.find((org) => org.id?.value === id);

    if (org) {
      org.name = name;
    }
  };

  const updateOrganisation = async (id: string, name: string) => {
    const organisation = new Organization();
    const uuid = id;
    organisation.setName(name);
    const res = await apiClient.updateOrganization(organisation);

    //mocked part
    const selected = { ...selectedOrganisation, name };
    setSelectedOrganisation(selected);
    const found = organisations.find((org) => org.id?.value === id);
    const others = organisations.filter((org) => org.id?.value !== id);

    if (found) {
      const updated = { ...found, name };

      setOrganisations([...(others ?? []), updated]);
    }
  };

  const createOrganisation = async (name: string) => {
    setIsLoading(true);

    const organisation = new Organization();
    const uuid = Math.random().toString();
    organisation.setId(uuid);
    organisation.setName(name);
    organisation.setMemberCount(randomIntFromInterval(1, 100));

    const clientOrganisation: Organisation = {
      name: organisation.getName(),
      id: { value: organisation.getId()?.toString() ?? '' },
      memberCount: organisation.getMemberCount(),
    };

    const res = await apiClient.createOrganization(organisation);

    await delay(env.loadingDuration);
    setOrganisations([...(organisations ?? []), clientOrganisation]);
  };

  const removeOrganisation = async (id: string) => {
    const orgs = organisations.filter((org) => org.id?.value !== id);
    const uuid = id;
    const res = await apiClient.deleteOrganization(uuid);
    setOrganisations(orgs);
  };

  return {
    organisations: organisations,
    loadingOrganizations: loading,
    selectedOrganisation,
    getOrganizations,
    createOrganisation,
    removeOrganisation,
    selectOrganisation,
    updateOrganisation,
    getOrganisation,
    renameOrganisation,
  };
};
