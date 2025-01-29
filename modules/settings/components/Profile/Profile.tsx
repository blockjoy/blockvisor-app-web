import { useMemo } from 'react';
import { useTabs } from '@shared/index';
import { Tabs } from '@shared/components';
import { Account } from './Account/Account';
import { ProfileForm } from './ProfileForm/ProfileForm';

export const Profile = () => {
  const tabItems = useMemo(
    () => [
      {
        label: 'Personal',
        value: 'personal',
        component: <ProfileForm />,
      },
      {
        label: 'Account',
        value: 'account',
        component: <Account />,
      },
    ],
    [],
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
