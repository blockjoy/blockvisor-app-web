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
import { Visibility } from '@modules/grpc/library/blockjoy/common/v1/protocol';
import { sortVersions } from '@modules/node';
import { ProtocolVersion } from '@modules/grpc/library/blockjoy/v1/protocol';
import IconUpgrade from '@public/assets/icons/app/NodeUpgrade.svg';

export const AdminNodeUpgrade = () => {
  const router = useRouter();
  const { id } = router.query;

  const [isOpen, setIsOpen] = useState(false);

  const [versions, setVersions] = useState<ProtocolVersion[]>([]);

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

      const versionsResponse = await protocolClient.listVersions({
        versionKey: node.versionKey,
        orgId: node.orgId,
      });

      setVersions(
        sortVersions(
          versionsResponse.filter(
            (version) => version.visibility === Visibility.VISIBILITY_PUBLIC,
          ),
        ),
      );
    } catch (err) {
      toast.error('Error Loading Versions');
    }
  };

  useEffect(() => {
    (async () => loadVersions())();
  }, [id]);

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
                key={version.protocolVersionId}
                onButtonClick={() => handleUpgrade(version.semanticVersion)}
                type="button"
                size="medium"
              >
                <div>
                  {version.semanticVersion} - {version.versionKey?.variantKey}
                </div>
              </DropdownItem>
            ))}
          </Scrollbar>
        </DropdownMenu>
      </DropdownWrapper>
    </div>
  );
};
