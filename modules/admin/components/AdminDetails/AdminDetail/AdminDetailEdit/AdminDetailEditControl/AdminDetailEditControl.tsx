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
  const controls = {
    dropdown: (
      <Select
        noBottomMargin
        buttonText={
          <p>
            {capitalized(
              editSettings.dropdownValues?.find(
                (value) => value.id === editSettings.defaultValue,
              )?.name!,
            )}
          </p>
        }
        items={
          editSettings.dropdownValues?.map((value) => ({
            name: capitalized(value.name)!,
            onClick: () => onChange(editSettings.field, value.id),
          }))!
        }
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
