import { capitalized } from '@modules/admin/utils/capitalized';
import { Select } from '@shared/components';

type Props = {
  editSettings: AdminDetailEditSettings;
  onChange: (field: string, value: string) => void;
};

export const AdminDetailEditSelect = ({ editSettings, onChange }: Props) => {
  const items = editSettings.dropdownValues?.map((value) => ({
    ...value,
    name: capitalized(value.name),
  }));

  const selectedItem = items?.find(
    (value) => value.id === editSettings.defaultValue,
  );

  return (
    <Select
      noBottomMargin
      buttonText={<p>{capitalized(selectedItem?.name!)}</p>}
      items={items!}
      selectedItem={selectedItem!}
      onSelect={(value: string) => onChange(editSettings.field, value)}
    />
  );
};
