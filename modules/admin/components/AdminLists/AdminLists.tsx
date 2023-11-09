import { AdminNodes } from './AdminNodes/AdminNodes';
import { AdminUsers } from './AdminUsers/AdminUsers';
import { AdminHosts } from './AdminHosts/AdminHosts';
import { AdminOrgs } from './AdminOrgs/AdminOrgs';
import { styles } from './AdminLists.styles';
import { Node } from '@modules/grpc/library/blockjoy/v1/node';
import { User } from '@modules/grpc/library/blockjoy/v1/user';
import { Host } from '@modules/grpc/library/blockjoy/v1/host';
import { Org } from '@modules/grpc/library/blockjoy/v1/org';
import { useRouter } from 'next/router';

export type AdminGetList = {
  list: Node[] | User[] | Host[] | Org[];
  total: number;
};

const views = [
  { name: 'users', component: <AdminUsers /> },
  { name: 'nodes', component: <AdminNodes /> },
  { name: 'hosts', component: <AdminHosts /> },
  { name: 'orgs', component: <AdminOrgs /> },
];

export const AdminLists = () => {
  const router = useRouter();
  const { name } = router.query;
  return (
    <section css={styles.grid}>
      {views.find((v) => v.name === (name as string))?.component}
    </section>
  );
};
