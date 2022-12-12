import { useGetBlockchains } from '@modules/node/hooks/useGetBlockchains';
import { FC } from 'react';
import { styles } from './NodeCreateBlockchain.styles';
import { BlockchainIcon } from '@shared/components';
import { nodeTypeList } from '@shared/constants/lookups';
import { NodeCreateBlockchainMobile } from './NodeCreateBlockchainMobile';

type Props = {
  inputValue: string;
  onNodeTypeClicked: (type: string, blockchainId: string) => void;
  onInputMouseEnter: VoidFunction;
  onInputMouseLeave: VoidFunction;
};

export const NodeCreateBlockchain: FC<Props> = ({
  inputValue,
  onNodeTypeClicked,
  onInputMouseEnter,
  onInputMouseLeave,
}) => {
  const { blockchains } = useGetBlockchains();

  const filteredBlockchains = blockchains.filter((b) =>
    b.name?.toLowerCase().includes(inputValue?.toLowerCase()),
  );

  const isMobile = window.innerWidth <= 768;

  return (
    <div
      css={styles.wrapper}
      onMouseEnter={onInputMouseEnter}
      onMouseLeave={onInputMouseLeave}
    >
      <div css={styles.grid}>
        {filteredBlockchains.map((b) =>
          isMobile ? (
            <NodeCreateBlockchainMobile
              blockchain={b}
              onNodeTypeClicked={onNodeTypeClicked}
            />
          ) : (
            <div key={b.id} css={styles.row}>
              <div css={styles.header} key={b.id}>
                <span css={styles.iconWrapper}>
                  <BlockchainIcon hideTooltip blockchainId={b.id} />
                </span>
                <span css={styles.name}>{b.name}</span>
              </div>
              <div className="buttons" css={styles.buttons}>
                <div css={styles.miniHeader} key={b.id}>
                  <span css={styles.miniIconWrapper}>
                    <BlockchainIcon hideTooltip blockchainId={b.id} />
                  </span>
                  <span>{b.name}</span>
                </div>
                <div css={styles.buttonsGrid}>
                  {b.supported_node_types.map((type: any) => (
                    <button
                      onClick={() => onNodeTypeClicked(type.id, b.id!)}
                      type="button"
                      css={styles.createButton}
                    >
                      {nodeTypeList.find((n) => n.id === type.id)?.name}
                    </button>
                  ))}
                </div>
              </div>
            </div>
          ),
        )}
      </div>
    </div>
  );
};
