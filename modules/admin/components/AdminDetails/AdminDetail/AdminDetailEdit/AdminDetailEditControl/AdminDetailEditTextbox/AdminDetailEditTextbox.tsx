import { KeyboardEvent } from 'react';
import { Textbox } from '@shared/components';

type Props = {
  editSettings: AdminDetailEditSettings;
  onChange: (field: string, value: string) => void;
  onKeyUp: (event: KeyboardEvent<HTMLInputElement>) => void;
};

export const AdminDetailEditTextbox = ({
  editSettings,
  onChange,
  onKeyUp,
}: Props) => {
  return (
    <Textbox
      isRequired
      name={editSettings.field}
      type="text"
      noBottomMargin
      defaultValue={editSettings.defaultValue}
      onChange={onChange}
      onKeyUp={onKeyUp}
    />
  );
};
