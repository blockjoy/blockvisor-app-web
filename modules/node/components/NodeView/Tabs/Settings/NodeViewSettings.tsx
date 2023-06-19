import { FirewallDropdown, useNodeView } from '@modules/node';
import {
  FormHeaderCaps,
  FormLabelCaps,
  Switch,
  TableSkeleton,
} from '@shared/components';
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

  const handleAutoUpdatesChanged = (e: any) =>
    handleUpdateNode({
      selfUpdate: e.target.checked,
    });

  return isLoading && !node?.id ? (
    <TableSkeleton />
  ) : (
    <div css={styles.wrapper}>
      <FormHeaderCaps>Config</FormHeaderCaps>
      <div css={styles.row}>
        <FormLabelCaps>Firewall Rules</FormLabelCaps>
        <FirewallDropdown
          onPropertyChanged={handleFirewallChanged}
          allowedIps={node!.allowIps}
          deniedIps={node!.denyIps}
        />
      </div>
      <div css={styles.row}>
        <FormLabelCaps>Auto Updates</FormLabelCaps>
        <Switch
          checked={node!.selfUpdate}
          tooltip=""
          disabled={false}
          name="autoUpdates"
          onPropertyChanged={handleAutoUpdatesChanged}
        />
      </div>
    </div>
  );
};
