import { Switch } from '@shared/components';

export const AdminDetailEditSwitch = ({
  editSettings,
  onChange,
}: AdminDetailEditControlProps) => {
  const handleChange = (field: string, value: boolean) =>
    onChange(field, value.toString());

  return (
    <Switch
      name={editSettings.field}
      noBottomMargin
      defaultChecked={editSettings.defaultValue === 'true'}
      onChange={handleChange}
    />
  );
};
