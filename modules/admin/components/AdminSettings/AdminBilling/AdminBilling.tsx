import { useRecoilState, useRecoilValue } from 'recoil';
import { billingAtoms, billingSelectors } from '@modules/billing';
import { Switch, SwitchLabel } from '@shared/components';
import { authSelectors } from '@modules/auth';

export const AdminBilling = () => {
  const isSuperUser = useRecoilValue(authSelectors.isSuperUser);
  const [isEnabledBillingPreview, setIsEnabledBillingPreview] = useRecoilState(
    billingAtoms.isEnabledBillingPreview(isSuperUser),
  );
  const [bypassBillingForSuperUser, setBypassBillingForSuperUser] =
    useRecoilState(billingSelectors.bypassBillingForSuperUser);

  const handleActiveBilling = () => {
    setIsEnabledBillingPreview(!isEnabledBillingPreview);
  };

  const handleSuperUserBilling = () => {
    setBypassBillingForSuperUser(!bypassBillingForSuperUser);
  };

  return (
    <>
      <SwitchLabel
        label="Enable Billing Preview for Super Users"
        description="When active, Super Users will be able to preview Billing."
      >
        <Switch
          name="billing-enabled"
          disabled={false}
          checked={isEnabledBillingPreview}
          onChange={handleActiveBilling}
        />
      </SwitchLabel>
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
    </>
  );
};
