import { KeyboardEvent } from 'react';
import { Textbox } from '@shared/components';

type Props = AdminDetailEditControlProps & {
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
