import { useRecoilValue } from 'recoil';
import {
  blockchainAtoms,
  nodeLauncherAtoms,
  nodeLauncherSelectors,
} from '@modules/node';
import { nodeTypeList } from '@shared/constants/lookups';
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
  const blockchains = useRecoilValue(blockchainAtoms.blockchains);
  const nodeLauncher = useRecoilValue(nodeLauncherAtoms.nodeLauncher);
  const hasSummary = useRecoilValue(nodeLauncherSelectors.hasSummary);
  const isNodeValid = useRecoilValue(nodeLauncherSelectors.isNodeValid);
  const isConfigValid = useRecoilValue(nodeLauncherSelectors.isConfigValid);
  const error = useRecoilValue(nodeLauncherAtoms.error);
  const selectedHosts = useRecoilValue(nodeLauncherAtoms.selectedHosts);
  const allHosts = useRecoilValue(hostAtoms.allHosts);
  const selectedRegion = useRecoilValue(nodeLauncherAtoms.selectedRegion);

  const { blockchainId, nodeType, properties } = nodeLauncher;

  const blockchain = blockchains?.find((b) => b.id === blockchainId);

  return (
    <div css={styles.summary}>
      <ul css={styles.summaryList}>
        <li>
          <span css={styles.summaryIcon}>
            <IconCheckCircle />
          </span>
          <div>
            <label>Blockchain</label>
            <span>
              {blockchain?.displayName || blockchain?.name || 'Not Selected'}
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
                  ?.filter(
                    (property) =>
                      property.required &&
                      !property.disabled &&
                      !property.value,
                  )
                  .map((property) => (
                    <div key={property.name}>{property.displayName}</div>
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
          </div>
        </>
      )}

      {error && <div css={styles.serverError}>{error}</div>}
    </div>
  );
};
