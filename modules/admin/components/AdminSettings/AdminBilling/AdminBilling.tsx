import { useRecoilState, useRecoilValue } from 'recoil';
import { billingAtoms } from '@modules/billing';
import { Switch } from '@shared/components';
import { AdminSettingsInput } from '../AdminSettingsInput/AdminSettingsInput';
import { authSelectors } from '@modules/auth';

export const AdminBilling = () => {
  const isSuperUser = useRecoilValue(authSelectors.isSuperUser);
  const [isEnabledBillingPreview, setIsEnabledBillingPreview] = useRecoilState(
    billingAtoms.isEnabledBillingPreview(isSuperUser),
  );
  const [bypassBillingForSuperUser, setBypassBillingForSuperUser] =
    useRecoilState(billingAtoms.bypassBillingForSuperUser(isSuperUser));

  const handleActiveBilling = () => {
    setIsEnabledBillingPreview(!isEnabledBillingPreview);
  };

  const handleSuperUserBilling = () => {
    setBypassBillingForSuperUser(!bypassBillingForSuperUser);
  };

  return (
    <>
      <AdminSettingsInput
        label="Enable Billing Preview for Super Users"
        description="When active, Super Users will be able to preview Billing."
      >
        <Switch
          name="billing-enabled"
          disabled={false}
          checked={isEnabledBillingPreview}
          onChange={handleActiveBilling}
        />
      </AdminSettingsInput>
      <AdminSettingsInput
        label="Exclude Super Users from Billing"
        description="When active, Super Users will be able to bypass Billing when creating new Resources."
      >
        <Switch
          name="superuser-billing"
          disabled={false}
          checked={bypassBillingForSuperUser}
          onChange={handleSuperUserBilling}
        />
      </AdminSettingsInput>
    </>
  );
};
