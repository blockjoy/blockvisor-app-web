import { AdminSidebar } from '../AdminSidebar/AdminSidebar';
import { styles } from './AdminLayout.styles';
import { useRouter } from 'next/router';
import { wrapper } from 'styles/wrapper.styles';
import { AdminLists } from '../AdminList/AdminLists';
import { AdminDetails } from '../AdminDetails/AdminDetails';
import { AdminDashboard } from '../AdminDashboard/AdminDashboard';
import { PageTitle } from '@shared/components';
import { capitalized } from '@modules/admin/utils/capitalized';
import IconAdmin from '@public/assets/icons/app/Sliders.svg';

export const AdminLayout = () => {
  const router = useRouter();
  const { name, id } = router.query;
  return (
    <>
      <PageTitle
        title="Admin"
        icon={<IconAdmin />}
        childTitle={name && capitalized(name as string)}
        onTitleClick={name ? () => router.push('/admin') : undefined}
        hideOrgPicker
      />
      <section css={[styles.wrapper, wrapper.main]}>
        <AdminSidebar tab={name as string} />
        {!name ? <AdminDashboard /> : id ? <AdminDetails /> : <AdminLists />}
      </section>
    </>
  );
};
