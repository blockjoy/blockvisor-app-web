import { useRecoilValue } from 'recoil';
import {
  FirewallAction,
  FirewallDirection,
  FirewallProtocol,
  FirewallRule,
} from '@modules/grpc/library/blockjoy/common/v1/config';
import { nodeLauncherAtoms } from '@modules/node/store/nodeLauncherAtoms';
import { NodeFirewallRuleConfigDropdown } from './NodeFirewallRuleConfigDropdown/NodeFirewallRuleConfigDropdown';
import { styles } from './NodeFirewallRuleConfig.styles';
import { SvgIcon } from '@shared/components';
import IconTrash from '@public/assets/icons/common/Trash.svg';

export type ConfigDropdownItem = {
  name: string;
  value: number;
};

export type ConfigDropdown = {
  name: string;
  items: ConfigDropdownItem[];
};

const dropdowns: ConfigDropdown[] = [
  {
    name: 'protocol',
    items: [
      {
        name: 'Both',
        value: FirewallProtocol.FIREWALL_PROTOCOL_BOTH,
      },
      {
        name: 'TCP',
        value: FirewallProtocol.FIREWALL_PROTOCOL_TCP,
      },
      {
        name: 'UDP',
        value: FirewallProtocol.FIREWALL_PROTOCOL_UDP,
      },
    ],
  },
  {
    name: 'action',
    items: [
      {
        name: 'Allow',
        value: FirewallAction.FIREWALL_ACTION_ALLOW,
      },
      {
        name: 'Reject',
        value: FirewallAction.FIREWALL_ACTION_REJECT,
      },
    ],
  },
  {
    name: 'direction',
    items: [
      {
        name: 'In',
        value: FirewallDirection.FIREWALL_DIRECTION_INBOUND,
      },
      {
        name: 'Out',
        value: FirewallDirection.FIREWALL_DIRECTION_OUTBOUND,
      },
    ],
  },
];

type NodeFirewallRuleConfig = {
  rule?: FirewallRule;
  onFirewallChanged: (nextFirewall: FirewallRule[]) => void;
};

export const NodeFirewallRuleConfig = ({
  rule,
  onFirewallChanged,
}: NodeFirewallRuleConfig) => {
  const rules = useRecoilValue(nodeLauncherAtoms.nodeLauncher)?.firewall;

  const handleConfigChanged = (name: string, value: number) => {
    const nextRules = rules
      ? rules.map((r) => {
          if (r.key === rule?.key) {
            const next = { ...r };
            next[name] = value;
            return next;
          } else {
            return r;
          }
        })
      : [];
    onFirewallChanged(nextRules);
  };

  const handleDeleteRule = (key?: string) => {
    const nextRules = rules.filter((rule) => rule.key !== key);
    onFirewallChanged(nextRules);
  };

  return (
    <div css={styles.configDropdowns}>
      {dropdowns.map((dropdown) => (
        <div key={dropdown.name} css={styles.dropdown}>
          <NodeFirewallRuleConfigDropdown
            name={dropdown.name}
            selectedItem={
              dropdown.items.find(
                (item) => item.value === rule?.[dropdown.name],
              )!
            }
            items={dropdown.items}
            onConfigChanged={handleConfigChanged}
          />
        </div>
      ))}
      <button
        onClick={() => handleDeleteRule(rule?.key)}
        css={styles.deleteRuleButton}
        type="button"
      >
        <SvgIcon size="13px">
          <IconTrash />
        </SvgIcon>
      </button>
    </div>
  );
};
