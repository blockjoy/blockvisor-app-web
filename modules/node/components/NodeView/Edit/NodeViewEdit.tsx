import { styles } from './NodeViewEdit.styles';
import {
  TableSkeleton,
  Switch,
  FormLabelCaps,
  FormHeaderCaps,
} from '@shared/components';
import { useNodeView, FirewallDropdown } from '@modules/node';

export const NodeViewEdit = () => {
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
      <FormHeaderCaps>Edit</FormHeaderCaps>
      <div>
        <FormLabelCaps>Firewall Rules</FormLabelCaps>
        <FirewallDropdown
          onPropertyChanged={handleFirewallChanged}
          allowedIps={node!.allowIps}
          deniedIps={node!.denyIps}
        />
      </div>
      <div>
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
