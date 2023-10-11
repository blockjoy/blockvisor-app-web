import { useGetBlockchains } from '@modules/node';
import { BlockchainIcon, EmptyColumn, sort } from '@shared/components';
import { NodeType } from '@modules/grpc/library/blockjoy/v1/node';
import { styles } from './NodeLauncherProtocolBlockchains.styles';
import { convertNodeTypeToName } from '@modules/node/utils/convertNodeTypeToName';
import { onlyUnique } from '@shared/utils/onlyUnique';

type Props = {
  keyword: string;
  onProtocolSelected: (blockchainId: string, nodeTypeId: NodeType) => void;
  activeBlockchainId: string;
  activeNodeType: NodeType;
};

export const NodeLauncherProtocolBlockchains = ({
  keyword,
  onProtocolSelected,
  activeBlockchainId,
  activeNodeType,
}: Props) => {
  const { blockchains } = useGetBlockchains();

  const filteredBlockchains = blockchains?.filter((blockchain) =>
    blockchain.name?.toLowerCase().includes(keyword.toLowerCase()),
  );

  return (
    <>
      {!filteredBlockchains?.length ? (
        <EmptyColumn
          title="No Blockchains."
          description="Please refine your search."
        />
      ) : (
        filteredBlockchains?.map((blockchain, index) => {
          const nodeTypesWithName = blockchain.nodeTypes.map((nodeType) => ({
            ...nodeType,
            nodeTypeName: convertNodeTypeToName(nodeType.nodeType),
          }));
          const sortedNodeTypes = sort(nodeTypesWithName, {
            field: 'nodeTypeName',
            order: 'asc',
          });
          return (
            <div
              tabIndex={activeNodeType ? -1 : index + 1}
              key={blockchain.id}
              css={[styles.row, styles.rowHover]}
              className={
                blockchain.id === activeBlockchainId ? 'active row' : 'row'
              }
            >
              <span css={styles.blockchainWrapper}>
                <button
                  onClick={() =>
                    activeBlockchainId !== blockchain.id
                      ? onProtocolSelected(
                          blockchain.id!,
                          sortedNodeTypes[0].nodeType,
                        )
                      : null
                  }
                  css={styles.name}
                >
                  <BlockchainIcon
                    size="28px"
                    hideTooltip
                    blockchainName={blockchain.name}
                  />
                  <p>{blockchain.name}</p>
                </button>
              </span>
              <div css={styles.nodeTypeButtons} className="node-type-buttons">
                {sortedNodeTypes
                  .map((type) => type.nodeType)
                  .filter(onlyUnique)
                  .map((nodeType: NodeType) => (
                    <button
                      tabIndex={nodeType ? -1 : index + 1}
                      key={nodeType}
                      className={
                        nodeType === activeNodeType &&
                        blockchain.id === activeBlockchainId
                          ? 'active'
                          : ''
                      }
                      disabled={
                        activeBlockchainId === blockchain.id &&
                        activeNodeType === nodeType
                      }
                      onClick={() =>
                        onProtocolSelected(blockchain.id!, nodeType)
                      }
                      type="button"
                      css={styles.createButton}
                    >
                      {convertNodeTypeToName(nodeType)}
                    </button>
                  ))}
              </div>
            </div>
          );
        })
      )}
    </>
  );
};
