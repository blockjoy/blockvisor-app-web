export const ROUTES = {
  BILLING: '/billing',
  DEFAULT: '/nodes',
  DASHBOARD: '/dashboard',
  HOST: (id: string) => `/hosts/${id}`,
  HOSTS: '/hosts',
  HOST_GROUP: (id: string) => `/hosts/group/${id}`,
  INVOICE: (id: string) => `/billing/invoices/${id}`,
  NODE: (id: string) => `/nodes/${id}`,
  NODES: '/nodes',
  NODE_GROUP: (id: string) => `/nodes/group/${id}`,
  NODE_JOBS: () => `/nodes/jobs`,
  NODE_JOB: (nodeId: string, name: string) => `/nodes/${nodeId}/jobs/${name}`,
  LOGIN: '/login',
  ORGANIZATIONS: '/organizations',
  ORGANIZATION: (id: string) => `/organizations/${id}`,
  PROFILE: '/profile',
  SETTINGS: '/settings',
  REGISTER: '/register',
  FORGOT_PASSWORD: '/forgot-password',
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
