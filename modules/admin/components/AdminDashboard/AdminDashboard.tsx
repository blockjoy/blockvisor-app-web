import { AdminTitle } from '../AdminLayout/AdminTitle/AdminTitle';
import { AdminNodes } from './AdminNodes/AdminNodes';
import { AdminUsers } from './AdminUsers/AdminUsers';
import { AdminHosts } from './AdminHosts/AdminHosts';
import { AdminOrgs } from './AdminOrgs/AdminOrgs';
import { styles } from './AdminDashboard.styles';
import { wrapper } from 'styles/wrapper.styles';

export const AdminDashboard = () => {
  return (
    <>
      <AdminTitle />
      <div css={[wrapper.main, styles.wrapper]}>
        <section css={[styles.grid]}>
          <AdminUsers />

          {/* <AdminNodes />
          <AdminHosts />
          <AdminOrgs /> */}
        </section>
      </div>
    </>
  );
};
