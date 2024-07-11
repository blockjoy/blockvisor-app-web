import { useEffect, useRef, useState } from 'react';
import { css } from '@emotion/react';
import { styles } from './AdminNodesUpgrade.styles';
import { useClickOutside } from '@shared/hooks/useClickOutside';
import { AdminHeaderButton } from '@modules/admin/components/AdminHeader/AdminHeaderButton/AdminHeaderButton';
import {
  Badge,
  Button,
  DropdownItem,
  DropdownMenu,
  Scrollbar,
} from '@shared/components';
import { AdminDropdownHeader } from '@modules/admin/components';
import { blockchainClient, nodeClient } from '@modules/grpc';
import { toast } from 'react-toastify';
import IconUpgrade from '@public/assets/icons/app/NodeUpgrade.svg';
import { BlockchainVersion } from '@modules/grpc/library/blockjoy/v1/blockchain';

type Props = {
  isDisabled?: boolean;
  selectedIds: string[];
};

export const AdminNodesUpgrade = ({ isDisabled, selectedIds }: Props) => {
  const [isOpen, setIsOpen] = useState(false);

  const [selectedVersion, setSelectedVersion] = useState<BlockchainVersion>();

  const [isUpgrading, setIsUpgrading] = useState(false);

  const dropdownRef = useRef<HTMLDivElement | null>(null);

  const handleClickOutside = () => setIsOpen(false);

  const handleUpgrade = async () => {
    try {
      const upgradeCommands = [];

      for (let id of selectedIds!) {
        upgradeCommands.push(
          (async () => {
            try {
              await nodeClient.upgradeNode(id, selectedVersion?.version!);
              toast.success('Upgrade Command Sent');
            } catch (err) {
              toast.error(`Error Upgrading Node: ${id}`);
            }
          })(),
        );
      }

      await Promise.all(upgradeCommands);
    } catch (err) {
      console.log('handleUpgradeError', err);
    } finally {
      setIsOpen(false);
    }
  };

  useClickOutside<HTMLDivElement>(dropdownRef, handleClickOutside);

  const [versions, setVersions] = useState<BlockchainVersion[]>([]);

  useEffect(() => {
    (async () => {
      if (selectedIds.length) {
        const blockchainId = (await nodeClient.getNode(selectedIds[0]))
          .blockchainId!;

        const versions = (await blockchainClient.getBlockchain(blockchainId))
          .nodeTypes[0].versions;

        setVersions(versions);
      }
    })();
  }, [selectedIds]);

  return (
    <div css={styles.wrapper} ref={dropdownRef}>
      <AdminHeaderButton
        isDisabled={isDisabled}
        icon={<IconUpgrade />}
        onClick={() => setIsOpen(!isOpen)}
        tooltip="Upgrade Nodes"
      />
      <DropdownMenu
        isOpen={isOpen}
        additionalStyles={[
          css`
            left: auto;
            right: 0;
            top: 54px;
            min-width: max-content;
            overflow: visible;
          `,
        ]}
      >
        <AdminDropdownHeader onClose={handleClickOutside}>
          Upgrade Nodes
        </AdminDropdownHeader>
        <Scrollbar additionalStyles={[styles.dropdownInner]}>
          {versions.map((version) => (
            <DropdownItem
              key={version.version}
              onButtonClick={() => setSelectedVersion(version)}
              type="button"
              size="medium"
            >
              <div>
                {version.version}
                {selectedVersion === version && (
                  <Badge style="outline">Selected</Badge>
                )}
              </div>
            </DropdownItem>
          ))}
        </Scrollbar>
        <div css={styles.buttonWrapper}>
          <Button
            disabled={!selectedVersion}
            loading={isUpgrading}
            type="button"
            onClick={handleUpgrade}
          >
            Upgrade Nodes
          </Button>
        </div>
      </DropdownMenu>
    </div>
  );
};
