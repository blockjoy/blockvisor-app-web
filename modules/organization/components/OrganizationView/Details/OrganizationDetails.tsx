import { useIdentity } from '@modules/auth';
import { mapOrganizationDetails } from '@modules/organization';
import { useGetOrganization } from '@modules/organization/hooks/useGetOrganization';
import { DetailsTable, FormHeaderCaps } from '@shared/components';
import { styles } from './OrganizationDetails.styles';

export function OrganizationDetails() {
  const { organization } = useGetOrganization();

  const { user } = useIdentity();

  const details = mapOrganizationDetails(organization, user?.userId!);

  return (
    <section css={styles.section}>
      <span css={styles.detailsHeaderMobile}>
        <FormHeaderCaps noBottomMargin>Details</FormHeaderCaps>
      </span>
      <DetailsTable bodyElements={details ?? []} />
    </section>
  );
}
