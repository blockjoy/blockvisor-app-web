import { useTabs } from '@shared/hooks/useTabs';
import { PageSection, PageTitle, Tabs } from '@shared/components';
import { useRecoilValue } from 'recoil';
import { authAtoms } from '@modules/auth';
import { useRouter } from 'next/router';
import { useMemo } from 'react';
import { ProfileForm } from './ProfileForm/ProfileForm';
import { ProfileChangePassword } from './ProfileChangePassword/ProfileChangePassword';

export const Profile = () => {
  const user = useRecoilValue(authAtoms.user);
  const { push } = useRouter();
  const tabItems = useMemo(
    () => [
      {
        label: 'Personal Details',
        value: '1',
        component: (
          <ProfileForm
            firstName={user?.firstName}
            lastName={user?.lastName}
            id={user?.id}
          />
        ),
      },
      {
        label: 'Change Password',
        value: '2',
        component: <ProfileChangePassword />,
      },
    ],
    [user?.firstName, user?.lastName],
  );
  const { activeTab, setActiveTab } = useTabs(tabItems.length);

  const handleClick = (tabValue: string) => {
    setActiveTab(tabValue);
    push(
      {
        pathname: '/profile',
        query: { tab: tabValue },
      },
      undefined,
      { shallow: true },
    );
  };
  return (
    <>
      <PageTitle title="Profile" />
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
