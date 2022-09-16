import { apiClient } from '@modules/client';
import { Organization, Uuid } from 'blockjoy-mock-grpc/dist/out/common_pb';
import { useRecoilState } from 'recoil';
import { organisationAtoms } from '../store/organisationAtoms';
import { delay } from '../utils/delay';
import { isStatusResponse } from '../utils/typeGuards';

function randomIntFromInterval(min: number, max: number) {
  return Math.floor(Math.random() * (max - min + 1) + min);
}

export const useOrganisations = () => {
  const [organisations, setOrganisations] = useRecoilState(
    organisationAtoms.allOrganisations,
  );

  const currentOrg =
    (organisations.organisations && organisations.organisations[0].name) ?? '';

  const noOfMembers = organisations?.organisations?.reduce(
    (acc, org) => acc + (org?.memberCount ?? 0),
    0,
  );

  const noOfOrganisations = organisations?.organisations?.length ?? 0;

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

  const createOrganisation = async (name: string) => {
    setOrganisations({ isLoading: true });

    const organisation = new Organization();
    const uuid = new Uuid();
    uuid.setValue(Math.random().toString());
    organisation.setId(uuid);
    organisation.setName(name);
    organisation.setMemberCount(randomIntFromInterval(1, 100));

    const clientOrganisation: Organisation = {
      name: organisation.getName(),
      id: { value: organisation.getId()?.toString() ?? '' },
      memberCount: organisation.getMemberCount(),
    };

    //const res = await apiClient.createOrganization(organisation);

    await delay(2000);
    setOrganisations({
      organisations: [
        ...(organisations?.organisations ?? []),
        clientOrganisation,
      ],
      isLoading: false,
    });
  };

  const removeOrganisation = async (id: string) => {
    const orgs = organisations.organisations?.filter(
      (org) => org.id?.value !== id,
    );

    //const res = await apiClient.deleteOrganization()
    setOrganisations({ organisations: orgs });
  };

  return {
    organisations: organisations?.organisations,
    loadingOrganizations: Boolean(organisations?.isLoading),
    getOrganizations,
    createOrganisation,
    noOfMembers,
    noOfOrganisations,
    currentOrg,
  };
};
