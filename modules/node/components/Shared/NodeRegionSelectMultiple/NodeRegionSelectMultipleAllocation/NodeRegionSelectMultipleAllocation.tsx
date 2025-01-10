import { useRecoilValue } from 'recoil';
import { nodeLauncherAtoms } from '@modules/node';
import { FormLabel, SvgIcon } from '@shared/components';
import { styles } from './NodeRegionSelectMultipleAllocation.styles';
import { ChangeEvent } from 'react';
import { Region } from '@modules/grpc/library/blockjoy/v1/host';
import IconClose from '@public/assets/icons/common/Close.svg';

type Props = {
  onChange: (region: Region) => void;
  onRegionAllocationChanged: (region: Region, nodesToLaunch: number) => void;
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
        {selectedRegions?.map((r) => (
          <div css={styles.allocationRow} key={r.region.name}>
            <p css={styles.name}>{r.region.name}</p>
            <button
              className="remove-button"
              css={styles.removeButton}
              type="button"
              onClick={() => onChange(r.region)}
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
                  onRegionAllocationChanged(r.region, nodesToLaunch);
                }
              }}
              value={r.nodesToLaunch}
              css={[styles.allocationInput]}
              type="tel"
            />
          </div>
        ))}
      </div>
    </>
  );
};
