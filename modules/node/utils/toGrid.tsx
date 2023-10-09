import { TableGridCell, NodeStatus } from '@shared/components';
import { BlockchainIcon } from '@shared/components';
import { Node } from '@modules/grpc/library/blockjoy/v1/node';
import { convertNodeTypeToName } from '@modules/node/utils/convertNodeTypeToName';
import { NodeStatus as NodeStatusEnum } from '@modules/grpc/library/blockjoy/v1/node';
import { usePermissions } from '@modules/auth/hooks/usePermissions';
import { getNodeJobProgress } from './getNodeJobProgress';

export const toGrid = (
  nodeList: Node[],
  onCellClick: (args0: any) => void,
  onDeleteClick: (id: string, name: string, hostId: string) => void,
) => {
  const { hasPermission } = usePermissions();

  return nodeList?.map((node: Node) => {
    const isProvisioning =
      node.status === NodeStatusEnum.NODE_STATUS_PROVISIONING;

    const progress = getNodeJobProgress(node);

    const handleCellClicked =
      !isProvisioning || hasPermission('node-admin-get')
        ? () => onCellClick(node.id)
        : undefined;

    const handleDeleteClicked = () =>
      onDeleteClick(node.id, node.name, node.hostId);

    return {
      key: node.id,
      component: (
        <TableGridCell
          key={node.id}
          onCellClick={handleCellClicked}
          onDeleteClick={handleDeleteClicked}
          cellTitle={node.name}
          cellIcon={
            <BlockchainIcon size="28px" blockchainName={node.blockchainName} />
          }
          cellStatus={
            <NodeStatus
              hasBorder
              status={node.status}
              loadingCurrent={progress?.current}
              loadingTotal={progress?.total}
            />
          }
          cellType={`${node.blockchainName} ${convertNodeTypeToName(
            node.nodeType,
          )}`}
        />
      ),
    };
  });
};
