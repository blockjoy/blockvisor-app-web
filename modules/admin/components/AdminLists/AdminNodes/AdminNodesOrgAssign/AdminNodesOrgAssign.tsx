import { Dispatch, SetStateAction, useEffect, useRef, useState } from 'react';
import { styles } from './AdminNodesOrgAssign.styles';
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
import { nodeClient, organizationClient } from '@modules/grpc';
import { toast } from 'react-toastify';
import { Org } from '@modules/grpc/library/blockjoy/v1/org';
import IconOrg from '@public/assets/icons/app/Organization.svg';
import { Node } from '@modules/grpc/library/blockjoy/v1/node';

type Props = {
  selectedIds: string[];
  list: Node[];
  setList: Dispatch<SetStateAction<Node[]>>;
};

export const AdminNodesOrgAssign = ({ selectedIds, list, setList }: Props) => {
  const [isOpen, setIsOpen] = useState(false);

  const [selectedOrg, setSelectedOrg] = useState<Org>();

  const [orgs, setOrgs] = useState<Org[]>();

  const [isLoading, setIsLoading] = useState(false);

  const dropdownRef = useRef<HTMLDivElement | null>(null);

  const handleClickOutside = () => setIsOpen(false);

  const handleOrgAssign = async () => {
    setIsLoading(true);

    const listCopy = [...list];

    try {
      await nodeClient.updateNode({
        ids: selectedIds,
        newOrgId: selectedOrg?.id,
      });

      for (let id of selectedIds) {
        const foundNode = listCopy.find((n) => n.id === id);
        if (!foundNode) return;
        foundNode.orgName = selectedOrg?.name!;
        foundNode.orgId = selectedOrg?.id!;
      }

      setList(listCopy);

      toast.success('Update Complete');
    } catch (err) {
      toast.error(`Error Updating`);
    } finally {
      setIsOpen(false);
      setIsLoading(false);
    }
  };

  useClickOutside<HTMLDivElement>(dropdownRef, handleClickOutside);

  useEffect(() => {
    (async () => {
      if (selectedIds.length && !orgs?.length) {
        const orgsResponse = await organizationClient.listOrganizations(
          {
            currentPage: 0,
            itemsPerPage: 10000,
          },
          undefined,
          undefined,
          true,
          false,
        );

        setOrgs(orgsResponse.orgs);
      }
    })();
  }, [selectedIds]);

  return (
    <div css={styles.wrapper} ref={dropdownRef}>
      <AdminHeaderButton
        isDisabled={!selectedIds.length}
        icon={<IconOrg />}
        onClick={() => setIsOpen(!isOpen)}
        tooltip="Update Org"
      />
      <DropdownMenu isOpen={isOpen} additionalStyles={[styles.dropdownMenu]}>
        <AdminDropdownHeader onClose={handleClickOutside}>
          Update Org
        </AdminDropdownHeader>
        <Scrollbar additionalStyles={[styles.dropdownInner]}>
          {orgs?.map((org) => (
            <DropdownItem
              key={org.id}
              onButtonClick={() => setSelectedOrg(org)}
              type="button"
              size="medium"
            >
              <div>
                {org.name}
                {selectedOrg?.id === org.id && (
                  <Badge style="outline">Selected</Badge>
                )}
              </div>
            </DropdownItem>
          ))}
        </Scrollbar>
        <div css={styles.buttonWrapper}>
          <Button
            display="block"
            disabled={!selectedOrg}
            loading={isLoading}
            type="button"
            onClick={handleOrgAssign}
          >
            Update Nodes
          </Button>
        </div>
      </DropdownMenu>
    </div>
  );
};
