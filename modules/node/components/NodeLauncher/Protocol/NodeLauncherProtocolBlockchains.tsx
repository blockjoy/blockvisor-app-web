import { useGetBlockchains } from '@modules/node';
import { BlockchainIcon, EmptyColumn, sort } from '@shared/components';
import { NodeProperty, NodeType } from '@modules/grpc/library/blockjoy/v1/node';
import { SupportedNodeType } from '@modules/grpc/library/blockjoy/v1/blockchain';
import { styles } from './NodeLauncherProtocolBlockchains.styles';
import { convertNodeTypeToName } from '@modules/node/utils/convertNodeTypeToName';

type Props = {
  keyword: string;
  onProtocolSelected: (
    blockchainId: string,
    nodeTypeId: NodeType,
    nodeTypeProperties: NodeProperty[],
    nodeVersion: string,
  ) => void;
  activeBlockchainId: string;
  activeNodeType: NodeType;
};

const onlyUnique = (value: any, index: number, array: number[]) =>
  array.indexOf(value) === index;

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

  const handleProtocolSelected = (blockchainId: string, nodeType: NodeType) => {
    const blockchainsCopy = [...blockchains];

    const foundActiveNodeType = blockchainsCopy?.find(
      (b) => b.id === blockchainId,
    );

    const foundActiveSupportedNodeType = foundActiveNodeType?.nodesTypes!.find(
      (n: SupportedNodeType) => n.nodeType === nodeType,
    );

    onProtocolSelected(
      blockchainId,
      nodeType,
      foundActiveSupportedNodeType?.properties.map((property) => ({
        name: property.name,
        uiType: property.uiType,
        disabled: property.disabled,
        required: property.required,
        value: property.default ?? '',
      }))!,
      foundActiveSupportedNodeType?.version!,
    );
  };

  return (
    <>
      {!filteredBlockchains?.length ? (
        <EmptyColumn
          title="No Blockchains."
          description="Please refine your search."
        />
      ) : (
        filteredBlockchains?.map((b, index) => {
          const nodeTypesWithName = b.nodesTypes.map((nt) => ({
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
                    handleProtocolSelected(b.id!, sortedNodeTypes[0].nodeType)
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
                      onClick={() => handleProtocolSelected(b.id!, nodeType)}
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
