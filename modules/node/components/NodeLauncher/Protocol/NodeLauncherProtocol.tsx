import { isMobile } from 'react-device-detect';
import { NodeType } from '@modules/grpc/library/blockjoy/common/v1/node';
import { Scrollbar } from '@shared/components';
import { NodeLauncherProtocolBlockchains } from './NodeLauncherProtocolBlockchains';
import { styles } from './NodeLauncherProtocol.styles';

type NodeLauncherProtocolProps = {
  onProtocolSelected: (blockchainId: string, nodeTypeId: NodeType) => void;
};

export const NodeLauncherProtocol = ({
  onProtocolSelected,
}: NodeLauncherProtocolProps) => {
  const blockchainsComponent = (
    <NodeLauncherProtocolBlockchains onProtocolSelected={onProtocolSelected} />
  );

  return (
    <div css={styles.wrapper}>
      {isMobile ? (
        blockchainsComponent
      ) : (
        <Scrollbar additionalStyles={[styles.scrollbar]}>
          {blockchainsComponent}
        </Scrollbar>
      )}
    </div>
  );
};
