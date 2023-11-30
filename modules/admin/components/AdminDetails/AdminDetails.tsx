import { useRouter } from 'next/router';
import { styles } from './AdminDetails.styles';

import { AdminUser } from './AdminUser/AdminUser';
import { AdminNode } from './AdminNode/AdminNode';
import { AdminHost } from './AdminHost/AdminHost';
import { AdminOrg } from './AdminOrg/AdminOrg';
import { Node } from '@modules/grpc/library/blockjoy/v1/node';
import { User } from '@modules/grpc/library/blockjoy/v1/user';
import { Host } from '@modules/grpc/library/blockjoy/v1/host';
import { Org } from '@modules/grpc/library/blockjoy/v1/org';

export type AdminDetailsItem = Node | User | Host | Org;

const views = [
  { name: 'users', component: <AdminUser /> },
  { name: 'nodes', component: <AdminNode /> },
  { name: 'hosts', component: <AdminHost /> },
  { name: 'orgs', component: <AdminOrg /> },
];

export const AdminDetails = () => {
  const router = useRouter();
  const { name, id, ip } = router.query;
  return (
    <div css={styles.wrapper}>
      {((id || ip) &&
        views.find((v) => v.name === (name as string))?.component) || (
        <>Not Found</>
      )}
    </div>
  );
};
