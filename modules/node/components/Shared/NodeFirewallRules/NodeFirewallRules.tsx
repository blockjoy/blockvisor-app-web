import {
  FirewallAction,
  FirewallDirection,
  FirewallProtocol,
  FirewallRule,
} from '@modules/grpc/library/blockjoy/common/v1/config';
import { styles } from './NodeFirewallRules.styles';
import { SvgIcon } from '@shared/components';
import { NodeFirewallRule } from './NodeFirewallRule/NodeFirewallRule';
import IconAdd from '@public/assets/icons/common/ListAdd.svg';
import { SerializedStyles } from '@emotion/react';

type Props = {
  wrapperStyles?: SerializedStyles;
  rules?: FirewallRule[];
  onFirewallChanged: (nextFirewall: FirewallRule[]) => void;
};

export const NodeFirewallRules = ({
  wrapperStyles,
  rules,
  onFirewallChanged,
}: Props) => {
  const handleRuleAdded = () => {
    const nextRules = [...rules!];

    nextRules?.push({
      key: 'rule' + (rules?.length! + 1),
      action: FirewallAction.FIREWALL_ACTION_ALLOW,
      direction: FirewallDirection.FIREWALL_DIRECTION_INBOUND,
      ips: [],
      ports: [],
      protocol: FirewallProtocol.FIREWALL_PROTOCOL_BOTH,
    });

    onFirewallChanged(nextRules);
  };

  return (
    <div css={[styles.wrapper, wrapperStyles ? wrapperStyles : undefined]}>
      {rules?.map((rule) => (
        <NodeFirewallRule
          key={rule.key}
          onFirewallChanged={onFirewallChanged}
          rule={rule}
          rules={rules}
        />
      ))}
      <button onClick={handleRuleAdded} css={styles.addButton} type="button">
        <SvgIcon isDefaultColor size="14px">
          <IconAdd />
        </SvgIcon>
        Add Rule
      </button>
    </div>
  );
};
