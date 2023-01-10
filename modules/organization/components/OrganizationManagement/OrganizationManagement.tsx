import { styles } from './OrganizationManagement.styles';
import { OrganizationInvitations } from './OrganizationInvitations/OrganizationInvitations';
import { OrganizationsList } from './OrganizationList/OrganizationList';
import { PageTitle, PageSection } from '@shared/components';
import { useSetRecoilState, useRecoilValue } from 'recoil';
import { layoutState } from '@modules/layout/store/layoutAtoms';
import { organizationAtoms } from '@modules/organization/store/organizationAtoms';

export const OrganizationManagement = () => {
  const setLayout = useSetRecoilState(layoutState);
  const invititations = useRecoilValue(
    organizationAtoms.organizationReceivedInvitations,
  );
  const handleCreateClicked = () => {
    setLayout('organization');
  };

  return (
    <div css={styles.wrapper}>
      <PageTitle
        title="Organization Management"
        actionOnClick={handleCreateClicked}
      ></PageTitle>
      <div css={styles.contentWrapper}>
        <OrganizationsList />
        {Boolean(invititations?.length) && <OrganizationInvitations />}
      </div>
    </div>
  );
};
