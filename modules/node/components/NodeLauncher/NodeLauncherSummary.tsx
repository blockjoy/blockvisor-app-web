import { Button, NodeTypeConfigLabel } from '@shared/components';
import { FC } from 'react';
import { styles } from './NodeLauncherSummary.styles';
import { useGetBlockchains } from '@modules/node/hooks/useGetBlockchains';
import { nodeTypeList } from '@shared/constants/lookups';
import IconCheck from '@public/assets/icons/check-16.svg';
import IconClose from '@public/assets/icons/close-12.svg';
import IconRocket from '@public/assets/icons/rocket-12.svg';

type Props = {
  isNodeValid: boolean;
  isConfigValid: boolean;
  blockchainId: string;
  nodeTypeId: string;
  onCreateNodeClicked: VoidFunction;
};

export const NodeLauncherSummary: FC<Props> = ({
  isNodeValid,
  isConfigValid,
  blockchainId,
  nodeTypeId,
  onCreateNodeClicked,
}) => {
  const { blockchains } = useGetBlockchains();

  return (
    <div css={styles.wrapper}>
      <h2 css={styles.h2}>Launch</h2>
      <div css={styles.summary}>
        <ul css={styles.summaryList}>
          <li>
            <span css={styles.summaryIcon}>
              <IconCheck />
            </span>
            <div>
              <label>Blockchain</label>
              <span>
                {blockchains?.find((b) => b.id === blockchainId)?.name ||
                  'Not Selected'}
              </span>
            </div>
          </li>
          <li>
            <span css={styles.summaryIcon}>
              <IconCheck />
            </span>
            <div>
              <label>Type</label>
              <span>
                {nodeTypeList?.find((n) => n.id === +nodeTypeId)?.name ||
                  'Not Selected'}
              </span>
            </div>
          </li>
          <li>
            {isConfigValid ? (
              <span css={styles.summaryIcon}>
                <IconCheck />
              </span>
            ) : (
              <span css={styles.summaryIconClose}>
                <IconClose />
              </span>
            )}

            <div>
              <label>Configuration</label>
              <span>{isConfigValid ? 'Looks Good' : 'Needs Work'}</span>
            </div>
          </li>
        </ul>
        <div css={styles.buttons}>
          <button
            onClick={onCreateNodeClicked}
            disabled={!isNodeValid || !isConfigValid}
            css={styles.createButton}
          >
            <IconRocket />
            <span>Launch Your Node</span>
          </button>
          {/* <Button display="block" style="outline">
            Start Again
          </Button> */}
        </div>
      </div>
    </div>
  );
};
