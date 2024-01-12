import { AdminSidebar } from '../AdminSidebar/AdminSidebar';
import { styles } from './AdminLayout.styles';
import { useRouter } from 'next/router';
import { wrapper } from 'styles/wrapper.styles';
import { AdminLists } from '../AdminLists/AdminLists';
import { AdminDetails } from '../AdminDetails/AdminDetails';
import { AdminDashboard } from '../AdminDashboard/AdminDashboard';
import { PageTitle } from '@shared/components';
import { capitalized } from '@modules/admin/utils/capitalized';
import IconAdmin from '@public/assets/icons/app/Sliders.svg';

export const AdminLayout = () => {
  const router = useRouter();
  const { name, id, ip } = router.query;
  return (
    <>
      <PageTitle
        title="Admin"
        isAdmin
        icon={<IconAdmin />}
        childTitle={name && capitalized(name as string)}
        onTitleClick={
          name ? () => router.push('/admin?name=dashboard') : undefined
        }
        hideOrgPicker
      />
      <section css={[styles.wrapper, wrapper.main]}>
        <AdminSidebar tab={name as string} />
        {name === 'dashboard' ? (
          <AdminDashboard />
        ) : id || ip ? (
          <AdminDetails />
        ) : (
          <AdminLists />
        )}
      </section>
    </>
  );
};
