type AdminListColumnFilterSettings = {
  type: AdminListColumnFilterType;
  name?: string;
  values?: string[];
  dropdownItems?: AdminFilterDropdownItem[];
};

type AdminListColumnFilterType = 'default' | 'blockchain';
