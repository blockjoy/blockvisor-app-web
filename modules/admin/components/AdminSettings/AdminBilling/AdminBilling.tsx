import { useRecoilState } from 'recoil';
import { billingSelectors } from '@modules/billing';
import { Switch, SwitchLabel } from '@shared/components';

export const AdminBilling = () => {
  const [bypassBillingForSuperUser, setBypassBillingForSuperUser] =
    useRecoilState(billingSelectors.bypassBillingForSuperUser);

  const handleSuperUserBilling = () => {
    setBypassBillingForSuperUser(!bypassBillingForSuperUser);
  };

  return (
    <SwitchLabel
      label="Exclude Super Users from Billing"
      description="When active, Super Users will be able to bypass Billing when creating new Resources."
    >
      <Switch
        name="superuser-billing"
        disabled={false}
        checked={bypassBillingForSuperUser}
        onChange={handleSuperUserBilling}
      />
    </SwitchLabel>
  );
};
