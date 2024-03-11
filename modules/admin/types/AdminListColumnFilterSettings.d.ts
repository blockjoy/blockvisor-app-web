type AdminListColumnFilterSettings = {
  type: AdminListColumnFilterType;
  name?: string;
  values?: string[];
  dropdownItems?: AdminFilterDropdownItem[];
};

type AdminListColumnFilterType =
  | 'nodeStatus'
  | 'default'
  | 'blockchain'
  | 'org'
  | 'host'
  | 'user'
  | 'region'
  | 'ip'
  | 'network'
  | 'version';
