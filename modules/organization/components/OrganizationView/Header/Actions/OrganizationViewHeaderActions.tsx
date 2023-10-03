import { useState } from 'react';
import Link from 'next/link';
import {
  getOrganizationRole,
  useDefaultOrganization,
  useDeleteOrganization,
  useGetOrganization,
  useGetOrganizations,
  useLeaveOrganization,
} from '@modules/organization';
import { useIdentity, usePermissions } from '@modules/auth';
import { ActionsDropdown, DeleteModal } from '@shared/components';
import { ROUTES } from '@shared/constants/routes';
import { useRouter } from 'next/router';

import IconDelete from '@public/assets/icons/common/Trash.svg';
import IconDoor from '@public/assets/icons/common/Door.svg';
import { useNodeList } from '@modules/node';

export const OrganizationViewHeaderActions = () => {
  const router = useRouter();

  const [isDeleteMode, setIsDeleteMode] = useState(false);

  const [deleteType, setDeleteType] = useState<'Delete' | 'Leave'>();

  const { nodeList } = useNodeList();
  const { organization } = useGetOrganization();
  const { organizations } = useGetOrganizations();
  const { deleteOrganization } = useDeleteOrganization();
  const { leaveOrganization } = useLeaveOrganization();
  const { getDefaultOrganization } = useDefaultOrganization();
  const { hasPermission } = usePermissions();
  const { user } = useIdentity();

  const orgHasOtherAdmins = organization?.members
    .filter((member) => member.userId !== user?.id)
    .some(
      (member) =>
        getOrganizationRole(member.roles) === 'Admin' ||
        getOrganizationRole(member.roles) === 'Owner',
    );

  const canDeleteOrganization = hasPermission('org-delete');

  const canLeaveOrganization =
    hasPermission('org-remove-self') && orgHasOtherAdmins;

  const handleDeleteModalClosed = () => {
    setIsDeleteMode(false);
  };

  const toggleDeleteModalOpen = () => {
    setDeleteType('Delete');
    setIsDeleteMode(true);
  };

  const toggleLeaveModalOpen = () => {
    setDeleteType('Leave');
    setIsDeleteMode(true);
  };

  const callback = async () => {
    await getDefaultOrganization(organizations);
    router.push(ROUTES.ORGANIZATION(organizations[0].id));
    setIsDeleteMode(false);
  };

  const handleAction = () =>
    deleteType === 'Delete'
      ? deleteOrganization(organization!.id, callback)
      : leaveOrganization(organization!.id, callback);

  const items = [];

  if (canLeaveOrganization) {
    items.push({
      title: 'Leave',
      icon: <IconDoor />,
      method: toggleLeaveModalOpen,
    });
  }

  if (canDeleteOrganization) {
    items.push({
      title: 'Delete',
      icon: <IconDelete />,
      method: toggleDeleteModalOpen,
    });
  }

  const singleNode = nodeList[0];

  return (
    <>
      {isDeleteMode && (
        <DeleteModal
          portalId="delete-org-modal"
          elementName={organization?.name!}
          entityName="Organization"
          type={deleteType}
          isDisabled={
            deleteType === 'Delete' ? organization?.nodeCount! > 0 : false
          }
          isDisabledMessage={
            <>
              You cannot delete this Organization, it has{' '}
              <Link
                href={
                  organization?.nodeCount === 1 && singleNode
                    ? ROUTES.NODE(singleNode.id)
                    : ROUTES.NODES
                }
              >
                {organization?.nodeCount}{' '}
                {organization?.nodeCount === 1 ? 'Node' : 'Nodes'} attached.
              </Link>
            </>
          }
          onHide={handleDeleteModalClosed}
          onSubmit={handleAction}
        />
      )}
      <ActionsDropdown items={items} />
    </>
  );
};
