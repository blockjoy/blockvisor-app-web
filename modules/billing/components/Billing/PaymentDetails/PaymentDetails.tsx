import { useMemo } from 'react';
import { useRecoilValue } from 'recoil';
import { useTabs } from '@shared/index';
import { Tabs, Unauthorized } from '@shared/components';
import { BillingAddress, PaymentMethods } from '@modules/billing';
import { authSelectors } from '@modules/auth';

export const PaymentDetails = () => {
  const tabItems = useMemo(
    () => [
      {
        label: 'Payment Methods',
        value: 'payment-methods',
        component: <PaymentMethods />,
      },
      {
        label: 'Billing Address',
        value: 'billing-address',
        component: <BillingAddress />,
      },
    ],
    [],
  );

  const canListPaymentMethods = useRecoilValue(
    authSelectors.hasPermission('org-billing-list-payment-methods'),
  );

  const { activeTab, handleActiveTabChange } = useTabs(tabItems);

  return canListPaymentMethods ? (
    <Tabs
      activeTab={activeTab}
      onTabClick={handleActiveTabChange}
      tabItems={tabItems}
      type="inner"
    />
  ) : (
    <Unauthorized>
      You don't have permission to preview the organization's payment methods.
    </Unauthorized>
  );
};
