import { useRouter } from 'next/router';
import { styles } from './AdminDetails.styles';
import { AdminUser } from './AdminUser/AdminUser';
import { AdminNode } from './AdminNode/AdminNode';
import { AdminHost } from './AdminHost/AdminHost';
import { AdminOrg } from './AdminOrg/AdminOrg';
import { AdminProtocol } from './AdminProtocol/AdminProtocol';
import { Node } from '@modules/grpc/library/blockjoy/v1/node';
import { User } from '@modules/grpc/library/blockjoy/v1/user';
import { Host } from '@modules/grpc/library/blockjoy/v1/host';
import { Protocol } from '@modules/grpc/library/blockjoy/v1/protocol';
import { Org } from '@modules/grpc/library/blockjoy/v1/org';
import { spacing } from 'styles/utils.spacing.styles';

export type AdminDetailsItem = Node | User | Host | Org | Protocol;

const views = [
  { name: 'users', component: <AdminUser /> },
  { name: 'nodes', component: <AdminNode /> },
  { name: 'hosts', component: <AdminHost /> },
  { name: 'orgs', component: <AdminOrg /> },
  { name: 'protocols', component: <AdminProtocol /> },
];

export const AdminDetails = () => {
  const router = useRouter();
  const { name, id, ip } = router.query;
  return (
    <div css={styles.wrapper}>
      {((id || ip) &&
        views.find((v) => v.name === (name as string))?.component) || (
        <p css={spacing.top.medium}>Not Found</p>
      )}
    </div>
  );
};
