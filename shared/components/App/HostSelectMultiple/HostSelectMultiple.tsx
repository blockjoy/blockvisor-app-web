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
} from '@shared/components';
import { ChangeEvent, useEffect, useRef, useState } from 'react';
import { HostSelectMultipleAllocation } from './HostSelectMultipleAllocation/HostSelectMultipleAllocation';
import { useRecoilValue } from 'recoil';
import { styles } from './HostSelectMultiple.styles';
import { useDebounce } from '@shared/hooks/useDebounce';

type Props = {
  onChange: (hosts: NodeLauncherHost[] | null) => void;
};

export const HostSelectMultiple = ({ onChange }: Props) => {
  const hostList = useRecoilValue(hostAtoms.allHosts);
  const selectedHosts = useRecoilValue(nodeLauncherAtoms.selectedHosts);

  const searchRef = useRef<HTMLInputElement>(null);

  const [isOpen, setIsOpen] = useState(false);

  const [hideFullHosts, setHideFullHosts] = useState(true);

  const [searchText, setSearchText] = useState('');
  const debouncedSearchTerm = useDebounce(searchText, 500);

  const handleSearchInput = (e: ChangeEvent<HTMLInputElement>) => {
    setSearchText(e.target.value);
  };

  const handleChange = (host: Host) => {
    let hostsCopy = selectedHosts ? [...selectedHosts!] : [];

    const foundHost = hostsCopy.find((h) => h.host?.id === host.id);

    if (foundHost) {
      hostsCopy = hostsCopy.filter((h) => h.host?.id !== host.id);
    } else {
      hostsCopy.push({
        host,
        isValid: true,
        nodesToLaunch: 1,
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

  const handleHideFullHostsChanged = () => setHideFullHosts(!hideFullHosts);

  useEffect(() => {
    const timer = setTimeout(() => {
      if (isOpen && searchRef?.current) {
        searchRef.current?.focus();
      }
    }, 100);

    return () => clearTimeout(timer);
  }, [isOpen]);

  const filteredHosts = hostList
    .filter(
      (h) =>
        !hideFullHosts ||
        h.ipAddresses.filter((ip) => !ip.assigned).length !== 0,
    )
    .filter((h) =>
      h.name?.toLowerCase().includes(debouncedSearchTerm?.toLowerCase()),
    );

  return (
    <>
      <DropdownWrapper isEmpty onClose={() => setIsOpen(false)} isOpen={isOpen}>
        <DropdownButton
          isOpen={isOpen}
          text={
            <p>
              {!selectedHosts?.length
                ? 'Auto select'
                : selectedHosts?.length === 1
                ? selectedHosts[0].host.name
                : `${selectedHosts?.length} hosts selected`}
            </p>
          }
          onClick={() => setIsOpen(!isOpen)}
        />
        <DropdownMenu additionalStyles={styles.dropdown} isOpen={isOpen}>
          <div css={styles.dropdownHeader}>
            <input
              ref={searchRef}
              css={styles.searchInput}
              onInput={handleSearchInput}
              type="text"
              placeholder="Search..."
            />
            <label css={styles.hideFullNodesInput}>
              <Checkbox
                id="hideFullHosts"
                name="hideFullHosts"
                checked={hideFullHosts}
                onChange={(e: ChangeEvent<HTMLInputElement>) =>
                  handleHideFullHostsChanged()
                }
              >
                Hide Full Hosts
              </Checkbox>
            </label>
          </div>

          <Scrollbar additionalStyles={[styles.scrollbar]}>
            {!filteredHosts?.length && (
              <p css={styles.dropdownEmpty}>No hosts found</p>
            )}
            <ul>
              {filteredHosts?.map((host) => {
                const isDisabled =
                  host?.ipAddresses?.every((ip) => ip.assigned) ?? false;
                return (
                  <li key={host.id}>
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
                  </li>
                );
              })}
            </ul>
          </Scrollbar>
        </DropdownMenu>
      </DropdownWrapper>
      {selectedHosts?.length! > 0 && (
        <HostSelectMultipleAllocation
          onChange={handleChange}
          onHostAllocationChanged={handleAllocationChange}
        />
      )}
    </>
  );
};
