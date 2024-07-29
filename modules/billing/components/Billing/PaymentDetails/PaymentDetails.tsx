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
  const canGetBillingAddress = useRecoilValue(
    authSelectors.hasPermission('org-address-get'),
  );

  const { activeTab, handleActiveTabChange } = useTabs(tabItems);

  if (!canListPaymentMethods || !canGetBillingAddress)
    return (
      <Unauthorized>
        You don't have access to read the current organization billing plan! Try
        switching the organization.
      </Unauthorized>
    );

  return (
    <Tabs
      activeTab={activeTab}
      onTabClick={handleActiveTabChange}
      tabItems={tabItems}
      type="inner"
    />
  );
};
