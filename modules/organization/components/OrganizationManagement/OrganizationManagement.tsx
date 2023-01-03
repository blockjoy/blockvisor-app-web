import { styles } from './OrganizationManagement.styles';
import { OrganizationInvitations } from './OrganizationInvitations/OrganizationInvitations';
import { OrganizationsList } from './OrganizationList/OrganizationList';
import { PageTitle, PageSection } from '@shared/components';
import { useSetRecoilState } from 'recoil';
import { layoutState } from '@modules/layout/store/layoutAtoms';

export const OrganizationManagement = () => {
  const setLayout = useSetRecoilState(layoutState);
  const handleCreateClicked = () => {
    setLayout('organization');
  };

  return (
    <div css={styles.wrapper}>
      <PageTitle
        title="Organizations"
        actionOnClick={handleCreateClicked}
      ></PageTitle>
      <div css={styles.contentWrapper}>
        <OrganizationsList />
        <OrganizationInvitations />
      </div>
    </div>
  );
};
