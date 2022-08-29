export const ROUTES = {
  Dashboard: '/app/dashboard',
  HOSTS: '/app/hosts',
  HOST_GROUP: (id: string) => `/app/hosts/group/${id}`,
  NODES: '/app/nodes',
  NODE_GROUP: (id: string) => `/app/nodes/group/${id}`,
  LOGIN: '/',
  REGISTER: '/register',
  FORGOT_PASSWORD: '/forgot-password',
};
