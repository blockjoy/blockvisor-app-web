import { styles } from './NodeViewEdit.styles';
import { FirewallDropdown, TableSkeleton } from '@shared/components';
import { Switch } from '../../NodeLauncher/formComponents/Switch/Switch';
import { NodeViewFormHeader } from '../NodeViewFormHeader';
import { useNodeView } from '@modules/node/hooks/useNodeView';
import { NodeViewFormLabel } from '../NodeViewFormLabel';

export const NodeViewEdit = () => {
  const { node, isLoading, updateNode } = useNodeView();

  const handleUpdateNode = (args: any) => {
    updateNode({
      id: node!.id,
      ...args,
    });
  };

  const handleFirewallChanged = (name: string, value: any) => {
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
      <NodeViewFormHeader>Edit</NodeViewFormHeader>
      <div>
        <NodeViewFormLabel>Firewall Rules</NodeViewFormLabel>
        <FirewallDropdown
          onNodePropertyChanged={handleFirewallChanged}
          allowedIps={node!.allowIps}
          deniedIps={node!.denyIps}
        />
      </div>
      <div>
        <NodeViewFormLabel>Auto Updates</NodeViewFormLabel>
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
