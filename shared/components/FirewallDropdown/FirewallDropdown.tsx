import { FC, useRef, useState } from 'react';
import { Dropdown, DropdownButton, SvgIcon } from '@shared/components';
import { styles } from './FirewallDropdown.styles';
import { FirewallDropdownHeader } from './FirewallDropdownHeader';
import { FirewallDropdownForm } from './FirewallDropdownForm';
import { FirewallDropdownItems } from './FirewallDropdownItems';
import IconArrow from '@public/assets/icons/arrow-right-12.svg';
import IconFirewall from '@public/assets/icons/firewall.svg';
import { useClickOutside } from '@shared/hooks/useClickOutside';
import { FilteredIpAddr } from '@modules/grpc/library/blockjoy/v1/node';

type Props = {
  allowedIps: FilteredIpAddr[];
  deniedIps: FilteredIpAddr[];
  onNodePropertyChanged: (name: string, value: any) => void;
};

export const FirewallDropdown: FC<Props> = ({
  allowedIps,
  deniedIps,
  onNodePropertyChanged,
}) => {
  const dropdownRef = useRef<HTMLDivElement | null>(null);
  const [isOpen, setIsOpen] = useState<boolean>(false);
  const [activeTabIndex, setActiveTabIndex] = useState(0);
  const isAllowedIp = activeTabIndex === 0;

  const handleClick = () => {
    if (activeTabIndex === -1) {
      setActiveTabIndex(0);
    }
    setIsOpen(!isOpen);
  };

  useClickOutside<HTMLDivElement>(dropdownRef, () => setIsOpen(false));

  const handleRuleAdded = (rule: FilteredIpAddr) => {
    const listToAddCopy = isAllowedIp ? [...allowedIps] : [...deniedIps];

    listToAddCopy.push(rule);

    console.log('handleRuleAdded', rule, isAllowedIp);

    onNodePropertyChanged(isAllowedIp ? 'allowIps' : 'denyIps', listToAddCopy);
  };

  const handleRemoveFromList = (index: number) => {
    const listToRemoveFromCopy = isAllowedIp ? [...allowedIps] : [...deniedIps];

    onNodePropertyChanged(
      isAllowedIp ? 'allowIps' : 'denyIps',
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
      <DropdownButton
        isOpen={isOpen}
        icon={<IconFirewall />}
        text={selectText}
        onClick={handleClick}
      />
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
    </div>
  );
};
