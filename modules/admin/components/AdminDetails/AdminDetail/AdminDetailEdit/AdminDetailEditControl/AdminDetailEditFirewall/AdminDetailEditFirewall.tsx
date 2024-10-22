import { FirewallDropdown, NodeLauncherState } from '@modules/node';

export const AdminDetailEditFirewall = ({
  editSettings,
  onChange,
}: AdminDetailEditControlProps) => {
  const handleChange = <K extends keyof NodeLauncherState>(
    name: K,
    value: NodeLauncherState[K],
  ) => {
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
