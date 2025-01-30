import IconPerson from '@public/assets/icons/common/Person.svg';
import IconLock from '@public/assets/icons/common/Lock.svg';
import IconKey from '@public/assets/icons/common/Key.svg';
import IconBilling from '@public/assets/icons/common/Billing.svg';
import IconLocation from '@public/assets/icons/common/Location.svg';
import IconInvoice from '@public/assets/icons/billing/Invoice.svg';
import IconSubscription from '@public/assets/icons/billing/Subscription.svg';

export const SETTINGS_SIDEBAR_ITEMS: SubSidebarItem[] = [
  {
    name: 'profile',
    title: 'Profile',
    items: [
      {
        name: 'profile',
        title: 'Profile',
        icon: <IconPerson />,
      },
      {
        name: 'account',
        title: 'Account',
        icon: <IconLock />,
      },
    ],
  },
  {
    name: 'billing',
    title: 'Billing',
    items: [
      {
        name: 'payment-methods',
        title: 'Payment Methods',
        icon: <IconBilling />,
      },
      {
        name: 'billing-address',
        title: 'Billing Address',
        icon: <IconLocation />,
      },
      {
        name: 'subscription',
        title: 'Subscription',
        icon: <IconSubscription />,
      },
      {
        name: 'invoices',
        title: 'Invoices',
        icon: <IconInvoice />,
      },
    ],
  },
  {
    name: 'developers',
    title: 'Developers',
    items: [
      {
        name: 'api-keys',
        title: 'API Keys',
        icon: <IconKey />,
      },
    ],
  },
];
