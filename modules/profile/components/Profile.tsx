import { useTabs } from '@shared/hooks/useTabs';
import { Button, PageSection, PageTitle, Tabs } from '@shared/components';
import { useRecoilValue } from 'recoil';
import { authAtoms, useSignOut } from '@modules/auth';
import { useRouter } from 'next/router';
import { useMemo } from 'react';
import IconDoor from '@public/assets/icons/door-12.svg';
import { ProfileForm } from './ProfileForm/ProfileForm';
import { ProfileChangePassword } from './ProfileChangePassword/ProfileChangePassword';
import { styles } from './Profile.styles';

export const Profile = () => {
  const user = useRecoilValue(authAtoms.user);
  const signOut = useSignOut();
  const { push } = useRouter();

  const handleSignout = async () => {
    signOut();
    window.location.href = '/';
  };

  const tabItems = useMemo(
    () => [
      {
        label: 'Personal',
        value: '1',
        component: (
          <PageSection>
            <ProfileForm
              firstName={user?.firstName}
              lastName={user?.lastName}
              id={user?.id}
              email={user?.email}
            />
          </PageSection>
        ),
      },
      {
        label: 'Account',
        value: '2',
        component: (
          <>
            <PageSection>
              <ProfileChangePassword />
            </PageSection>
            <div css={[styles.buttonWrapper]}>
              <Button
                customCss={[styles.button]}
                style="outline"
                onClick={handleSignout}
              >
                <IconDoor />
                Sign out
              </Button>
            </div>
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
      <Tabs
        activeTab={activeTab}
        onTabClick={handleClick}
        tabItems={tabItems}
      />
    </>
  );
};
