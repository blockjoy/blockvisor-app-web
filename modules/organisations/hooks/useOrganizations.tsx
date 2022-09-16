import { apiClient } from '@modules/client';
import { useRecoilState } from 'recoil';
import { organisationAtoms } from '../store/organisationAtoms';
import { isStatusResponse } from '../utils/typeGuards';

const delay = (ms: number) => new Promise((resolve) => setTimeout(resolve, ms));

export const useOrganisations = () => {
  const [organisations, setOrganisations] = useRecoilState(
    organisationAtoms.allOrganisations,
  );

  const getOrganizations = async () => {
    setOrganisations({ isLoading: true });

    const res = await apiClient.getOrganizations();
    await delay(2000);

    if (isStatusResponse(res)) {
      setOrganisations({ organisations: [], isLoading: false });
    } else {
      setOrganisations({ organisations: res, isLoading: false });
    }
  };

  return {
    organisations: organisations?.organisations,
    loadingOrganizations: Boolean(organisations?.isLoading),
    getOrganizations,
  };
};
