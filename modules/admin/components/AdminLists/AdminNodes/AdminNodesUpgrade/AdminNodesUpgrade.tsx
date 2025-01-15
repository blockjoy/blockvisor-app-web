import { Dispatch, SetStateAction, useEffect, useRef, useState } from 'react';
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
import { protocolClient, nodeClient, imageClient } from '@modules/grpc';
import { toast } from 'react-toastify';
import { ProtocolVersion } from '@modules/grpc/library/blockjoy/v1/protocol';
import IconUpgrade from '@public/assets/icons/app/NodeUpgrade.svg';
import { Node } from '@modules/grpc/library/blockjoy/v1/node';

type Props = {
  selectedIds: string[];
  list: Node[];
  setList: Dispatch<SetStateAction<Node[]>>;
};

export const AdminNodesUpgrade = ({ selectedIds, list, setList }: Props) => {
  const [isOpen, setIsOpen] = useState(false);

  const [selectedVersion, setSelectedVersion] = useState<ProtocolVersion>();

  const [versions, setVersions] = useState<ProtocolVersion[]>([]);

  const [isLoading, setIsLoading] = useState(false);

  const dropdownRef = useRef<HTMLDivElement | null>(null);

  const handleClickOutside = () => setIsOpen(false);

  const handleUpgrade = async () => {
    const listCopy = [...list];

    try {
      const firstNode = list.find((n) => selectedIds.includes(n.nodeId));

      const imageResponse = await imageClient.getImage({
        versionKey: firstNode?.versionKey,
        semanticVersion: selectedVersion?.semanticVersion,
      });

      await nodeClient.upgradeNode(selectedIds, imageResponse.image?.imageId!);

      for (const id of selectedIds) {
        const foundNode = list.find((n) => n.nodeId === id);
        if (!foundNode) return;
        foundNode.semanticVersion = selectedVersion?.semanticVersion!;
      }

      setList(listCopy);

      toast.success('Upgrade Command Sent');
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
        const { versionKey } = await nodeClient.getNode(selectedIds[0]);
        const versions = await protocolClient.listVersions({
          versionKey,
        });
        setVersions(versions);
      }
    })();
  }, [selectedIds]);

  return (
    <div css={styles.wrapper} ref={dropdownRef}>
      <AdminHeaderButton
        isDisabled={!selectedIds.length}
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
              key={version.semanticVersion}
              onButtonClick={() => setSelectedVersion(version)}
              type="button"
              size="medium"
            >
              <div>
                {version.semanticVersion}
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
