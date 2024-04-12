import { useCallback, useMemo, useState } from 'react';
import { useRecoilValue } from 'recoil';
import { NodeType } from '@modules/grpc/library/blockjoy/common/v1/node';
import { Blockchain } from '@modules/grpc/library/blockjoy/v1/blockchain';
import {
  BlockchainIcon,
  List,
  EmptyColumn,
  withSearchList,
} from '@shared/components';
import { colors } from 'styles/utils.colors.styles';
import { typo } from 'styles/utils.typography.styles';
import {
  blockchainAtoms,
  nodeLauncherAtoms,
  convertNodeTypeToName,
  getNodeTypes,
  nodeLauncherSelectors,
} from '@modules/node';
import { styles } from './NodeLauncherProtocol.styles';

type NodeLauncherProtocolProps = {
  onProtocolSelected: (blockchainId: string, nodeTypeId: NodeType) => void;
};

export const NodeLauncherProtocol = ({
  onProtocolSelected,
}: NodeLauncherProtocolProps) => {
  const nodeLauncher = useRecoilValue(nodeLauncherAtoms.nodeLauncher);
  const blockchains = useRecoilValue(blockchainAtoms.blockchains);
  const loadingState = useRecoilValue(blockchainAtoms.blockchainsLoadingState);

  const [isFocused, setIsFocused] = useState(false);
  const handleFocus = useCallback((focus: boolean) => {
    setIsFocused(focus);
  }, []);

  const { blockchainId: activeBlockchainId, nodeType: activeNodeType } =
    nodeLauncher;

  const selectedBlockchain = useRecoilValue(
    nodeLauncherSelectors.selectedBlockchain(activeBlockchainId),
  );

  const handleSelect = useCallback(
    (activeBlockchain: Blockchain, nodeType?: NodeType) => {
      const nodeTypes = getNodeTypes(activeBlockchain!);
      onProtocolSelected(
        activeBlockchain?.id!,
        nodeType ?? nodeTypes?.[0]?.nodeType,
      );
    },
    [onProtocolSelected],
  );

  const handleBlockchainSelected = useCallback(
    (
      e: React.MouseEvent<HTMLDivElement | HTMLButtonElement>,
      blockchain: Blockchain,
      nodeType?: NodeType,
    ) => {
      e.preventDefault();
      e.stopPropagation();
      handleSelect(blockchain, nodeType);
    },
    [handleSelect],
  );

  // Blockchain component to show in the list
  const renderItem = (blockchain: Blockchain, isFocusedItem?: boolean) => {
    const nodeTypes = getNodeTypes(blockchain);

    const isActiveItem = blockchain.id === activeBlockchainId;

    return (
      <div
        css={[styles.row, styles.rowHover]}
        className={`row list-item${isActiveItem ? ' active' : ''}${
          isFocusedItem ? ' focus' : ''
        }`}
        onClick={(e) => handleBlockchainSelected(e, blockchain)}
      >
        <div css={styles.blockchainWrapper}>
          <BlockchainIcon
            size="28px"
            hideTooltip
            blockchainName={blockchain?.name}
          />
          <p>{blockchain?.name}</p>
        </div>
        <div css={styles.nodeTypeButtons} className="node-type-buttons">
          {nodeTypes.map((nodeType) => {
            const isActive =
              activeBlockchainId === blockchain.id &&
              activeNodeType === nodeType.nodeType;

            return (
              <button
                key={nodeType.nodeType}
                className={isActive ? 'active' : ''}
                onClick={(e) =>
                  handleBlockchainSelected(e, blockchain, nodeType.nodeType)
                }
                type="button"
                css={styles.createButton}
                {...(!isActiveItem && { tabIndex: -1 })}
              >
                {convertNodeTypeToName(nodeType.nodeType)}
              </button>
            );
          })}
        </div>
      </div>
    );
  };

  // Empty component to show when there are no blockchains
  const renderEmpty = () => (
    <EmptyColumn
      title="No Blockchains."
      description="Please refine your search."
    />
  );

  const BlockchainsList = useMemo(
    () => withSearchList<Blockchain>(List),
    [blockchains],
  );

  return (
    <div css={styles.wrapper}>
      {!blockchains?.length && loadingState === 'finished' ? (
        <div css={[typo.small, colors.warning]} style={{ marginLeft: '16px' }}>
          Error loading data, please contact our support team.
        </div>
      ) : (
        <BlockchainsList
          items={blockchains}
          selectedItem={selectedBlockchain}
          renderItem={renderItem}
          renderEmpty={renderEmpty}
          handleSelect={handleSelect}
          searchPlaceholder="Find a Protocol"
          isFocused={isFocused}
          handleFocus={handleFocus}
          isLoading={loadingState !== 'finished'}
          additionalyStyles={[styles.scrollbar]}
        />
      )}
    </div>
  );
};
