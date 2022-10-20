import { authAtoms } from '@modules/auth';
import { AppLayout } from '@modules/layout';
import { ChangePassword, EditUser, PageTitle } from '@modules/profile';
import { PageSection, Tabs } from '@shared/components';
import { useTabs } from '@shared/index';
import { useRouter } from 'next/router';
import { useMemo } from 'react';
import { useRecoilValue } from 'recoil';
import { spacing } from 'styles/utils.spacing.styles';

const Profile = () => {
  const user = useRecoilValue(authAtoms.user);
  const { push } = useRouter();
  const tabItems = useMemo(
    () => [
      {
        label: 'Personal Information',
        value: '1',
        component: (
          <EditUser
            firstName={user?.firstName}
            lastName={user?.lastName}
            id={user?.id}
          />
        ),
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
    ],
    [user?.firstName, user?.lastName],
  );
  const { activeTab, setActiveTab } = useTabs(tabItems.length);

  const handleClick = (tabValue: string) => {
    setActiveTab(tabValue);
    push(
      {
        pathname: '/profile/settings',
        query: { tab: tabValue },
      },
      undefined,
      { shallow: true },
    );
  };
  return (
    <>
      <PageTitle title="Settings" />
      <PageSection>
        <Tabs
          activeTab={activeTab}
          onTabClick={handleClick}
          tabItems={tabItems}
        />
      </PageSection>
    </>
  );
};

export default Profile;

Profile.getLayout = function getLayout(page: any) {
  return <AppLayout>{page}</AppLayout>;
};
