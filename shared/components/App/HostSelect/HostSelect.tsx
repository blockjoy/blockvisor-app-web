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
import { hostAtoms } from '@modules/host';
import { Host } from '@modules/grpc/library/blockjoy/v1/host';

type HostSelectProps = {
  selectedHost: Host | null;
  onChange: (host: Host | null) => void;
};

export const HostSelect = ({ selectedHost, onChange }: HostSelectProps) => {
  const hosts = useRecoilValue(hostAtoms.hostList);
  console.log('hosts123', hosts);

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
            {hosts?.map((host) => (
              <li key={host.id}>
                <DropdownItem
                  size="medium"
                  type="button"
                  onButtonClick={() => handleChange(host)}
                >
                  <p css={styles.active}>{escapeHtml(host.name!)}</p>
                </DropdownItem>
              </li>
            ))}
          </ul>
        </Scrollbar>
      </DropdownMenu>
    </DropdownWrapper>
  );
};
