import { selector } from 'recoil';
import { Org } from '@modules/grpc/library/blockjoy/v1/org';
import { organizationAtoms } from '@modules/organization';

const defaultOrganization = selector<Org | null>({
  key: 'organization.default.details',
  get: ({ get }) => {
    const defaultOrganizationIdentity = get(
      organizationAtoms.defaultOrganization,
    );
    const allOrgs = get(organizationAtoms.allOrganizations);

    const activeOrg =
      allOrgs?.find(
        (organization: Org) =>
          organization.id === defaultOrganizationIdentity?.id,
      ) ?? null;

    return activeOrg;
  },
});

export const organizationSelectors = {
  defaultOrganization,
};
