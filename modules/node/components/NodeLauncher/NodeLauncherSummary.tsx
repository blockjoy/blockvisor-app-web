import { NodeTypeConfigLabel } from '@shared/components';
import { FC } from 'react';
import { styles } from './NodeLauncherSummary.styles';
import { useGetBlockchains } from '@modules/node/hooks/useGetBlockchains';
import { nodeTypeList } from '@shared/constants/lookups';
import IconCheck from '@public/assets/icons/check-16.svg';
import IconClose from '@public/assets/icons/close.svg';
import IconRocket from '@public/assets/icons/rocket-12.svg';
import { colors } from 'styles/utils.colors.styles';
import { spacing } from 'styles/utils.spacing.styles';

type Props = {
  serverError: string;
  hasAddedFiles: boolean;
  hasNetworkList: boolean;
  isNodeValid: boolean;
  isConfigValid: boolean;
  isCreating: boolean;
  blockchainId: string;
  nodeTypeId: string;
  nodeTypeProperties: NodeTypeConfig[];
  onCreateNodeClicked: VoidFunction;
};

export const NodeLauncherSummary: FC<Props> = ({
  serverError,
  hasAddedFiles,
  hasNetworkList,
  isNodeValid,
  isConfigValid,
  isCreating,
  blockchainId,
  nodeTypeId,
  nodeTypeProperties,
  onCreateNodeClicked,
}) => {
  const { blockchains } = useGetBlockchains();
  return (
    <div css={styles.wrapper}>
      <h2 css={styles.h2}>Launch</h2>
      <div css={styles.summary}>
        {!hasNetworkList ? (
          <div css={[colors.warning, spacing.bottom.medium]}>
            Cannot launch node, missing network configuration.{' '}
          </div>
        ) : (
          <>
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
                  <span>
                    {isConfigValid ? 'Ready For Liftoff' : 'Needs Work'}
                  </span>
                </div>
              </li>
            </ul>
            {!isConfigValid && (
              <>
                <h2 css={styles.missingFieldsTitle}>
                  The following information needs to be added:
                </h2>
                <div css={styles.missingFields}>
                  {nodeTypeProperties
                    ?.filter(
                      (property) =>
                        (property.ui_type !== 'key-upload' &&
                          property.required &&
                          !property.disabled &&
                          !property.value) ||
                        (property.ui_type === 'key-upload' && !hasAddedFiles),
                    )
                    .map((property) => (
                      <div key={property.name}>
                        <NodeTypeConfigLabel>
                          {property.name}
                        </NodeTypeConfigLabel>
                      </div>
                    ))}
                </div>
              </>
            )}

            {serverError && <div css={styles.serverError}>{serverError}</div>}
          </>
        )}

        <div css={styles.buttons}>
          <button
            onClick={onCreateNodeClicked}
            disabled={
              !hasNetworkList ||
              !isNodeValid ||
              !isConfigValid ||
              Boolean(serverError) ||
              isCreating
            }
            css={styles.createButton}
          >
            <IconRocket />
            <span>Launch Your Node</span>
          </button>
        </div>
      </div>
    </div>
  );
};
