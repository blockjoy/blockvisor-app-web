import { styles } from './OrganizationManagement.styles';
import { OrganizationInvitations } from './OrganizationInvitations/OrganizationInvitations';
import { OrganizationsList } from './OrganizationList/OrganizationList';
import { PageTitle } from '@shared/components';
import { useRecoilValue } from 'recoil';
import { organizationAtoms } from '@modules/organization/store/organizationAtoms';

export const OrganizationManagement = () => {
  const invititations = useRecoilValue(
    organizationAtoms.organizationReceivedInvitations,
  );

  return (
    <div css={styles.wrapper}>
      <PageTitle title="Organizations" />
      <div css={styles.contentWrapper}>
        <OrganizationsList />
        {Boolean(invititations?.length) && <OrganizationInvitations />}
      </div>
    </div>
  );
};
