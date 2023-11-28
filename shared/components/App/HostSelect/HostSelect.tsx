import { useState } from 'react';
import { useRecoilValue } from 'recoil';
import {
  DropdownMenu,
  DropdownButton,
  DropdownItem,
  Scrollbar,
  DropdownWrapper,
} from '@shared/components';
import { escapeHtml } from '@shared/utils/escapeHtml';
import { styles } from './HostSelect.styles';
import { Host } from '@modules/grpc/library/blockjoy/v1/host';
import { hostSelectors } from '@modules/host';

type HostSelectProps = {
  selectedHost: Host | null;
  onChange: (host: Host | null) => void;
};

export const HostSelect = ({ selectedHost, onChange }: HostSelectProps) => {
  const hosts = useRecoilValue(hostSelectors.hostListSorted);

  const [isOpen, setIsOpen] = useState<boolean>(false);

  const handleClick = () => setIsOpen(!isOpen);
  const handleChange = (host: Host | null) => {
    onChange(host);
    setIsOpen(false);
  };

  return (
    <DropdownWrapper
      isEmpty={true}
      isOpen={isOpen}
      onClose={() => setIsOpen(false)}
    >
      <DropdownButton
        disabled={!hosts.length}
        text={
          <p>{escapeHtml(selectedHost ? selectedHost.name : 'Auto select')}</p>
        }
        onClick={handleClick}
        isOpen={isOpen}
      />
      <DropdownMenu isOpen={isOpen} additionalStyles={styles.dropdown}>
        <Scrollbar additionalStyles={[styles.dropdownInner]}>
          <ul>
            <li>
              <DropdownItem
                additionalStyles={[styles.autoSelect]}
                onButtonClick={() => handleChange(null)}
                size="medium"
                type="button"
              >
                <p css={styles.active}>Auto select</p>
              </DropdownItem>
            </li>
            {hosts?.map((host) => {
              const ipAddressCount = host.ipAddresses.filter(
                (ip) => !ip.assigned,
              ).length;
              const isDisabled = ipAddressCount < 1;
              return (
                <li key={host.id}>
                  <DropdownItem
                    size="medium"
                    type="button"
                    isDisabled={isDisabled}
                    onButtonClick={() => handleChange(host)}
                    additionalStyles={[styles.disabledDropdownItem]}
                  >
                    <p css={styles.active}>{escapeHtml(host.name!)}</p>
                    <span
                      className="disabled-alert"
                      css={[
                        styles.alert,
                        isDisabled ? styles.alertDisabled : styles.alertSuccess,
                      ]}
                    >
                      {ipAddressCount} IP's
                    </span>
                  </DropdownItem>
                </li>
              );
            })}
          </ul>
        </Scrollbar>
      </DropdownMenu>
    </DropdownWrapper>
  );
};
