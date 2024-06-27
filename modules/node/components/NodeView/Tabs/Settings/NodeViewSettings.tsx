import { authSelectors } from '@modules/auth';
import { FirewallDropdown, LockedSwitch, useNodeView } from '@modules/node';
import {
  FormLabelCaps,
  Switch,
  TableSkeleton,
  Textbox,
} from '@shared/components';
import { useRecoilValue } from 'recoil';
import { styles } from './NodeViewSettings.styles';
import { useDebounce } from '@shared/index';
import { useEffect, useState } from 'react';

export const NodeViewSettings = () => {
  const { node, isLoading, updateNode } = useNodeView();

  const isSuperUser = useRecoilValue(authSelectors.isSuperUser);

  const [displayName, setDisplayName] = useState('');

  const debouncedDisplayName = useDebounce(displayName, 500);

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

  const handleDisplayNameChanged = (name: string) => setDisplayName(name);

  useEffect(() => {
    if (debouncedDisplayName) {
      handleUpdateNode({
        displayName: debouncedDisplayName,
      });
    }
  }, [debouncedDisplayName]);

  return isLoading && !node?.id ? (
    <TableSkeleton />
  ) : (
    <div css={styles.wrapper}>
      <div css={styles.row}>
        <FormLabelCaps noBottomMargin>Display Name</FormLabelCaps>
        <div css={styles.firewallWrapper}>
          <Textbox
            noBottomMargin
            type="text"
            name="displayName"
            defaultValue={node?.displayName}
            placeholder="Display Name"
            isRequired
            onChange={(name: string, value: string) =>
              handleDisplayNameChanged(value)
            }
          />
        </div>
      </div>
      <div css={styles.row}>
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
      </div>
      <div css={styles.row}>
        <FormLabelCaps noBottomMargin>Auto Updates</FormLabelCaps>
        {isSuperUser ? (
          <Switch
            noBottomMargin
            checked={node!.selfUpdate}
            tooltip=""
            disabled={false}
            name="autoUpdates"
            onChange={handleAutoUpdatesChanged}
          />
        ) : (
          <LockedSwitch isChecked={node!.selfUpdate} />
        )}
      </div>
    </div>
  );
};
