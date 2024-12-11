import { useRef, useState } from 'react';
// import { FilteredIpAddr } from '@modules/grpc/library/blockjoy/v1/node';
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
import { NodeLauncherState } from '@modules/node';
import {
  FirewallAction,
  FirewallRule,
} from '@modules/grpc/library/blockjoy/common/v1/config';

type FirewallDropdownProps = {
  rules: FirewallRule[];
  isDisabled?: boolean;
  onPropertyChanged: <K extends keyof NodeLauncherState>(
    name: K,
    value: NodeLauncherState[K],
  ) => void;
  noBottomMargin?: boolean;
};

export const FirewallDropdown = ({
  rules,
  isDisabled,
  onPropertyChanged,
  noBottomMargin,
}: FirewallDropdownProps) => {
  const [isOpen, setIsOpen] = useState(false);
  const [activeTabIndex, setActiveTabIndex] = useState(0);
  const dropdownButtonRef = useRef<HTMLButtonElement>(null);

  const handleClick = () => {
    if (activeTabIndex === -1) setActiveTabIndex(0);
    setIsOpen(!isOpen);
    dropdownButtonRef?.current?.focus();
  };

  useEsc(() => {
    if (isOpen) handleClick();
  });

  const handleRuleAdded = (rule: FirewallRule) => {
    const rulesCopy = [...rules];
    rulesCopy.push(rule);
    onPropertyChanged('firewall', rulesCopy);
  };

  const handleRemoveFromList = (index: number) => {
    const rulesCopy = [...rules];
    onPropertyChanged(
      'firewall',
      rulesCopy.filter((_, i) => i !== index),
    );
  };

  const isEmpty = !rules.length;

  const allowIps = rules
    .filter((rule) => rule.action === FirewallAction.FIREWALL_ACTION_ALLOW)
    .flatMap((rule) => rule.ips);

  const denyIps = rules
    .filter((rule) => rule.action === FirewallAction.FIREWALL_ACTION_REJECT)
    .flatMap((rule) => rule.ips);

  const activeListToShow = activeTabIndex === 0 ? allowIps : denyIps;

  const selectText = isEmpty ? (
    <p>Add Rules</p>
  ) : rules.length ? (
    <span css={styles.dropdownlabel}>
      {rules?.length} IP{rules?.length !== 1 && `'s`}
    </span>
  ) : (
    <>
      <span css={styles.dropdownlabel}>Inbound</span> <p>{allowIps.length}</p>
      <span css={styles.separator}>/</span>
      <span css={styles.dropdownlabel}>Outbound</span> <p>{denyIps.length}</p>
    </>
  );

  return (
    <DropdownWrapper
      noBottomMargin={noBottomMargin}
      isEmpty={isEmpty!}
      isOpen={isOpen}
      onClose={() => setIsOpen(false)}
    >
      <DropdownButton
        disabled={isDisabled}
        ref={dropdownButtonRef}
        isOpen={isOpen}
        icon={<IconFirewall />}
        text={selectText}
        onClick={handleClick}
      />
      <DropdownMenu isOpen={isOpen} additionalStyles={styles.dropdown}>
        <FirewallDropdownHeader
          activeTabIndex={activeTabIndex}
          setActiveTabIndex={setActiveTabIndex}
        />
        <FirewallDropdownForm
          isOpen={isOpen}
          activeTabIndex={activeTabIndex}
          onRuleAdded={handleRuleAdded}
          fullIpList={[...allowIps, ...denyIps]}
        />
        <FirewallDropdownItems
          listType={activeTabIndex === 0 ? 'allow' : 'deny'}
          items={activeListToShow!}
          onRemoveClicked={handleRemoveFromList}
        />
      </DropdownMenu>
    </DropdownWrapper>
  );
};
