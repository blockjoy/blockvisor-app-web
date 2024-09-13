import { useCallback, useRef } from 'react';
import { useRecoilValue } from 'recoil';
import { NodeType } from '@modules/grpc/library/blockjoy/common/v1/node';
import { Blockchain } from '@modules/grpc/library/blockjoy/v1/blockchain';
import { blockchainAtoms, getNodeTypes } from '@modules/node';
import { NodeLauncherProtocolList } from './NodeLauncherProtocolList';
import { styles } from './NodeLauncherProtocol.styles';
import { colors } from 'styles/utils.colors.styles';
import { typo } from 'styles/utils.typography.styles';

type NodeLauncherProtocolProps = {
  onProtocolSelected: (blockchainId: string, nodeTypeId: NodeType) => void;
};

export const NodeLauncherProtocol = ({
  onProtocolSelected,
}: NodeLauncherProtocolProps) => {
  const blockchains = useRecoilValue(blockchainAtoms.blockchains);
  const loadingState = useRecoilValue(blockchainAtoms.blockchainsLoadingState);

  const wrapperRef = useRef<HTMLDivElement>(null);

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

  return (
    <div css={styles.wrapper} ref={wrapperRef}>
      {!blockchains?.length && loadingState === 'finished' ? (
        <div css={[typo.small, colors.warning]} style={{ marginLeft: '16px' }}>
          Error loading data, please contact our support team.
        </div>
      ) : (
        <NodeLauncherProtocolList
          handleSelect={handleSelect}
          wrapperRef={wrapperRef}
          searchPlaceholder="Find a Protocol"
        />
      )}
    </div>
  );
};
