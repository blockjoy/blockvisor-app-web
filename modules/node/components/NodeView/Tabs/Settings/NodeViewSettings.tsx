import { authSelectors } from '@modules/auth';
import { FirewallDropdown, LockedSwitch, useNodeView } from '@modules/node';
import { FormLabelCaps, Switch, TableSkeleton } from '@shared/components';
import { useRecoilValue } from 'recoil';
import { styles } from './NodeViewSettings.styles';

export const NodeViewSettings = () => {
  const { node, isLoading, updateNode } = useNodeView();

  const isSuperUser = useRecoilValue(authSelectors.isSuperUser);

  const handleUpdateNode = (args: any) => {
    updateNode({
      id: node!.nodeId,
      // allowIps: node?.allowIps,
      // denyIps: node?.denyIps,
      ...args,
    });
  };

  const handleFirewallChanged = (name: string, value: any) =>
    handleUpdateNode({
      [name]: value,
    });

  const handleAutoUpdatesChanged = (name: string, value: boolean) =>
    handleUpdateNode({
      autoUpgrade: value,
    });

  return isLoading && !node?.nodeId ? (
    <TableSkeleton />
  ) : (
    <div css={styles.wrapper}>
      {/* TODO: implement new node firewall */}
      {/* <div css={styles.row}>
        <FormLabelCaps noBottomMargin>Firewall Rules</FormLabelCaps>
        <div css={styles.firewallWrapper}>
          <FirewallDropdown
            isDisabled={!isSuperUser}
            noBottomMargin
            onPropertyChanged={handleFirewallChanged}
            allowedIps={node!.allowIps}
            deniedIps={node!.denyIps}
          />
        </div>
      </div> */}
      <div css={styles.row}>
        <FormLabelCaps noBottomMargin>Auto Updates</FormLabelCaps>
        {isSuperUser ? (
          <Switch
            noBottomMargin
            // checked={node!.autoUpgrade}
            checked={node!.autoUpgrade}
            tooltip=""
            disabled={false}
            name="autoUpdates"
            onChange={handleAutoUpdatesChanged}
          />
        ) : (
          <LockedSwitch isChecked={node!.autoUpgrade} />
        )}
      </div>
    </div>
  );
};
