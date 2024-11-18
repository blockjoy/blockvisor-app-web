import { AdminHeaderButton } from '@modules/admin/components';
import { protocolClient, nodeClient } from '@modules/grpc';
import {
  DropdownItem,
  DropdownMenu,
  DropdownWrapper,
  Scrollbar,
} from '@shared/components';
import { useRouter } from 'next/router';
import { useEffect, useState } from 'react';
import { styles } from './AdminNodeUpgrade.styles';
import { toast } from 'react-toastify';
import { sortVersionStringArray } from '@modules/admin/utils';
import IconUpgrade from '@public/assets/icons/app/NodeUpgrade.svg';

export const AdminNodeUpgrade = () => {
  const router = useRouter();
  const { id } = router.query;

  const [isOpen, setIsOpen] = useState(false);

  const [versions, setVersions] = useState<string[]>([]);

  const handleUpgrade = async (version: string) => {
    try {
      await nodeClient.upgradeNode([id as string], version);
      toast.success('Upgrade Command Sent');
    } catch (err) {
      toast.error('Error Upgrading');
    } finally {
      setIsOpen(false);
    }
  };

  const loadVersions = async () => {
    try {
      const node = await nodeClient.getNode(id as string);

      const protocolsResponse = await protocolClient.listProtocols();

      const protocol = protocolsResponse.protocols.find(
        (b) => b.protocolId === node.protocolId,
      );

      setVersions(
        sortVersionStringArray(
          protocol?.versions.map(({ semanticVersion }) => semanticVersion),
        ),
      );
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
          tooltip="Upgrade"
        />
        <DropdownMenu additionalStyles={styles.menu} isOpen={isOpen}>
          <Scrollbar additionalStyles={[styles.scrollbar]}>
            {versions.map((version) => (
              <DropdownItem
                key={version}
                onButtonClick={() => handleUpgrade(version)}
                type="button"
                size="medium"
              >
                <div>{version}</div>
              </DropdownItem>
            ))}
          </Scrollbar>
        </DropdownMenu>
      </DropdownWrapper>
    </div>
  );
};
