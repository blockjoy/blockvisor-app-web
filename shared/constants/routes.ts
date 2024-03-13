export const ROUTES = {
  BILLING: '/billing',
  DEFAULT: '/nodes',
  DASHBOARD: '/dashboard',
  FAQ: '/faq',
  FORGOT_PASSWORD: '/forgot-password',
  HOST: (id: string) => `/hosts/${id}`,
  HOSTS: '/hosts',
  HOST_GROUP: (id: string) => `/hosts/group/${id}`,
  INVOICE: (id: string) => `/billing/invoices/${id}`,
  LAUNCH_NODE: '/launch-node',
  LOGIN: '/login',
  NODE: (id: string) => `/nodes/${id}`,
  NODES: '/nodes',
  NODE_GROUP: (id: string) => `/nodes/group/${id}`,
  NODE_JOBS: () => `/nodes/jobs`,
  NODE_JOB: (nodeId: string, name: string) => `/nodes/${nodeId}/jobs/${name}`,
  NOT_FOUND: '/404',
  ORGANIZATIONS: '/organizations',
  ORGANIZATION: (id: string) => `/organizations/${id}`,
  REGISTER: '/register',
  SETTINGS: '/settings',
  SETTINGS_PROFILE: '/settings/profile',
  SETTINGS_BILLING: '/settings/billing',
};

export const PUBLIC_ROUTES = [
  '/login',
  '/password-reset',
  '/register',
  '/accept-invite',
  '/invite-registered',
  '/decline-registered',
  '/decline-invite',
  '/verified',
  '/verify',
  '/forgot-password',
  '/deactivated',
];
