import { useRecoilValue } from 'recoil';
import { nodeLauncherAtoms } from '@modules/node';
import { FormLabel, HostIpStatus, SvgIcon } from '@shared/components';
import { styles } from './HostSelectMultipleAllocation.styles';
import { ChangeEvent } from 'react';
import { Host } from '@modules/grpc/library/blockjoy/v1/host';
import IconClose from '@public/assets/icons/common/Close.svg';

type Props = {
  isValid: boolean;
  onChange: (host: Host) => void;
  onHostAllocationChanged: (
    host: Host,
    nodesToLaunch: number,
    isValid?: boolean,
  ) => void;
};

export const HostSelectMultipleAllocation = ({
  isValid = true,
  onChange,
  onHostAllocationChanged,
}: Props) => {
  const selectedHosts = useRecoilValue(nodeLauncherAtoms.selectedHosts);

  return (
    <>
      <FormLabel hint="How nodes will be distributed to hosts">
        Node Allocation
      </FormLabel>
      <div css={styles.allocation}>
        <div css={styles.allocationHeaderRow}>
          <span css={styles.allocationHeader}>Host</span>
          <span css={styles.allocationHeader}>Nodes</span>
        </div>
        {selectedHosts?.map((h) => (
          <div css={styles.allocationRow} key={h.host.id}>
            <p css={styles.name}>{h.host.name}</p>
            <HostIpStatus ipAddresses={h.host.ipAddresses} />
            <button
              className="remove-button"
              css={styles.removeButton}
              type="button"
              onClick={() => onChange(h.host)}
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
                    nodesToLaunch <=
                    h.host.ipAddresses.filter((ip) => !ip.assigned).length;

                  onHostAllocationChanged(h.host, nodesToLaunch, isValid);
                }
              }}
              value={h.nodesToLaunch}
              css={[
                styles.allocationInput,
                !h.isValid && styles.allocationInputError,
              ]}
              type="tel"
            />
          </div>
        ))}
      </div>
    </>
  );
};
