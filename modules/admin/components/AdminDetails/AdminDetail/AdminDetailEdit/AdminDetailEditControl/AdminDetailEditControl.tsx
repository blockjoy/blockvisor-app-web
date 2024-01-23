import { KeyboardEvent } from 'react';
import { AdminDetailEditOrgSelect } from './AdminDetailEditOrgSelect/AdminDetailEditOrgSelect';
import { AdminDetailEditSelect } from './AdminDetailEditSelect/AdminDetailEditSelect';
import { AdminDetailEditTextbox } from './AdminDetailEditTextbox/AdminDetailEditTextbox';

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
    org: (
      <AdminDetailEditOrgSelect
        editSettings={editSettings}
        onChange={onChange}
      />
    ),
  };

  return controls[editSettings.controlType!];
};
