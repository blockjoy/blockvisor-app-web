import {
  AdminDetailEditFirewall,
  AdminDetailEditOrgSelect,
  AdminDetailEditSelect,
  AdminDetailEditSwitch,
  AdminDetailEditTextbox,
} from '@modules/admin';
import { KeyboardEvent } from 'react';

type Props = {
  editSettings: AdminDetailEditSettings;
  onChange: (field: string, value: string) => void;
  onKeyUp: (event: KeyboardEvent<HTMLInputElement>) => void;
};

export const AdminDetailEditControl = ({
  editSettings,
  onChange,
  onKeyUp,
}: Props) => {
  const controls = {
    dropdown: (
      <AdminDetailEditSelect editSettings={editSettings} onChange={onChange} />
    ),
    text: (
      <AdminDetailEditTextbox
        editSettings={editSettings}
        onChange={onChange}
        onKeyUp={onKeyUp}
      />
    ),
    switch: (
      <AdminDetailEditSwitch editSettings={editSettings} onChange={onChange} />
    ),
    org: (
      <AdminDetailEditOrgSelect
        editSettings={editSettings}
        onChange={onChange}
      />
    ),
    firewall: (
      <AdminDetailEditFirewall
        editSettings={editSettings}
        onChange={onChange}
      />
    ),
  };

  return controls[editSettings.controlType!];
};
