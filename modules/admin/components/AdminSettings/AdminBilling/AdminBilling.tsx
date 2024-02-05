import { useRecoilState } from 'recoil';
import { billingAtoms } from '@modules/billing';
import { Switch } from '@shared/components';
import { AdminSettingsInput } from '../AdminSettingsInput/AdminSettingsInput';
import { usePermissions } from '@modules/auth';

export const AdminBilling = () => {
  const { isSuperUser } = usePermissions();
  const [isSuperUserBilling, setIsSuperUserBilling] = useRecoilState(
    billingAtoms.isSuperUserBilling(isSuperUser),
  );

  const handleSuperUserBilling = () => {
    setIsSuperUserBilling(!isSuperUserBilling);
  };
  return (
    <AdminSettingsInput
      label="Exclude Super Users from Billing"
      description="When active, Super Users will be able to bypass Billing when creating new Resources."
    >
      <Switch
        name="superuser-billing"
        disabled={false}
        checked={isSuperUserBilling}
        onChange={handleSuperUserBilling}
      />
    </AdminSettingsInput>
  );
};
