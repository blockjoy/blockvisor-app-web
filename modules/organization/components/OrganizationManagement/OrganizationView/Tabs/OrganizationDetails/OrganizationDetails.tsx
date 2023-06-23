import { getOrganizationDetails } from '@modules/organization';
import { useGetOrganization } from '@modules/organization/hooks/useGetOrganization';
import { DetailsTable } from '@shared/components';

type Props = {
  name?: string;
  id?: string;
};

type OrganizationDetailsForm = {
  name: string;
};

export function OrganizationDetails() {
  const { organization } = useGetOrganization();

  const details = getOrganizationDetails(organization);

  return <DetailsTable bodyElements={details ?? []} />;
}
