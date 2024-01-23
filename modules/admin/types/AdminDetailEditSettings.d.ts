type AdminDetailEditSettings = {
  field: string;
  displayName?: string;
  isNumber?: boolean;
  defaultValue?: string;
  controlType?: AdminDetailEditControlType;
  dropdownValues?: AdminDetailEditDropdownItem[];
};
