import { useTabs } from '@shared/hooks/useTabs';
import { Button, PageSection, PageTitle, Tabs } from '@shared/components';
import { useRecoilValue } from 'recoil';
import { authAtoms, useSignOut } from '@modules/auth';
import { useRouter } from 'next/router';
import { useMemo } from 'react';
import IconDoor from '@public/assets/icons/common/Door.svg';
import { ProfileForm } from './ProfileForm/ProfileForm';
import { ProfileChangePassword } from './ProfileChangePassword/ProfileChangePassword';
import { styles } from './Profile.styles';
import { spacing } from 'styles/utils.spacing.styles';
import { colors } from 'styles/utils.colors.styles';
import { typo } from 'styles/utils.typography.styles';

export const Profile = () => {
  const user = useRecoilValue(authAtoms.user);
  const signOut = useSignOut();
  const { push } = useRouter();

  const handleSignout = async () => signOut();

  const tabItems = useMemo(
    () => [
      {
        label: 'Personal',
        value: '1',
        component: (
          <PageSection bottomBorder={false}>
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
            <PageSection bottomBorder={false}>
              <header
                css={[
                  colors.text3,
                  typo.medium,
                  spacing.bottom.medium,
                  spacing.top.medium,
                ]}
              >
                Danger Zone
              </header>
              <p css={[colors.text4, typo.small, spacing.bottom.medium]}>
                Click the button below to sign out.
              </p>
              <Button
                customCss={[styles.button, spacing.bottom.large]}
                style="warning"
                size="medium"
                onClick={handleSignout}
              >
                <IconDoor />
                Sign out
              </Button>
            </PageSection>
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
