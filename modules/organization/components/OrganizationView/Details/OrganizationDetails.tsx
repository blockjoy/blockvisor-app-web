import { useIdentity } from '@modules/auth';
import { getOrganizationDetails } from '@modules/organization';
import { useGetOrganization } from '@modules/organization/hooks/useGetOrganization';
import { DetailsTable, FormHeaderCaps } from '@shared/components';
import { spacing } from 'styles/utils.spacing.styles';

export function OrganizationDetails() {
  const { organization } = useGetOrganization();

  const { user } = useIdentity();

  const details = getOrganizationDetails(organization, user?.id!);

  return (
    <section css={spacing.top.small}>
      <FormHeaderCaps noBottomMargin>Details</FormHeaderCaps>
      <DetailsTable bodyElements={details ?? []} />
    </section>
  );
}
