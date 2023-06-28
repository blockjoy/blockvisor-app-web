export const createPath = (id: string, path: string) =>
  `/organizations/${id}${path ? `/${path}` : ''}`;
