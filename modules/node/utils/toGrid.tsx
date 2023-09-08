import { TableGridCell, NodeStatus } from '@shared/components';
import { BlockchainIcon } from '@shared/components';
import { Node } from '@modules/grpc/library/blockjoy/v1/node';
import { convertNodeTypeToName } from '@modules/node/utils/convertNodeTypeToName';
import { NodeStatus as NodeStatusEnum } from '@modules/grpc/library/blockjoy/v1/node';

export const toGrid = (nodeList: Node[], onCellClick: (args0: any) => void) => {
  return nodeList?.map((node: Node) => {
    const isProvisioning =
      node.status === NodeStatusEnum.NODE_STATUS_PROVISIONING;

    const handleCellClick = !isProvisioning
      ? () => onCellClick(node.id)
      : undefined;

    return {
      key: node.id,
      component: (
        <TableGridCell
          key={node.id}
          onCellClick={handleCellClick}
          cellTitle={node.name}
          cellIcon={
            <BlockchainIcon size="28px" blockchainName={node.blockchainName} />
          }
          cellStatus={
            <NodeStatus
              hasBorder
              status={node.status}
              loadingCurrent={node?.dataSyncProgress?.current}
              loadingTotal={node?.dataSyncProgress?.total}
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
