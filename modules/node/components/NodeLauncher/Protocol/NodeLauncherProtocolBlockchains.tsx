import { useMemo, useState } from 'react';
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
import { styles } from './NodeLauncherProtocolBlockchains.styles';

type NodeLauncherProtocolBlockchainsProps = {
  onProtocolSelected: (blockchainId: string, nodeTypeId: NodeType) => void;
};

export const NodeLauncherProtocolBlockchains = ({
  onProtocolSelected,
}: NodeLauncherProtocolBlockchainsProps) => {
  const nodeLauncher = useRecoilValue(nodeLauncherAtoms.nodeLauncher);
  const blockchains = useRecoilValue(blockchainAtoms.blockchains);
  const loadingState = useRecoilValue(blockchainAtoms.blockchainsLoadingState);

  const [isFocused, setIsFocused] = useState(false);
  const handleFocus = (focus: boolean) => setIsFocused(focus);

  const { blockchainId: activeBlockchainId, nodeType: activeNodeType } =
    nodeLauncher;

  const selectedBlockchain = useRecoilValue(
    nodeLauncherSelectors.selectedBlockchain(activeBlockchainId),
  );

  const handleSelect = (activeBlockchain: Blockchain) => {
    const nodeTypes = getNodeTypes(activeBlockchain!);

    onProtocolSelected(activeBlockchain?.id!, nodeTypes?.[0]?.nodeType);
  };

  // Blockchain component to show in the list
  const renderItem = (blockchain: Blockchain, isFocusedItem?: boolean) => {
    const nodeTypes = getNodeTypes(blockchain);

    const handleBlockchainSelected = () =>
      onProtocolSelected(blockchain.id!, nodeTypes[0].nodeType);

    const isActiveItem = blockchain.id === activeBlockchainId;

    return (
      <div
        css={[styles.row, styles.rowHover]}
        className={`row list-item${isActiveItem ? ' active' : ''}${
          isFocusedItem ? ' focus' : ''
        }`}
      >
        <span css={styles.blockchainWrapper}>
          <button
            tabIndex={-1}
            css={styles.button}
            onClick={handleBlockchainSelected}
          >
            <BlockchainIcon
              size="28px"
              hideTooltip
              blockchainName={blockchain?.name}
            />
            <p>{blockchain?.name}</p>
          </button>
        </span>
        <div css={styles.nodeTypeButtons} className="node-type-buttons">
          {nodeTypes.map((nodeType) => {
            const isActive =
              activeBlockchainId === blockchain.id &&
              activeNodeType === nodeType.nodeType;

            return (
              <button
                key={nodeType.nodeType}
                className={isActive ? 'active' : ''}
                onClick={() =>
                  onProtocolSelected(blockchain.id!, nodeType.nodeType)
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

  // If blockchains is empty, show error message
  if (!blockchains?.length && loadingState === 'finished')
    return (
      <div css={[typo.small, colors.warning]} style={{ marginLeft: '16px' }}>
        Error loading data, please contact our support team.
      </div>
    );

  // If blockchains is not empty, show List
  return (
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
    />
  );
};
