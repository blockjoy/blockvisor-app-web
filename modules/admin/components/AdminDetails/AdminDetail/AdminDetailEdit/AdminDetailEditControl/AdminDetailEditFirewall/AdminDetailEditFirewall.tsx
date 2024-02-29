import { FirewallDropdown } from '@modules/node';

export const AdminDetailEditFirewall = ({
  editSettings,
  onChange,
}: AdminDetailEditControlProps) => {
  const handleChange = (name: string, value: FilteredIpAddr[]) => {
    onChange(name, JSON.stringify(value));
  };

  return (
    <FirewallDropdown
      noBottomMargin
      onPropertyChanged={handleChange}
      type={editSettings.field === 'allowIps' ? 'allow' : 'deny'}
      ips={JSON.parse(editSettings.defaultValue!)}
    />
  );
};
