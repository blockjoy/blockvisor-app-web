import { useMemo } from 'react';
import { useRecoilValue } from 'recoil';
import { useTabs } from '@shared/index';
import { Tabs } from '@shared/components';
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
          <ProfileForm
            firstName={user?.firstName}
            lastName={user?.lastName}
            id={user?.id}
            email={user?.email}
          />
        ),
      },
      {
        label: 'Account',
        value: 'account',
        component: (
          <>
            <ProfileChangePassword />
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
