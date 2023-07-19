import { useGetBlockchains } from '@modules/node';
import { BlockchainIcon, EmptyColumn } from '@shared/components';
import { NodeProperty, NodeType } from '@modules/grpc/library/blockjoy/v1/node';
import { SupportedNodeType } from '@modules/grpc/library/blockjoy/v1/blockchain';
import { styles } from './NodeLauncherProtocolBlockchains.styles';
import { nodeTypeList } from '@shared/constants/lookups';

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
        filteredBlockchains?.map((b, index) => (
          <div
            tabIndex={activeNodeType ? -1 : index + 1}
            key={b.id}
            css={[styles.row, styles.rowHover]}
            className={b.id === activeBlockchainId ? 'active row' : 'row'}
          >
            <span css={styles.blockchainWrapper}>
              <BlockchainIcon size="28px" hideTooltip blockchainName={b.name} />
              <span css={styles.name}>{b.name}</span>
            </span>
            <div css={styles.nodeTypeButtons} className="node-type-buttons">
              {b.nodesTypes
                .map((type) => type.nodeType)
                .filter(onlyUnique)
                .map((nodeType: NodeType) => (
                  <button
                    tabIndex={nodeType ? -1 : index + 1}
                    key={nodeType}
                    className={
                      nodeType === activeNodeType && b.id === activeBlockchainId
                        ? 'active'
                        : ''
                    }
                    onClick={() => handleProtocolSelected(b.id!, nodeType)}
                    type="button"
                    css={styles.createButton}
                  >
                    {nodeTypeList.find((n) => n.id === nodeType)?.name}
                  </button>
                ))}
            </div>
          </div>
        ))
      )}
    </>
  );
};
