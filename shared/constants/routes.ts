export const ROUTES = {
  DASHBOARD: '/dashboard',
  HOSTS: '/hosts',
  HOST_GROUP: (id: string) => `/hosts/group/${id}`,
  NODES: '/nodes',
  NODE_GROUP: (id: string) => `/nodes/group/${id}`,
  LOGIN: '/login',
  REGISTER: '/register',
  FORGOT_PASSWORD: '/forgot-password',
};
