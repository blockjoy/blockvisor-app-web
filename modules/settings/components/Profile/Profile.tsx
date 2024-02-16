import { useMemo } from 'react';
import { useRecoilValue } from 'recoil';
import { useTabs } from '@shared/index';
import { PageSection, Tabs } from '@shared/components';
import { authAtoms } from '@modules/auth';
import { ProfileForm } from './ProfileForm/ProfileForm';
import { ProfileDeleteAccount } from './ProfileDeleteAccount/ProfileDeleteAccount';
import { ProfileChangePassword } from './ProfileChangePassword/ProfileChangePassword';
import { spacing } from 'styles/utils.spacing.styles';
import { colors } from 'styles/utils.colors.styles';
import { typo } from 'styles/utils.typography.styles';

export const Profile = () => {
  const user = useRecoilValue(authAtoms.user);

  const tabItems = useMemo(
    () => [
      {
        label: 'Personal',
        value: 'personal',
        component: (
          <PageSection
            noSectionPadding={true}
            topPadding={false}
            bottomBorder={false}
          >
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
        value: 'account',
        component: (
          <>
            <PageSection noSectionPadding={true} topPadding={false}>
              <ProfileChangePassword />
            </PageSection>
            <PageSection bottomBorder={false} noSectionPadding={true}>
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
  const { activeTab, handleActiveTabChange } = useTabs(tabItems);

  return (
    <Tabs
      activeTab={activeTab}
      onTabClick={handleActiveTabChange}
      tabItems={tabItems}
      type="inner"
    />
  );
};
