import { FC, useRef, useState } from 'react';
import { Dropdown, SvgIcon } from '@shared/components';
import { styles } from './FirewallDropdown.styles';
import { FirewallDropdownHeader } from './FirewallDropdownHeader';
import { FirewallDropdownForm } from './FirewallDropdownForm';
import { FirewallDropdownItems } from './FirewallDropdownItems';
import IconArrow from '@public/assets/icons/arrow-right-12.svg';
import IconFirewall from '@public/assets/icons/firewall.svg';

type Props = {
  allowedIps: NodeFirewallRule[];
  deniedIps: NodeFirewallRule[];
  onNodePropertyChanged: (name: string, value: any) => void;
};

export const FirewallDropdown: FC<Props> = ({
  allowedIps,
  deniedIps,
  onNodePropertyChanged,
}) => {
  const dropdownRef = useRef<HTMLDivElement | null>(null);
  const [isOpen, setIsOpen] = useState<boolean>(false);
  const [activeTabIndex, setActiveTabIndex] = useState(-1);
  const isAllowedIp = activeTabIndex === 0;

  const handleClick = () => {
    if (activeTabIndex === -1) {
      setActiveTabIndex(0);
    }
    setIsOpen(!isOpen);
  };

  const handleRuleAdded = (rule: NodeFirewallRule) => {
    const listToAddCopy = isAllowedIp ? [...allowedIps] : [...deniedIps];

    listToAddCopy.push(rule);

    onNodePropertyChanged(
      isAllowedIp ? 'allowedIps' : 'deniedIps',
      listToAddCopy,
    );
  };

  const handleRemoveFromList = (index: number) => {
    const listToRemoveFromCopy = isAllowedIp ? [...allowedIps] : [...deniedIps];

    onNodePropertyChanged(
      isAllowedIp ? 'allowedIps' : 'deniedIps',
      listToRemoveFromCopy.filter((item, i) => i !== index),
    );
  };

  const isEmpty = !allowedIps?.length && !deniedIps?.length;

  const selectText = isEmpty ? (
    <p>Add Rules</p>
  ) : (
    <>
      <span css={styles.dropdownlabel}>Allow</span> <p>{allowedIps?.length}</p>
      <span css={styles.separator}>/</span>
      <span css={styles.dropdownlabel}>Deny</span> <p>{deniedIps?.length}</p>
    </>
  );

  const activeListToShow = activeTabIndex === 0 ? allowedIps : deniedIps;

  return (
    <div
      className={`${!isEmpty ? 'not-empty' : ''} ${isOpen ? 'is-open' : ''}`}
      css={[styles.wrapper]}
      ref={dropdownRef}
    >
      <button css={styles.button} onClick={handleClick}>
        <SvgIcon size="16px">
          <IconFirewall />
        </SvgIcon>
        {selectText}
      </button>
      <Dropdown isOpen={isOpen} additionalStyles={styles.dropdown}>
        <FirewallDropdownHeader
          activeTabIndex={activeTabIndex}
          setActiveTabIndex={setActiveTabIndex}
        />
        <FirewallDropdownForm
          isOpen={isOpen}
          activeTabIndex={activeTabIndex}
          onRuleAdded={handleRuleAdded}
        />
        <FirewallDropdownItems
          listType={activeTabIndex === 0 ? 'allow' : 'deny'}
          items={activeListToShow}
          onRemoveClicked={handleRemoveFromList}
        />
      </Dropdown>
      <span css={[styles.icon, isOpen && styles.iconOpen]}>
        <IconArrow />
      </span>
    </div>
  );
};
