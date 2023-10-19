import { AdminListView } from '../AdminListView/AdminListView';
import { nodeClient } from '@modules/grpc';
import { useContext, useEffect } from 'react';
import { formatters } from '@shared/utils/formatters';
import { NodeStatus } from '@shared/components';
import { AdminContext } from '@modules/admin/components/AdminLayout/AdminLayout';
import IconNode from '@public/assets/icons/app/Node.svg';
import { useAdminGetTotals } from '@modules/admin/hooks/useAdminGetTotals';

const columns = [
  {
    name: 'name',
    width: '230px',
  },
  {
    name: 'status',
    width: '230px',
  },
  {
    name: 'created',
    width: '230px',
  },
];

export const AdminNodes = () => {
  const adminContext = useContext(AdminContext);

  const { getTotalNodes: getTotal } = useAdminGetTotals();

  const getList = async (searchTerm?: string, page?: number) => {
    const response = await nodeClient.listNodes(undefined, undefined, {
      current_page: page!,
      items_per_page: adminContext.listPageSize,
    });
    return {
      list: response.nodes,
      total: response.nodeCount,
    };
  };

  useEffect(() => {
    getTotal();
    getList();
  }, []);

  const listMap = (list: any[]) =>
    list.map((item) => {
      return {
        ...item,
        status: <NodeStatus status={item.status} hasBorder={false} />,
        created: `${formatters.formatDate(
          item.createdAt!,
        )} @ ${formatters.formatDate(item.createdAt!, 'time')}`,
      };
    });

  return (
    <AdminListView
      name="nodes"
      icon={<IconNode />}
      columns={columns}
      getTotal={getTotal}
      getList={getList}
      listMap={listMap}
    />
  );
};
