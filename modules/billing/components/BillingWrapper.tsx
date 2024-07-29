import { ReactNode, useEffect } from 'react';
import { useRouter } from 'next/router';
import { usePathname } from 'next/navigation';
import { useRecoilValue } from 'recoil';
import { PageTitle, TableSkeleton, TabNavigation } from '@shared/components';
import { authAtoms } from '@modules/auth';
import { wrapper } from 'styles/wrapper.styles';
import { spacing } from 'styles/utils.spacing.styles';
import IconBilling from '@public/assets/icons/common/Billing.svg';

type BillingWrapperProps = {
  children?: ReactNode;
};

const tabs: TabNavItem[] = [
  { href: '/billing/payment-details', name: 'Payment Details' },
  { href: '/billing/subscription', name: 'Subscription' },
];

export const BillingWrapper = ({ children }: BillingWrapperProps) => {
  const router = useRouter();
  const pathname = usePathname();

  const permissionsLoadingState = useRecoilValue(
    authAtoms.permissionsLoadingState,
  );

  const tabItems = tabs.map((tab) => ({
    ...tab,
    isActive: pathname?.includes(tab.href),
  }));

  useEffect(() => {
    if (pathname === '/billing') router.replace(tabs[0].href);
  }, [router]);

  return (
    <>
      <PageTitle title="Billing" icon={<IconBilling />} />
      <div css={wrapper.main}>
        {permissionsLoadingState !== 'finished' ? (
          <div css={[spacing.top.medium]}>
            <TableSkeleton />
          </div>
        ) : (
          <>
            <TabNavigation items={tabItems} gap="32px" />
            {children}
          </>
        )}
      </div>
    </>
  );
};
