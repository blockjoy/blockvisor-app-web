import { useRecoilValue } from 'recoil';
import { Switch } from '@shared/components';
import { useSettings } from '@modules/settings';
import { layoutSelectors } from '@modules/layout';
import { AdminSettingsInput } from '../AdminSettingsInput/AdminSettingsInput';

export const AdminLayoutSettings = () => {
  const adminFullWidth = useRecoilValue(layoutSelectors.adminFullWidth);

  const { updateSettings } = useSettings();

  const handleLayoutWidth = async () => {
    await updateSettings('layout', {
      'admin.fullWidth': !adminFullWidth,
    });
  };

  return (
    <>
      <AdminSettingsInput
        label="Enable Full-Width Content in Admin Area"
        description="Toggle this option to make your admin pages and subpages use the entire screen width."
      >
        <Switch
          name="content-width"
          disabled={false}
          checked={adminFullWidth}
          onChange={handleLayoutWidth}
        />
      </AdminSettingsInput>
    </>
  );
};
