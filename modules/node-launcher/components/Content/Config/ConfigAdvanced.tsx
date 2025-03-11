import IconCog from '@public/assets/icons/common/Cog.svg';
import { ConfigItem } from './ConfigItem/ConfigItem';
import { FirewallConfiguration } from './Select/FirewallConfiguration/FirewallConfiguration';

export const ConfigAdvanced = () => {
  return (
    <ConfigItem title="Advanced Configuration" Icon={IconCog}>
      <FirewallConfiguration />
    </ConfigItem>
  );
};
