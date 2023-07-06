export const ROUTES = {
  DEFAULT: '/nodes',
  DASHBOARD: '/dashboard',
  HOST: (id: string) => `/hosts/${id}`,
  HOSTS: '/hosts',
  HOST_GROUP: (id: string) => `/hosts/group/${id}`,
  NODE: (id: string) => `/nodes/${id}`,
  NODES: '/nodes',
  NODE_GROUP: (id: string) => `/nodes/group/${id}`,
  LOGIN: '/login',
  ORGANIZATIONS: '/organizations',
  ORGANIZATION: (id: string) => `/organizations/${id}`,
  PROFILE: '/profile',
  REGISTER: '/register',
  FORGOT_PASSWORD: '/forgot-password',
};

export const PUBLIC_ROUTES = [
  '/login',
  '/password_reset',
  '/register',
  '/accept-invite',
  '/invite-registered',
  '/decline-invite',
  '/verified',
  '/verify',
  '/forgot-password',
  '/deactivated',
];
