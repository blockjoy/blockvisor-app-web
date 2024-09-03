export const dedupedAdminDropdownList = (list: any[]) => {
  return list?.reduce((unique: AdminFilterDropdownItem[], o) => {
    if (!unique.some((obj: AdminFilterDropdownItem) => obj.id === o.id)) {
      unique.push(o);
    }
    return unique;
  }, []);
};
