import { Sorting } from '@modules/organization/ui/OrganizationsUIHelpers';

export const sort = (organizations: ClientOrganization[], sorting: Sorting) => {
  return [...organizations].sort(
    (a: ClientOrganization, b: ClientOrganization) => {
      let aField = a[sorting.field];
      let bField = b[sorting.field];

      if (typeof aField === 'string') aField = aField.toLowerCase();
      if (typeof bField === 'string') bField = bField.toLowerCase();

      return sorting.order === 'asc'
        ? aField > bField
          ? 1
          : -1
        : bField > aField
        ? 1
        : -1;
    },
  );
};
