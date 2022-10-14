import { PageSection } from '@modules/app/components/shared';
import { AppLayout } from '@modules/layout';
import { ChangePassword, EditUser, PageTitle } from '@modules/profile';
import { Tabs } from '@shared/components';
import { spacing } from 'styles/utils.spacing.styles';

const Profile = () => {
  const items = [
    {
      label: 'Personal Information',
      value: '1',
      component: <EditUser />,
    },
    {
      label: 'Account',
      value: '2',
      component: (
        <>
          <h2 css={spacing.bottom.large}>Change Password</h2>
          <ChangePassword />
        </>
      ),
    },
  ];
  return (
    <>
      <PageTitle title="Settings" />
      <PageSection>
        <Tabs tabItems={items} />
      </PageSection>
    </>
  );
};

export default Profile;

Profile.getLayout = function getLayout(page: any) {
  return <AppLayout>{page}</AppLayout>;
};
