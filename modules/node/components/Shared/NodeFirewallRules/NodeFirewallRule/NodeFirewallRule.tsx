import { useState } from 'react';
import {
  FirewallRule,
  IpName,
  PortName,
} from '@modules/grpc/library/blockjoy/common/v1/config';
import { styles } from './NodeFirewallRule.styles';
import { NodeFirewallRuleTable } from './NodeFirewallRuleTable/NodeFirewallRuleTable';
import { NodeFirewallRuleConfig } from './NodeFirewallRuleConfig/NodeFirewallRuleConfig';

type Props = {
  rule: FirewallRule;
  onFirewallChanged: (nextFirewall: FirewallRule[]) => void;
};

type RuleTableProps<T = any> = {
  rule: FirewallRule;
  type: T;
  property: 'ips' | 'ports';
  columns: string[];
  rows: T[];
  onFirewallChanged: (nextFirewall: FirewallRule[]) => void;
};

export const NodeFirewallRule = ({ rule, onFirewallChanged }: Props) => {
  const [activeTab, setActiveTab] = useState<'ips' | 'ports'>('ips');

  const RuleTable = ({
    rule,
    type,
    property,
    columns,
    rows,
    onFirewallChanged,
  }: RuleTableProps) => (
    <NodeFirewallRuleTable
      rule={rule}
      type={type}
      property={property}
      onFirewallChanged={onFirewallChanged}
      columns={columns}
      rows={rows}
    />
  );

  return (
    <div key={rule.key} css={styles.rule}>
      <div css={styles.tabs}>
        <button
          css={styles.tabButton(activeTab === 'ips')}
          type="button"
          onClick={() => setActiveTab('ips')}
        >
          Ip's
        </button>
        <button
          css={styles.tabButton(activeTab === 'ports')}
          type="button"
          onClick={() => setActiveTab('ports')}
        >
          Ports
        </button>

        <div css={styles.configWrapper}>
          <NodeFirewallRuleConfig
            rule={rule}
            onFirewallChanged={onFirewallChanged}
          />
        </div>
      </div>
      <div css={styles.tableWrapper}>
        {activeTab === 'ips' && (
          <RuleTable
            rule={rule}
            type={IpName}
            property="ips"
            onFirewallChanged={onFirewallChanged}
            columns={['ip', 'name']}
            rows={rule.ips}
          />
        )}
        {activeTab === 'ports' && (
          <RuleTable
            rule={rule}
            type={PortName}
            property="ports"
            onFirewallChanged={onFirewallChanged}
            columns={['port', 'name']}
            rows={rule.ports}
          />
        )}
      </div>
    </div>
  );
};
