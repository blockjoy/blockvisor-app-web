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
  activeNodeTypeId: NodeType;
};

export const NodeLauncherProtocolBlockchains = ({
  keyword,
  onProtocolSelected,
  activeBlockchainId,
  activeNodeTypeId,
}: Props) => {
  const { blockchains, loading } = useGetBlockchains();

  const filteredBlockchains = blockchains?.filter((b) =>
    b.name?.toLowerCase().includes(keyword.toLowerCase()),
  );

  const handleProtocolSelected = (
    blockchainId: string,
    nodeTypeId: NodeType,
  ) => {
    const blockchainsCopy = [...blockchains];

    const foundActiveNodeType = blockchainsCopy?.find(
      (b) => b.id === blockchainId,
    );

    const foundActiveSupportedNodeType = foundActiveNodeType?.nodesTypes!.find(
      (n: SupportedNodeType) => n.nodeType === nodeTypeId,
    );

    onProtocolSelected(
      blockchainId,
      nodeTypeId,
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
            tabIndex={activeNodeTypeId ? -1 : index + 1}
            key={b.id}
            css={[styles.row, styles.rowHover]}
            className={b.id === activeBlockchainId ? 'active row' : 'row'}
          >
            <span css={styles.blockchainWrapper}>
              <BlockchainIcon size="28px" hideTooltip blockchainName={b.name} />
              <span css={styles.name}>
                {/* <span className="beta-badge" css={styles.betaBadge}>
                  BETA
                </span> */}
                {b.name}
              </span>
            </span>
            <div css={styles.nodeTypeButtons} className="node-type-buttons">
              {b.nodesTypes.map((type: SupportedNodeType) => (
                <button
                  tabIndex={activeNodeTypeId ? -1 : index + 1}
                  key={type.nodeType}
                  className={
                    type.nodeType === activeNodeTypeId &&
                    b.id === activeBlockchainId
                      ? 'active'
                      : ''
                  }
                  onClick={() => handleProtocolSelected(b.id!, type.nodeType)}
                  type="button"
                  css={styles.createButton}
                >
                  {nodeTypeList.find((n) => n.id === type.nodeType)?.name}
                </button>
              ))}
            </div>
          </div>
        ))
      )}
    </>
  );
};
