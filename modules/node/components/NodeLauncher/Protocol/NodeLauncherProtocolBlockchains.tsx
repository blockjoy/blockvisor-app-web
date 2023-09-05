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

  const filteredBlockchains = blockchains?.filter((b) =>
    b.name?.toLowerCase().includes(keyword.toLowerCase()),
  );

  return (
    <>
      {!filteredBlockchains?.length ? (
        <EmptyColumn
          title="No Blockchains."
          description="Please refine your search."
        />
      ) : (
        filteredBlockchains?.map((b, index) => {
          const nodeTypesWithName = b.nodeTypes.map((nt) => ({
            ...nt,
            nodeTypeName: convertNodeTypeToName(nt.nodeType),
          }));
          const sortedNodeTypes = sort(nodeTypesWithName, {
            field: 'nodeTypeName',
            order: 'asc',
          });
          return (
            <div
              tabIndex={activeNodeType ? -1 : index + 1}
              key={b.id}
              css={[styles.row, styles.rowHover]}
              className={b.id === activeBlockchainId ? 'active row' : 'row'}
            >
              <span css={styles.blockchainWrapper}>
                <button
                  onClick={() =>
                    onProtocolSelected(b.id!, sortedNodeTypes[0].nodeType)
                  }
                  css={styles.name}
                >
                  <BlockchainIcon
                    size="28px"
                    hideTooltip
                    blockchainName={b.name}
                  />
                  <p>{b.name}</p>
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
                        b.id === activeBlockchainId
                          ? 'active'
                          : ''
                      }
                      onClick={() => onProtocolSelected(b.id!, nodeType)}
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
