import { GrpcBlockchainObject } from '@modules/client/grpc_client';
import { FC } from 'react';
import { styles } from './NodeCreateBlockchainMobile.styles';
import { BlockchainIcon } from '@shared/components';
import { nodeTypeList } from '@shared/constants/lookups';

type Props = {
  blockchain: GrpcBlockchainObject;
  onNodeTypeClicked: (type: string, blockchainId: string) => void;
};

export const NodeCreateBlockchainMobile: FC<Props> = ({
  blockchain,
  onNodeTypeClicked,
}) => {
  return (
    <>
      <div css={styles.row}>
        <div css={styles.blockchainIcon}>
          <BlockchainIcon hideTooltip blockchainId={blockchain.id} />
        </div>
        <div>
          <div css={styles.blockchainName}>{blockchain.name}</div>
        </div>
      </div>
      <div css={styles.buttons}>
        {blockchain.supported_node_types.map((type: any) => (
          <button
            onClick={() => onNodeTypeClicked(type.id, blockchain.id!)}
            type="button"
            css={styles.createButton}
          >
            {nodeTypeList.find((n) => n.id === type.id)?.name}
          </button>
        ))}
      </div>
    </>
  );
};
