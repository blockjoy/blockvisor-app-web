import { AdminList } from '../AdminList/AdminList';
import { nodeClient } from '@modules/grpc';
import { formatters } from '@shared/utils/formatters';
import { NodeStatus } from '@shared/components';
import { useAdminGetTotals } from '@modules/admin/hooks/useAdminGetTotals';
import { pageSize } from '@modules/admin/constants/constants';
import IconNode from '@public/assets/icons/app/Node.svg';

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
  const { getTotalNodes: getTotal } = useAdminGetTotals();

  const getList = async (keyword?: string, page?: number) => {
    const response = await nodeClient.listNodes(
      undefined,
      {
        keyword: `%${keyword!}%`,
      },
      {
        current_page: page!,
        items_per_page: pageSize,
      },
    );
    return {
      list: response.nodes,
      total: response.nodeCount,
    };
  };

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
    <AdminList
      name="nodes"
      icon={<IconNode />}
      columns={columns}
      getTotal={getTotal}
      getList={getList}
      listMap={listMap}
    />
  );
};
