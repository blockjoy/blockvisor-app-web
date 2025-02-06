export const getPermissionsGrouped = (permissions?: string[]) => {
  const grouped =
    permissions?.reduce((acc: Record<string, string[]>, permission) => {
      const group = permission.split('-')[0];

      if (!acc[group]) {
        acc[group] = [];
      }

      acc[group].push(permission);

      return acc;
    }, {} as Record<string, string[]>) ?? {};

  return Object.keys(grouped)
    .sort()
    .reduce((sorted, group) => {
      sorted[group] = grouped[group];
      return sorted;
    }, {} as Record<string, string[]>);
};
