import { useRecoilValue } from 'recoil';
import { Switch, SwitchLabel } from '@shared/components';
// import { billingSelectors } from '@modules/billing';
// import { useSettings } from '@modules/settings';
import { authSelectors } from '@modules/auth';

export const AdminBilling = () => {
  // const { updateSettings } = useSettings();
  // const bypassBillingForSuperUser = useRecoilValue(
  //   billingSelectors.bypassBillingForSuperUser,
  // );

  const billingExempt = useRecoilValue(
    authSelectors.hasPermission('billing-exempt'),
  );

  // const handleSuperUserBilling = () => {
  //   updateSettings('billing', {
  //     bypassBilling: !bypassBillingForSuperUser,
  //   });
  // };

  return (
    <SwitchLabel
      label="Exclude Super Users from Billing"
      description="When active, Super Users will be able to bypass Billing when creating new Resources."
    >
      <Switch
        name="superuser-billing"
        disabled={true}
        checked={billingExempt}
        // onChange={handleSuperUserBilling}
      />
    </SwitchLabel>
  );
};
