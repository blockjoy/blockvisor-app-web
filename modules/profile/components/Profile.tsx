import { useTabs } from '@shared/hooks/useTabs';
import { PageSection, PageTitle, Tabs } from '@shared/components';
import { useRecoilValue } from 'recoil';
import { authAtoms } from '@modules/auth';
import { useRouter } from 'next/router';
import { useMemo } from 'react';
import { ProfileForm } from './ProfileForm/ProfileForm';
import { ProfileDeleteAccount } from './ProfileDeleteAccount/ProfileDeleteAccount';
import { ProfileChangePassword } from './ProfileChangePassword/ProfileChangePassword';
import { spacing } from 'styles/utils.spacing.styles';
import { colors } from 'styles/utils.colors.styles';
import { typo } from 'styles/utils.typography.styles';
import IconPerson from '@public/assets/icons/common/Person.svg';

export const Profile = () => {
  const user = useRecoilValue(authAtoms.user);
  const { push } = useRouter();

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

              <ProfileDeleteAccount />
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
      <PageTitle title="Profile" icon={<IconPerson />} />
      <Tabs
        activeTab={activeTab}
        onTabClick={handleClick}
        tabItems={tabItems}
      />
    </>
  );
};
