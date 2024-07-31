import { useEffect, useRef, useState } from 'react';
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
import { BlockchainVersion } from '@modules/grpc/library/blockjoy/v1/blockchain';
import IconUpgrade from '@public/assets/icons/app/NodeUpgrade.svg';

type Props = {
  isDisabled?: boolean;
  selectedIds: string[];
};

export const AdminNodesUpgrade = ({ isDisabled, selectedIds }: Props) => {
  const [isOpen, setIsOpen] = useState(false);

  const [selectedVersion, setSelectedVersion] = useState<BlockchainVersion>();

  const [versions, setVersions] = useState<BlockchainVersion[]>([]);

  const [isLoading, setIsLoading] = useState(false);

  const dropdownRef = useRef<HTMLDivElement | null>(null);

  const handleClickOutside = () => setIsOpen(false);

  const handleUpgrade = async () => {
    try {
      toast.success('Upgrade Command Sent');
      await nodeClient.upgradeNode(selectedIds, selectedVersion?.version!);
    } catch (err) {
      toast.error(`Error Upgrading`);
    } finally {
      setIsOpen(false);
      setIsLoading(false);
    }
  };

  useClickOutside<HTMLDivElement>(dropdownRef, handleClickOutside);

  useEffect(() => {
    (async () => {
      if (selectedIds.length && !versions.length) {
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
        tooltip="Upgrade"
      />
      <DropdownMenu isOpen={isOpen} additionalStyles={[styles.dropdownMenu]}>
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
            loading={isLoading}
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
