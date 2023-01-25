import { styles } from './OrganizationManagement.styles';
import { OrganizationInvitations } from './OrganizationInvitations/OrganizationInvitations';
import { OrganizationsList } from './OrganizationList/OrganizationList';
import { PageTitle } from '@shared/components';
import { useRecoilValue } from 'recoil';
import { organizationAtoms } from '@modules/organization/store/organizationAtoms';
import { wrapper } from 'styles/wrapper.styles';

export const OrganizationManagement = () => {
  const invititations = useRecoilValue(
    organizationAtoms.organizationReceivedInvitations,
  );
  return (
    <>
      <PageTitle title="Organizations" />
      <div css={[styles.wrapper, wrapper.main]}>
        <div css={styles.contentWrapper}>
          <OrganizationsList />
          {Boolean(invititations?.length) && <OrganizationInvitations />}
        </div>
      </div>
    </>
  );
};
