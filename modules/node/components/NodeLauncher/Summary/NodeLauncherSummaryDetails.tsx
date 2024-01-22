import { useRecoilValue } from 'recoil';
import IconCheckCircle from '@public/assets/icons/common/CheckCircle.svg';
import IconUncheckCircle from '@public/assets/icons/common/UncheckCircle.svg';
import {
  blockchainAtoms,
  nodeLauncherAtoms,
  nodeLauncherSelectors,
} from '@modules/node';
import { nodeTypeList } from '@shared/constants/lookups';
import { colors } from 'styles/utils.colors.styles';
import { spacing } from 'styles/utils.spacing.styles';
import { styles } from './NodeLauncherSummaryDetails.styles';

export const NodeLauncherSummaryDetails = () => {
  const blockchains = useRecoilValue(blockchainAtoms.blockchains);
  const nodeLauncher = useRecoilValue(nodeLauncherAtoms.nodeLauncher);
  const hasNetworkList = useRecoilValue(nodeLauncherSelectors.hasNetworkList);
  const isConfigValid = useRecoilValue(nodeLauncherSelectors.isConfigValid);
  const error = useRecoilValue(nodeLauncherAtoms.error);

  const { blockchainId, nodeType, properties } = nodeLauncher;

  return (
    <div css={styles.summary}>
      {!hasNetworkList ? (
        <div css={[colors.warning, spacing.bottom.medium]}>
          Cannot launch node, missing network configuration.
        </div>
      ) : (
        <>
          <ul css={styles.summaryList}>
            <li>
              <span css={styles.summaryIcon}>
                <IconCheckCircle />
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
                <IconCheckCircle />
              </span>
              <div>
                <label>Type</label>
                <span>
                  {nodeTypeList?.find((n) => n.id === +nodeType)?.name ||
                    'Not Selected'}
                </span>
              </div>
            </li>
            <li>
              {isConfigValid ? (
                <span css={styles.summaryIcon}>
                  <IconCheckCircle />
                </span>
              ) : (
                <span css={styles.summaryIcon}>
                  <IconUncheckCircle />
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
                {properties
                  ?.filter(
                    (property: any) =>
                      property.required &&
                      !property.disabled &&
                      !property.value,
                  )
                  .map((property: any) => (
                    <div key={property.name}>{property.displayName}</div>
                  ))}
              </div>
            </>
          )}

          {error && <div css={styles.serverError}>{error}</div>}
        </>
      )}
    </div>
  );
};
