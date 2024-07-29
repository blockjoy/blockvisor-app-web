import { useState } from 'react';
import { Switch, SwitchLabel } from '@shared/components';
import { styles } from './ProfileSettings.styles';

export const ProfileSettings = () => {
  const [marketingOptIn, setMarketingOptIn] = useState(true);

  const handleSwitch = () => {
    setMarketingOptIn(!marketingOptIn);
  };

  return (
    <SwitchLabel
      label="Marketing Emails"
      description="Toggle to opt-in or out of receiving our latest news and promotional offers."
      additionalStyles={[styles.label]}
    >
      <Switch
        name="marketing-opt-in"
        disabled={false}
        checked={marketingOptIn}
        onChange={handleSwitch}
      />
    </SwitchLabel>
  );
};
