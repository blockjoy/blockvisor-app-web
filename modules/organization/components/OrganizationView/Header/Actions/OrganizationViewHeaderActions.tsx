import { useState } from 'react';
import { useRecoilValue } from 'recoil';
import {
  getOrganizationRole,
  useDefaultOrganization,
  useDeleteOrganization,
  useGetOrganization,
  useGetOrganizations,
  useLeaveOrganization,
} from '@modules/organization';
import { authSelectors, useIdentity } from '@modules/auth';
import { ActionsDropdown, DeleteModal, NextLink } from '@shared/components';
import { ROUTES } from '@shared/constants/routes';
import { useRouter } from 'next/router';
import { useNodeList } from '@modules/node';
import IconAdmin from '@public/assets/icons/app/Sliders.svg';
import IconDelete from '@public/assets/icons/common/Trash.svg';
import IconDoor from '@public/assets/icons/common/Door.svg';

export const OrganizationViewHeaderActions = () => {
  const router = useRouter();

  const [isDeleteMode, setIsDeleteMode] = useState(false);

  const [deleteType, setDeleteType] = useState<'Delete' | 'Leave'>();

  const { nodeList } = useNodeList();
  const { defaultOrganization } = useDefaultOrganization();
  const { organization } = useGetOrganization();
  const { removeFromOrganizations } = useGetOrganizations();
  const { deleteOrganization } = useDeleteOrganization();
  const { leaveOrganization } = useLeaveOrganization();
  const { getDefaultOrganization } = useDefaultOrganization();
  const { user } = useIdentity();

  const isSuperUser = useRecoilValue(authSelectors.isSuperUser);
  const canDelete = useRecoilValue(authSelectors.hasPermission('org-delete'));
  const canAdminDelete = useRecoilValue(
    authSelectors.hasPermission('org-admin-delete'),
  );
  const canRemoveSelf = useRecoilValue(
    authSelectors.hasPermission('org-remove-self'),
  );

  const orgHasOtherAdmins = organization?.members
    .filter((member) => member.userId !== user?.userId)
    .some(
      (member) =>
        getOrganizationRole(member.roles) === 'Admin' ||
        getOrganizationRole(member.roles) === 'Owner',
    );

  const canDeleteOrganization = canDelete || canAdminDelete;

  const canLeaveOrganization = canRemoveSelf && orgHasOtherAdmins;

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

  const gotoAdminPanel = () =>
    router.push(`/admin?name=orgs&id=${defaultOrganization?.orgId}`);

  const onSuccess = async () => {
    const newOrgs = removeFromOrganizations(organization?.orgId!);
    const newDefaultOrg = await getDefaultOrganization(newOrgs);
    router.push(ROUTES.ORGANIZATION(newDefaultOrg?.orgId!));
    setIsDeleteMode(false);
  };

  const onError = () => {
    setIsDeleteMode(false);
  };

  const handleAction = () =>
    deleteType === 'Delete'
      ? deleteOrganization(organization!.orgId, onSuccess, onError)
      : leaveOrganization(organization!.orgId, onSuccess, onError);

  const items = [];

  const hasBorderTop =
    (canLeaveOrganization && canDeleteOrganization) || isSuperUser;

  if (isSuperUser) {
    items.push({
      name: 'Admin',
      icon: <IconAdmin />,
      onClick: gotoAdminPanel,
    });
  }

  if (canLeaveOrganization) {
    items.push({
      name: 'Leave',
      icon: <IconDoor />,
      onClick: toggleLeaveModalOpen,
      hasBorderTop: !canDeleteOrganization && hasBorderTop,
    });
  }

  if (canDeleteOrganization) {
    items.push({
      name: 'Delete',
      icon: <IconDelete />,
      onClick: toggleDeleteModalOpen,
      hasBorderTop: hasBorderTop,
    });
  }

  const singleNode = nodeList?.length && nodeList[0];

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
              <NextLink
                href={
                  organization?.nodeCount === 1 && singleNode
                    ? ROUTES.NODE(singleNode.nodeId)
                    : ROUTES.NODES
                }
              >
                {organization?.nodeCount}{' '}
                {organization?.nodeCount === 1 ? 'Node' : 'Nodes'} attached.
              </NextLink>
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
