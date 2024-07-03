import { ReactNode, useEffect } from 'react';
import { useRouter } from 'next/router';
import { usePathname } from 'next/navigation';
import { Elements } from '@stripe/react-stripe-js';
import { PageTitle, TabNavigation } from '@shared/components';
import { useStripeSetup } from '@modules/billing';
import { wrapper } from 'styles/wrapper.styles';
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

  const { stripe } = useStripeSetup();

  const tabItems = tabs.map((tab) => ({
    ...tab,
    isActive: pathname?.includes(tab.href),
  }));

  useEffect(() => {
    if (pathname === '/billing') router.replace(tabs[0].href);
  }, [router]);

  return (
    <Elements stripe={stripe}>
      <PageTitle title="Billing" icon={<IconBilling />} />
      <div css={wrapper.main}>
        <TabNavigation items={tabItems} gap="32px" />
        {children}
      </div>
    </Elements>
  );
};
