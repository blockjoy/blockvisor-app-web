import { useRecoilValue } from 'recoil';
import { usePathname } from 'next/navigation';
import { TabNavigation } from '@shared/components/';
import { wrapper } from 'styles/wrapper.styles';
import { billingAtoms } from '@modules/billing';
import { authAtoms } from '@modules/auth';

export const SettingsTabs = () => {
  const pathname = usePathname();
  const isSuperUser = useRecoilValue(authAtoms.isSuperUser);

  const isEnabledBillingPreview = useRecoilValue(
    billingAtoms.isEnabledBillingPreview(isSuperUser),
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
