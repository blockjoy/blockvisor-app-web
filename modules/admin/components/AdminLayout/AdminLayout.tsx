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

type AdminContextParams = {
  listPageSize: number;
};

const initialContextParams = {
  listPageSize: 10,
};

export const AdminContext =
  createContext<AdminContextParams>(initialContextParams);

export const AdminLayout = () => {
  const router = useRouter();
  const { name, id } = router.query;
  return (
    <AdminContext.Provider value={initialContextParams}>
      <>
        <PageTitle
          title="Admin"
          icon={<IconAdmin />}
          childTitle={!name ? 'Dashboard' : (name as string)}
          onTitleClick={name ? () => router.push('/admin') : undefined}
          hideOrgPicker
        />
        <section css={[styles.wrapper, wrapper.main]}>
          <AdminSidebar tab={name as string} />
          {!name ? <AdminDashboard /> : id ? <AdminDetails /> : <AdminList />}
        </section>
      </>
    </AdminContext.Provider>
  );
};
