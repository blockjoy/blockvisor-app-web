import { useRecoilValue } from 'recoil';
import { nodeLauncherAtoms, nodeLauncherSelectors } from '@modules/node';
import { hostAtoms } from '@modules/host';
import { authSelectors } from '@modules/auth';
import { styles } from './NodeLauncherSummaryDetails.styles';
import IconCheckCircle from '@public/assets/icons/common/CheckCircle.svg';
import IconUncheckCircle from '@public/assets/icons/common/UncheckCircle.svg';
import { kebabToCapitalized } from 'utils';
import { capitalize } from 'utils/capitalize';

type Props = {
  totalNodesToLaunch: number;
};

export const NodeLauncherSummaryDetails = ({ totalNodesToLaunch }: Props) => {
  const isSuperUser = useRecoilValue(authSelectors.isSuperUser);
  const hasSummary = useRecoilValue(nodeLauncherSelectors.hasSummary);
  const nodeLauncher = useRecoilValue(nodeLauncherAtoms.nodeLauncher);
  const isNodeValid = useRecoilValue(nodeLauncherSelectors.isNodeValid);
  const isConfigValid = useRecoilValue(nodeLauncherSelectors.isConfigValid);
  const isNodeAllocationValid = useRecoilValue(
    nodeLauncherSelectors.isNodeAllocationValid,
  );
  const error = useRecoilValue(nodeLauncherAtoms.error);
  const selectedHosts = useRecoilValue(nodeLauncherAtoms.selectedHosts);
  const allHosts = useRecoilValue(hostAtoms.allHosts);
  const selectedRegions = useRecoilValue(nodeLauncherAtoms.selectedRegions);
  const selectedVersion = useRecoilValue(nodeLauncherAtoms.selectedVersion);
  const selectedVariant = useRecoilValue(nodeLauncherAtoms.selectedVariant);
  const selectedProtocol = useRecoilValue(nodeLauncherAtoms.selectedProtocol);

  const { properties } = nodeLauncher;

  return (
    <div css={styles.summary}>
      <ul css={styles.summaryList}>
        <li>
          <span css={styles.summaryIcon}>
            <IconCheckCircle />
          </span>
          <div>
            <label>Protocol</label>
            <span>{capitalize(selectedProtocol?.name!) || 'Not Selected'}</span>
          </div>
        </li>
        {isSuperUser && (selectedHosts || selectedRegions) && (
          <li>
            {isConfigValid && isNodeValid && isNodeAllocationValid ? (
              <span css={styles.summaryIcon}>
                <IconCheckCircle />
              </span>
            ) : (
              <span css={styles.summaryIcon}>
                <IconUncheckCircle />
              </span>
            )}
            <div>
              <label>Quantity</label>
              <span>{totalNodesToLaunch}</span>
            </div>
          </li>
        )}
        <li>
          {isConfigValid && isNodeValid && isNodeAllocationValid ? (
            <span css={styles.summaryIcon}>
              <IconCheckCircle />
            </span>
          ) : (
            <span css={styles.summaryIcon}>
              <IconUncheckCircle />
            </span>
          )}

          <div>
            <label>Config</label>
            <span>
              {isConfigValid && isNodeValid && isNodeAllocationValid
                ? 'Ready For Liftoff'
                : 'Needs Work'}
            </span>
          </div>
        </li>
      </ul>
      {(!isConfigValid || !isNodeValid || !isNodeAllocationValid) && (
        <>
          <h2 css={styles.missingFieldsTitle}>
            The following needs to be added:
          </h2>
          <div css={styles.missingFields}>
            {!isConfigValid
              ? properties
                  ?.filter((property) => !property.value)
                  .map((property) => (
                    <div key={property.key}>
                      {kebabToCapitalized(property.key)}
                    </div>
                  ))
              : null}
            {!isNodeValid || !isNodeAllocationValid ? (
              <>
                {!selectedHosts && !selectedRegions && allHosts?.length ? (
                  <div>Host or Region</div>
                ) : null}
                {!selectedRegions && !allHosts?.length ? (
                  <div>Region</div>
                ) : null}
                {!hasSummary ? <div>Protocol</div> : null}
              </>
            ) : null}
            {(selectedHosts && !selectedHosts?.every((host) => host.isValid)) ||
            (selectedRegions &&
              !selectedRegions?.every((region) => region.isValid) && (
                <div>Valid Node Allocation</div>
              )) ? (
              <div>Valid Node Allocation</div>
            ) : null}
          </div>
        </>
      )}
      {error && <div css={styles.serverError}>{error}</div>}
    </div>
  );
};
