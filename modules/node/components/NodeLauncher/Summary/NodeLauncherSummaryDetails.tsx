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
  const hasSummary = useRecoilValue(nodeLauncherSelectors.hasSummary);
  const hasNetworkList = useRecoilValue(nodeLauncherSelectors.hasNetworkList);
  const isNodeValid = useRecoilValue(nodeLauncherSelectors.isNodeValid);
  const isConfigValid = useRecoilValue(nodeLauncherSelectors.isConfigValid);
  const error = useRecoilValue(nodeLauncherAtoms.error);
  const selectedHost = useRecoilValue(nodeLauncherAtoms.selectedHost);
  const selectedRegion = useRecoilValue(nodeLauncherAtoms.selectedRegion);

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
              {isConfigValid && isNodeValid ? (
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
                  {isConfigValid && isNodeValid
                    ? 'Ready For Liftoff'
                    : 'Needs Work'}
                </span>
              </div>
            </li>
          </ul>
          {(!isConfigValid || !isNodeValid) && (
            <>
              <h2 css={styles.missingFieldsTitle}>
                The following information needs to be added:
              </h2>
              <div css={styles.missingFields}>
                {!isConfigValid
                  ? properties
                      ?.filter(
                        (property: any) =>
                          property.required &&
                          !property.disabled &&
                          !property.value,
                      )
                      .map((property: any) => (
                        <div key={property.name}>{property.displayName}</div>
                      ))
                  : null}
                {!isNodeValid ? (
                  <>
                    {!selectedHost ? <div>Host</div> : null}
                    {!selectedRegion ? <div>Region</div> : null}
                    {!hasSummary ? <div>Blockchain</div> : null}
                  </>
                ) : null}
              </div>
            </>
          )}

          {error && <div css={styles.serverError}>{error}</div>}
        </>
      )}
    </div>
  );
};
