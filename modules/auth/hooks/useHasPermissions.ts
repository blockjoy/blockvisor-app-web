import { useGetPermissions } from './useGetPermissions';

export function useHasPermissions(permission: string) {
  const { permissions } = useGetPermissions();

  return permissions.findIndex((p) => p === permission) > -1;
}
