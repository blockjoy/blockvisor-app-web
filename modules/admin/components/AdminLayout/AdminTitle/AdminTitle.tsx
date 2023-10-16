import { PageTitle } from '@shared/components';
import IconAdmin from '@public/assets/icons/app/Sliders.svg';

export const AdminTitle = () => (
  <PageTitle title="Admin" icon={<IconAdmin />} hideOrgPicker />
);
