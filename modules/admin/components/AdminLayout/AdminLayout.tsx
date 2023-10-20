import { createContext } from 'react';
import { AdminSidebar } from '../AdminSidebar/AdminSidebar';
import { styles } from './AdminLayout.styles';
import { useRouter } from 'next/router';
import { wrapper } from 'styles/wrapper.styles';
import { AdminList } from '../AdminList/AdminList';
import { AdminDetails } from '../AdminDetails/AdminDetails';
import { AdminDashboard } from '../AdminDashboard/AdminDashboard';
import { PageTitle } from '@shared/components';
import IconAdmin from '@public/assets/icons/app/Sliders.svg';

export const AdminLayout = () => {
  const router = useRouter();
  const { name, id } = router.query;

  const capitalizeName = (str: string) =>
    str.charAt(0).toUpperCase() + str.slice(1);

  return (
    <>
      <PageTitle
        title="Admin"
        icon={<IconAdmin />}
        childTitle={!name ? 'Dashboard' : capitalizeName(name as string)}
        onTitleClick={name ? () => router.push('/admin') : undefined}
        hideOrgPicker
      />
      <section css={[styles.wrapper, wrapper.main]}>
        <AdminSidebar tab={name as string} />
        {!name ? <AdminDashboard /> : id ? <AdminDetails /> : <AdminList />}
      </section>
    </>
  );
};
