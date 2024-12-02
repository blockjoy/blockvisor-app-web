import { useRecoilValue } from 'recoil';
import { nodeLauncherAtoms, nodeLauncherSelectors } from '@modules/node';
import { hostAtoms } from '@modules/host';
import { authSelectors } from '@modules/auth';
import { styles } from './NodeLauncherSummaryDetails.styles';
import IconCheckCircle from '@public/assets/icons/common/CheckCircle.svg';
import IconUncheckCircle from '@public/assets/icons/common/UncheckCircle.svg';

type Props = {
  totalNodesToLaunch: number;
};

export const NodeLauncherSummaryDetails = ({ totalNodesToLaunch }: Props) => {
  const isSuperUser = useRecoilValue(authSelectors.isSuperUser);
  const hasSummary = useRecoilValue(nodeLauncherSelectors.hasSummary);
  const nodeLauncher = useRecoilValue(nodeLauncherAtoms.nodeLauncher);
  const isNodeValid = useRecoilValue(nodeLauncherSelectors.isNodeValid);
  const isConfigValid = useRecoilValue(nodeLauncherSelectors.isConfigValid);
  const error = useRecoilValue(nodeLauncherAtoms.error);
  const selectedHosts = useRecoilValue(nodeLauncherAtoms.selectedHosts);
  const allHosts = useRecoilValue(hostAtoms.allHosts);
  const selectedRegion = useRecoilValue(nodeLauncherAtoms.selectedRegion);
  const selectedVersion = useRecoilValue(nodeLauncherAtoms.selectedVersion);
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
            <label>Blockchain</label>
            <span>{selectedProtocol?.name || 'Not Selected'}</span>
          </div>
        </li>
        {isSuperUser && selectedHosts && (
          <li>
            <span css={styles.summaryIcon}>
              <IconCheckCircle />
            </span>
            <div>
              <label>Quantity</label>
              <span>{totalNodesToLaunch}</span>
            </div>
          </li>
        )}
        <li>
          {!isSuperUser || (isConfigValid && isNodeValid) ? (
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
              {!isSuperUser || (isConfigValid && isNodeValid)
                ? 'Ready For Liftoff'
                : 'Needs Work'}
            </span>
          </div>
        </li>
      </ul>
      {(!isConfigValid || !isNodeValid) && isSuperUser && (
        <>
          <h2 css={styles.missingFieldsTitle}>
            The following needs to be added:
          </h2>
          <div css={styles.missingFields}>
            {!isConfigValid
              ? properties
                  ?.filter((property) => !property.value)
                  .map((property) => (
                    <div key={property.name}>{property.name}</div>
                  ))
              : null}
            {!isNodeValid ? (
              <>
                {!selectedHosts && allHosts?.length ? (
                  <div>Host or Region</div>
                ) : null}
                {!selectedRegion && !allHosts?.length ? (
                  <div>Region</div>
                ) : null}
                {!hasSummary ? <div>Blockchain</div> : null}
              </>
            ) : null}
            {!selectedVersion && <div>Version</div>}
          </div>
        </>
      )}
      {error && <div css={styles.serverError}>{error}</div>}
    </div>
  );
};
