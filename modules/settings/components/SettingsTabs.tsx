import { useRecoilValue } from 'recoil';
import { usePathname } from 'next/navigation';
import { TabNavigation } from '@shared/components/';
import { wrapper } from 'styles/wrapper.styles';
import { billingSelectors } from '@modules/billing';

export const SettingsTabs = () => {
  const pathname = usePathname();

  const isEnabledBillingPreview = useRecoilValue(
    billingSelectors.isEnabledBillingPreview,
  );

  const tabs: TabNavItem[] = [{ href: '/settings/profile', name: 'Profile' }];

  if (isEnabledBillingPreview) {
    tabs.push({ href: '/settings/billing', name: 'Billing' });
  }

  const tabItems = tabs.map((tab) => ({
    ...tab,
    isActive: pathname?.includes(tab.href),
  }));

  return (
    <div css={wrapper.main}>
      <TabNavigation items={tabItems} gap="32px" />
    </div>
  );
};
