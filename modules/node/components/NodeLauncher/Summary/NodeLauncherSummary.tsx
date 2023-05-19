import { NodeTypeConfigLabel } from '@modules/node';
import { FC } from 'react';
import { styles } from './NodeLauncherSummary.styles';
import { useGetBlockchains } from '@modules/node/hooks/useGetBlockchains';
import { nodeTypeList } from '@shared/constants/lookups';
import { colors } from 'styles/utils.colors.styles';
import { spacing } from 'styles/utils.spacing.styles';
import {
  NodeProperty,
  NodeType,
  UiType,
} from '@modules/grpc/library/blockjoy/v1/node';
import { NodeLauncherOrgPicker } from './NodeLauncherOrgPicker';
import { FormHeader, FormLabel } from '@shared/components';
import IconCheck from '@public/assets/icons/check-circle.svg';
import IconClose from '@public/assets/icons/close.svg';
import IconRocket from '@public/assets/icons/rocket-12.svg';
import IconCog from '@public/assets/icons/cog-12.svg';

type Props = {
  serverError: string;
  hasAddedFiles: boolean;
  hasNetworkList: boolean;
  isNodeValid: boolean;
  isConfigValid: boolean | null;
  isCreating: boolean;
  blockchainId: string;
  nodeTypeId: NodeType;
  nodeTypeProperties: NodeProperty[];
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

  if (isConfigValid === null) return null;

  return (
    <div css={styles.wrapper}>
      <FormHeader>Launch</FormHeader>
      <FormLabel>Organization</FormLabel>
      <NodeLauncherOrgPicker />

      <FormLabel>Summary</FormLabel>
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
                        (property.uiType !== UiType.UI_TYPE_FILE_UPLOAD &&
                          property.required &&
                          !property.disabled &&
                          !property.value) ||
                        (property.uiType === UiType.UI_TYPE_FILE_UPLOAD &&
                          !hasAddedFiles),
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
      </div>
      <div css={styles.buttons}>
        <button
          tabIndex={20}
          onClick={onCreateNodeClicked}
          disabled={
            !hasNetworkList ||
            !isNodeValid ||
            !isConfigValid ||
            Boolean(serverError) ||
            isCreating
          }
          css={[
            styles.createButton,
            isCreating && !Boolean(serverError) && styles.createButtonLoading,
          ]}
        >
          <span css={styles.createButtonInner}>
            {isCreating && !Boolean(serverError) ? (
              <span css={styles.cogIcon}>
                <IconCog />
              </span>
            ) : (
              <IconRocket />
            )}
            <span>
              {isCreating && !Boolean(serverError)
                ? 'Launching'
                : 'Launch Your Node'}
            </span>
          </span>
        </button>
      </div>
    </div>
  );
};
