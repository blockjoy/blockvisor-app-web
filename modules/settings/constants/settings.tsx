import { SettingsRoute } from '../types/common';
import IconPerson from '@public/assets/icons/common/Person.svg';
import IconLock from '@public/assets/icons/common/Lock.svg';
import IconKey from '@public/assets/icons/common/Key.svg';
import IconBilling from '@public/assets/icons/common/Billing.svg';
import IconLocation from '@public/assets/icons/common/Location.svg';
import IconInvoice from '@public/assets/icons/billing/Invoice.svg';
import IconSubscription from '@public/assets/icons/billing/Subscription.svg';

export const SETTINGS_SIDEBAR_ITEMS: SubSidebarItem<SettingsRoute>[] = [
  {
    name: 'user',
    title: 'User',
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
];

export const SETTINGS_SIDEBAR_ITEMS_ADVANCED: SubSidebarItem<SettingsRoute>[] =
  [
    {
      name: 'advanced',
      title: 'Advanced',
      items: [
        {
          name: 'api-keys',
          title: 'API Keys',
          icon: <IconKey />,
        },
      ],
    },
  ];

export const SETTINGS_USER_ROUTES = ['profile', 'account'] as const;

export const SETTINGS_BILLING_ROUTES = [
  'payment-methods',
  'billing-address',
  'subscription',
  'invoices',
] as const;

export const SETTINGS_ADVANCED_ROUTES = ['api-keys'] as const;

export const SETTINGS_ROUTES = [
  ...SETTINGS_USER_ROUTES,
  ...SETTINGS_BILLING_ROUTES,
  ...SETTINGS_ADVANCED_ROUTES,
];
