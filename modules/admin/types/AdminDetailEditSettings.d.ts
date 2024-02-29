type AdminDetailEditSettings = {
  field: string;
  displayName?: string;
  isNumber?: boolean;
  isBoolean?: boolean;
  isArray?: boolean;
  defaultValue?: string;
  controlType?: AdminDetailEditControlType;
  dropdownValues?: AdminDetailEditDropdownItem[];
};
