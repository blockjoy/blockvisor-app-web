import { styles } from './NodeViewEdit.styles';
import { FirewallDropdown, TableSkeleton } from '@shared/components';
import {
  useNodeView,
  NodeFormLabel,
  NodeFormHeader,
  Switch,
} from '@modules/node';

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

  const handleFirewallChanged = (name: string, value: any) => {
    console.log('handleFirewallChanged', name, value);

    handleUpdateNode({
      [name]: value,
    });
  };

  const handleAutoUpdatesChanged = (e: any) => {
    handleUpdateNode({
      selfUpdate: e.target.checked,
    });
  };

  return isLoading && !node?.id ? (
    <TableSkeleton />
  ) : (
    <div css={styles.wrapper}>
      <NodeFormHeader>Edit</NodeFormHeader>
      <div>
        <NodeFormLabel>Firewall Rules</NodeFormLabel>
        <FirewallDropdown
          onNodePropertyChanged={handleFirewallChanged}
          allowedIps={node!.allowIps}
          deniedIps={node!.denyIps}
        />
      </div>
      <div>
        <NodeFormLabel>Auto Updates</NodeFormLabel>
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
