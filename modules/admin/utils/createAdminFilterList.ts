import { AdminListColumn } from '../types/AdminListColumn';

export const createAdminFilterList = (
  filters: AdminListColumn[],
  name: string,
) => filters?.find((filter) => filter.name === name)?.filterSettings?.values;
