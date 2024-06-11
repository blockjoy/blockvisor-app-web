import { Host } from '@modules/grpc/library/blockjoy/v1/host';
import { hostAtoms } from '@modules/host';
import { nodeLauncherAtoms, NodeLauncherHost } from '@modules/node';
import {
  DropdownWrapper,
  DropdownButton,
  DropdownMenu,
  HostIpStatus,
  Checkbox,
  Scrollbar,
  FormLabel,
  FormError,
} from '@shared/components';
import { ChangeEvent, Fragment, useState } from 'react';
import { useRecoilValue } from 'recoil';
import { styles } from './HostSelectMultiple.styles';

type Props = {
  isValid: boolean;
  nodeQuantity: number;
  onChange: (hosts: NodeLauncherHost[] | null) => void;
};

export const HostSelectMultiple = ({
  isValid,
  nodeQuantity,
  onChange,
}: Props) => {
  const hostList = useRecoilValue(hostAtoms.hostList);
  const selectedHosts = useRecoilValue(nodeLauncherAtoms.selectedHosts);

  const [isOpen, setIsOpen] = useState(false);

  const handleChange = (host: Host) => {
    let hostsCopy = selectedHosts ? [...selectedHosts!] : [];

    const foundHost = hostsCopy.find((h) => h.host?.id === host.id);

    const nodesToLaunch = hostsCopy.length === 0 ? nodeQuantity : 0;

    const isValid =
      Math.max(nodesToLaunch, nodeQuantity) <=
      host?.ipAddresses?.filter((ip) => !ip.assigned).length!;

    if (foundHost) {
      hostsCopy = hostsCopy.filter((h) => h.host?.id !== host.id);
    } else {
      hostsCopy.push({
        host,
        isValid,
        nodesToLaunch,
      });
    }

    onChange(hostsCopy.length === 0 ? null : hostsCopy);
  };

  const handleAllocationChange = (
    host: Host,
    nodesToLaunch: number,
    isValid?: boolean,
  ) => {
    let hostsCopy = [...selectedHosts!];

    let foundHostIndex = hostsCopy.findIndex((h) => h.host?.id === host.id);

    if (foundHostIndex < 0) return;

    hostsCopy[foundHostIndex] = {
      host,
      nodesToLaunch,
      isValid,
    };

    onChange(hostsCopy);
  };

  return (
    <>
      <DropdownWrapper isEmpty onClose={() => setIsOpen(false)} isOpen={isOpen}>
        <DropdownButton
          isOpen={isOpen}
          text={
            <p>
              {!selectedHosts?.length
                ? 'Auto Select'
                : selectedHosts?.length === 1
                ? selectedHosts[0].host.name
                : `${selectedHosts?.length} hosts selected`}
            </p>
          }
          onClick={() => setIsOpen(!isOpen)}
        />
        <DropdownMenu additionalStyles={styles.dropdown} isOpen={isOpen}>
          <Scrollbar additionalStyles={[styles.scrollbar]}>
            {hostList?.map((host) => {
              const isDisabled =
                host?.ipAddresses?.every((ip) => ip.assigned) ?? false;
              return (
                <Fragment key={host.id}>
                  <label css={[styles.row, isDisabled && styles.rowDisabled]}>
                    <Checkbox
                      disabled={isDisabled}
                      id={host.id}
                      name={host.id}
                      onChange={() => handleChange(host)}
                      checked={selectedHosts?.some(
                        (h) => h.host.id === host.id,
                      )}
                    />
                    <p>{host.name}</p>
                    <span css={styles.ipStatus} className="ip-status">
                      <HostIpStatus ipAddresses={host.ipAddresses} />
                    </span>
                  </label>
                </Fragment>
              );
            })}
          </Scrollbar>
        </DropdownMenu>
      </DropdownWrapper>
      {selectedHosts?.length! > 1 && (
        <>
          <FormLabel hint="How nodes will be distributed to hosts">
            Host Allocation
          </FormLabel>
          <div css={[styles.allocation, !isValid && styles.allocationError]}>
            <div css={styles.allocationHeaderRow}>
              <span css={styles.allocationHeader}>Host</span>
              <span css={styles.allocationHeader}>Nodes</span>
            </div>
            {selectedHosts?.map((h) => (
              <div css={styles.allocationRow} key={h.host.id}>
                {h.host.name}
                <HostIpStatus ipAddresses={h.host.ipAddresses} />
                <input
                  pattern="[0-9]*"
                  onChange={(e: ChangeEvent<HTMLInputElement>) => {
                    if (e.target.validity.valid) {
                      const nodesToLaunch = +e.target.value;

                      const isValid =
                        nodesToLaunch <=
                        h.host.ipAddresses.filter((ip) => !ip.assigned).length;

                      handleAllocationChange(h.host, nodesToLaunch, isValid);
                    }
                  }}
                  value={h.nodesToLaunch}
                  css={styles.allocationInput}
                  type="tel"
                />
              </div>
            ))}
            <FormError isVisible={!isValid}>
              Host allocation is invalid (
              {selectedHosts?.reduce(
                (partialSum, host) => partialSum + host.nodesToLaunch,
                0,
              )}{' '}
              allocated)
            </FormError>
          </div>
        </>
      )}
    </>
  );
};
