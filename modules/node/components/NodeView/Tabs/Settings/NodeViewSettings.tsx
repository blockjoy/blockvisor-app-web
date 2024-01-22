import { FirewallDropdown, useNodeView } from '@modules/node';
import { FormLabelCaps, Switch, TableSkeleton } from '@shared/components';
import { styles } from './NodeViewSettings.styles';

export const NodeViewSettings = () => {
  const { node, isLoading, updateNode } = useNodeView();

  const handleUpdateNode = (args: any) => {
    updateNode({
      id: node!.id,
      allowIps: node?.allowIps,
      denyIps: node?.denyIps,
      ...args,
    });
  };

  const handleFirewallChanged = (name: string, value: any) =>
    handleUpdateNode({
      [name]: value,
    });

  const handleAutoUpdatesChanged = (name: string, value: boolean) =>
    handleUpdateNode({
      selfUpdate: value,
    });

  return isLoading && !node?.id ? (
    <TableSkeleton />
  ) : (
    <div css={styles.wrapper}>
      <div css={styles.row}>
        <FormLabelCaps noBottomMargin>Firewall Rules</FormLabelCaps>
        <div css={styles.firewallWrapper}>
          <FirewallDropdown
            noBottomMargin
            onPropertyChanged={handleFirewallChanged}
            allowedIps={node!.allowIps}
            deniedIps={node!.denyIps}
          />
        </div>
      </div>
      <div css={styles.row}>
        <FormLabelCaps noBottomMargin>Auto Updates</FormLabelCaps>
        <Switch
          noBottomMargin
          checked={node!.selfUpdate}
          tooltip=""
          disabled={false}
          name="autoUpdates"
          onChange={handleAutoUpdatesChanged}
        />
      </div>
    </div>
  );
};
