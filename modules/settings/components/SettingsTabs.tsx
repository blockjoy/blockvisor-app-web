import { usePathname } from 'next/navigation';
import { TabNavigation } from '@shared/components/';

export const SettingsTabs = () => {
  const pathname = usePathname();

  const tabs: TabNavItem[] = [
    { href: '/settings/profile', name: 'Profile' },
    { href: '/settings/billing', name: 'Billing' },
  ];

  const tabItems = tabs.map((tab) => ({
    ...tab,
    isActive: pathname?.includes(tab.href),
  }));

  return <TabNavigation items={tabItems} gap="32px" />;
};
