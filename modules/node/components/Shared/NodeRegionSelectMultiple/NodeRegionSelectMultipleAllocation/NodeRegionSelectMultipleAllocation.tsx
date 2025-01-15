import { useRecoilValue } from 'recoil';
import { nodeLauncherAtoms } from '@modules/node';
import { Alert, FormLabel, SvgIcon } from '@shared/components';
import { styles } from './NodeRegionSelectMultipleAllocation.styles';
import { ChangeEvent } from 'react';
import { RegionInfo } from '@modules/grpc/library/blockjoy/v1/host';
import IconClose from '@public/assets/icons/common/Close.svg';
import { isValid } from 'date-fns';

type Props = {
  onChange: (regionInfo: RegionInfo) => void;
  onRegionAllocationChanged: (
    regionInfo: RegionInfo,
    nodesToLaunch: number,
    isValid?: boolean,
  ) => void;
  isValid?: boolean;
};

export const NodeRegionSelectMultipleAllocation = ({
  onChange,
  onRegionAllocationChanged,
}: Props) => {
  const selectedRegions = useRecoilValue(nodeLauncherAtoms.selectedRegions);

  return (
    <>
      <FormLabel hint="How nodes will be distributed to hosts">
        Node Allocation
      </FormLabel>
      <div css={styles.allocation}>
        <div css={styles.allocationHeaderRow}>
          <span css={styles.allocationHeader}>Region</span>
          <span css={styles.allocationHeader}>Nodes</span>
        </div>
        {selectedRegions?.map((nodeLauncherRegion) => (
          <div
            css={styles.allocationRow}
            key={nodeLauncherRegion.regionInfo.region?.regionId}
          >
            <p css={styles.name}>
              {nodeLauncherRegion.regionInfo.region?.displayName ||
                nodeLauncherRegion.regionInfo.region?.regionKey}
            </p>
            <Alert
              additionalStyles={[styles.alert]}
              isSuccess={nodeLauncherRegion.regionInfo.freeIps > 0}
            >{`${nodeLauncherRegion.regionInfo.freeIps} IP${
              nodeLauncherRegion.regionInfo.freeIps !== 1 ? `s` : ''
            }`}</Alert>
            <button
              className="remove-button"
              css={styles.removeButton}
              type="button"
              onClick={() => onChange(nodeLauncherRegion.regionInfo)}
            >
              <SvgIcon size="12px" tooltip="Remove" tooltipMinWidth="80px">
                <IconClose />
              </SvgIcon>
            </button>
            <input
              pattern="[0-9]*"
              onChange={(e: ChangeEvent<HTMLInputElement>) => {
                if (e.target.validity.valid) {
                  const nodesToLaunch = +e.target.value;

                  const isValid =
                    nodesToLaunch <= nodeLauncherRegion.regionInfo.freeIps;

                  onRegionAllocationChanged(
                    nodeLauncherRegion.regionInfo,
                    nodesToLaunch,
                    isValid,
                  );
                }
              }}
              value={nodeLauncherRegion.nodesToLaunch}
              css={[
                styles.allocationInput,
                !nodeLauncherRegion.isValid && styles.allocationInputError,
              ]}
              type="tel"
            />
          </div>
        ))}
      </div>
    </>
  );
};
