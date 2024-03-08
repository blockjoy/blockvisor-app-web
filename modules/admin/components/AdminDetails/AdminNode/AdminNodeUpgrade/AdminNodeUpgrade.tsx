import { AdminHeaderButton } from '@modules/admin';
import { blockchainClient, nodeClient } from '@modules/grpc';
import { BlockchainVersion } from '@modules/grpc/library/blockjoy/v1/blockchain';
import {
  DropdownItem,
  DropdownMenu,
  DropdownWrapper,
} from '@shared/components';
import { useRouter } from 'next/router';
import { useEffect, useState } from 'react';
import { styles } from './AdminNodeUpgrade.styles';
import { toast } from 'react-toastify';
import IconUpgrade from '@public/assets/icons/app/NodeUpgrade.svg';

export const AdminNodeUpgrade = () => {
  const router = useRouter();
  const { id } = router.query;

  const [isOpen, setIsOpen] = useState(false);

  const [versions, setVersions] = useState<BlockchainVersion[]>([]);

  const handleUpgrade = async (version: string) => {
    try {
      await nodeClient.upgradeNode(id as string, version);
    } catch (err) {
      toast.error('Error Upgrading');
    } finally {
      toast.success('Upgrade Command Sent');
      setIsOpen(false);
    }
  };

  const loadVersions = async () => {
    try {
      const node = await nodeClient.getNode(id as string);

      const blockchains = await blockchainClient.getBlockchains();

      const blockchain = blockchains.find((b) => b.id === node.blockchainId);

      const nodeType = blockchain?.nodeTypes.find(
        (t) => t.nodeType === node.nodeType,
      );

      setVersions(nodeType?.versions!);
    } catch (err) {
      toast.error('Error Loading Versions');
    }
  };

  useEffect(() => {
    (async () => loadVersions())();
  }, []);

  return (
    <div css={styles.wrapper}>
      <DropdownWrapper
        noBottomMargin
        isOpen={isOpen}
        onClose={() => setIsOpen(false)}
      >
        <AdminHeaderButton
          icon={<IconUpgrade />}
          onClick={() => setIsOpen(!isOpen)}
        >
          Upgrade
        </AdminHeaderButton>
        <DropdownMenu additionalStyles={styles.menu} isOpen={isOpen}>
          {versions.map((version) => (
            <DropdownItem
              onButtonClick={() => handleUpgrade(version.version)}
              type="button"
              size="medium"
            >
              <div>{version.version}</div>
            </DropdownItem>
          ))}
        </DropdownMenu>
      </DropdownWrapper>
    </div>
  );
};
