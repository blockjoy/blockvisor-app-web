import { capitalized } from '@modules/admin/utils/capitalized';
import { Select, Textbox } from '@shared/components';
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
  const items = editSettings.dropdownValues?.map((value) => ({
    ...value,
    name: capitalized(value.name),
  }));

  const selectedItem = items?.find(
    (value) => value.id === editSettings.defaultValue,
  );

  const controls = {
    dropdown: (
      <Select
        noBottomMargin
        buttonText={<p>{capitalized(selectedItem?.name!)}</p>}
        items={items!}
        selectedItem={selectedItem!}
        onSelect={(value: string) => onChange(editSettings.field, value)}
      />
    ),
    text: (
      <Textbox
        isRequired
        name={editSettings.field}
        type="text"
        noBottomMargin
        defaultValue={editSettings.defaultValue}
        onChange={onChange}
        onKeyUp={onKeyUp}
      />
    ),
  };

  return controls[editSettings.controlType!];
};
