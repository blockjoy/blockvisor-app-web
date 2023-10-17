import { AdminSidebar } from '../AdminLayout/AdminSidebar/AdminSidebar';
import { styles } from './AdminLayout.styles';
import { useRouter } from 'next/router';
import { wrapper } from 'styles/wrapper.styles';

export const AdminLayout = () => {
  const router = useRouter();
  const { tab } = router.query;

  return (
    <>
      <section css={[styles.wrapper, wrapper.main]}>
        <>
          <AdminSidebar tab={tab as string} />
        </>
      </section>
    </>
  );
};
