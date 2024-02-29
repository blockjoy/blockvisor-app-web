import { useState } from 'react';
import { FilteredIpAddr } from '@modules/grpc/library/blockjoy/v1/node';
import IconFirewall from '@public/assets/icons/app/Firewall.svg';
import {
  DropdownMenu,
  DropdownButton,
  DropdownWrapper,
} from '@shared/components';
import { useEsc } from '@shared/index';
import { styles } from './FirewallDropdown.styles';
import { FirewallDropdownHeader } from './FirewallDropdownHeader';
import { FirewallDropdownForm } from './FirewallDropdownForm';
import { FirewallDropdownItems } from './FirewallDropdownItems';

type FirewallDropdownProps = {
  type?: 'allow' | 'deny' | undefined;
  ips?: FilteredIpAddr[];
  deniedIps?: FilteredIpAddr[];
  allowedIps?: FilteredIpAddr[];
  onPropertyChanged: (name: string, value: FilteredIpAddr[]) => void;
  noBottomMargin?: boolean;
};

export const FirewallDropdown = ({
  type,
  ips,
  allowedIps,
  deniedIps,
  onPropertyChanged,
  noBottomMargin,
}: FirewallDropdownProps) => {
  const [isOpen, setIsOpen] = useState(false);
  const [activeTabIndex, setActiveTabIndex] = useState(0);
  const isAllowedIp = type ? type === 'allow' : activeTabIndex === 0;

  const handleClick = () => {
    if (activeTabIndex === -1) setActiveTabIndex(0);
    setIsOpen(!isOpen);
  };

  useEsc(() => {
    if (isOpen) handleClick();
  });

  const handleRuleAdded = (rule: FilteredIpAddr) => {
    const list = type ? ips! : isAllowedIp ? allowedIps! : deniedIps!;
    const listCopy = [...list];
    listCopy.push(rule);
    onPropertyChanged(isAllowedIp ? 'allowIps' : 'denyIps', listCopy);
  };

  const handleRemoveFromList = (index: number) => {
    const list = type ? ips! : isAllowedIp ? allowedIps! : deniedIps!;
    const listCopy = [...list];
    onPropertyChanged(
      isAllowedIp ? 'allowIps' : 'denyIps',
      listCopy.filter((item, i) => i !== index),
    );
  };

  const isEmpty =
    (!type && !allowedIps?.length && !deniedIps?.length) ||
    (type && !ips?.length);

  const selectText = isEmpty ? (
    <p>Add Rules</p>
  ) : type ? (
    <span css={styles.dropdownlabel}>
      {ips?.length} IP{ips?.length !== 1 && `'s`}
    </span>
  ) : (
    <>
      <span css={styles.dropdownlabel}>Allow</span> <p>{allowedIps?.length}</p>
      <span css={styles.separator}>/</span>
      <span css={styles.dropdownlabel}>Deny</span> <p>{deniedIps?.length}</p>
    </>
  );

  const activeListToShow = type
    ? ips
    : activeTabIndex === 0
    ? allowedIps
    : deniedIps;

  return (
    <DropdownWrapper
      noBottomMargin={noBottomMargin}
      isEmpty={isEmpty!}
      isOpen={isOpen}
      onClose={() => setIsOpen(false)}
    >
      <DropdownButton
        isOpen={isOpen}
        icon={<IconFirewall />}
        text={selectText}
        onClick={handleClick}
      />
      <DropdownMenu isOpen={isOpen} additionalStyles={styles.dropdown}>
        {!type && (
          <FirewallDropdownHeader
            activeTabIndex={activeTabIndex}
            setActiveTabIndex={setActiveTabIndex}
          />
        )}

        <FirewallDropdownForm
          isOpen={isOpen}
          activeTabIndex={activeTabIndex}
          onRuleAdded={handleRuleAdded}
          fullIpList={type ? ips! : [...allowedIps!, ...deniedIps!]}
        />
        <FirewallDropdownItems
          listType={isAllowedIp ? 'allow' : 'deny'}
          items={activeListToShow!}
          onRemoveClicked={handleRemoveFromList}
        />
      </DropdownMenu>
    </DropdownWrapper>
  );
};
