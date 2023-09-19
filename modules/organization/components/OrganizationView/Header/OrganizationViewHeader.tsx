import {
  Skeleton,
  SkeletonGrid,
  EditableTitle,
  Button,
  SvgIcon,
  DeleteModal,
  ButtonGroup,
} from '@shared/components';
import { FC, useState } from 'react';
import { styles } from './OrganizationViewHeader.styles';
import {
  useDefaultOrganization,
  useDeleteOrganization,
  useGetOrganization,
  useGetOrganizations,
  useUpdateOrganization,
} from '@modules/organization';
import { useLeaveOrganization } from '@modules/organization/hooks/useLeaveOrganization';
import { usePermissions } from '@modules/auth';
import { toast } from 'react-toastify';
import { useRouter } from 'next/router';
import { ROUTES } from '@shared/constants/routes';
import IconDelete from '@public/assets/icons/common/Trash.svg';
import IconDoor from '@public/assets/icons/common/Door.svg';

export const OrganizationViewHeader: FC = () => {
  const [isDeleteMode, setIsDeleteMode] = useState(false);

  const [deleteType, setDeleteType] = useState<string | 'Delete' | 'Leave'>();

  const { organization, isLoading } = useGetOrganization();

  const router = useRouter();

  const { deleteOrganization } = useDeleteOrganization();
  const { updateOrganization } = useUpdateOrganization();
  const { leaveOrganization } = useLeaveOrganization();
  const { hasPermission } = usePermissions();

  const { organizations } = useGetOrganizations();

  const [isSavingOrganization, setIsSavingOrganization] =
    useState<boolean | null>(null);

  const handleSaveClicked = async (newOrganizationName: string) => {
    setIsSavingOrganization(true);
    try {
      await updateOrganization(organization!.id, newOrganizationName);
      setIsSavingOrganization(false);
      toast.success('Organization Updated');
    } catch (err: any) {
      setIsSavingOrganization(false);
    }
  };

  const handleDeleteModalClosed = () => {
    setIsDeleteMode(false);
  };

  const toggleDeleteModalOpen = (type: 'Delete' | 'Leave') => {
    setDeleteType(type);
    setIsDeleteMode(!isDeleteMode);
  };

  const handleEditClicked = () => {
    setIsSavingOrganization(null);
  };

  const canUpdateOrganization = hasPermission('org-update');

  const canDeleteOrganization = hasPermission('org-delete');

  const canLeaveOrganization = hasPermission('org-remove-self');

  const { getDefaultOrganization } = useDefaultOrganization();

  const callback = async () => {
    await getDefaultOrganization(organizations);
    router.push(ROUTES.ORGANIZATION(organizations[0].id));
    setIsDeleteMode(false);
  };

  const handleAction = () =>
    deleteType === 'Delete'
      ? deleteOrganization(organization!.id, callback)
      : deleteOrganization(organization!.id, callback);

  const isLoadingOrg =
    isLoading !== 'finished' || organization?.nodeCount === null;

  return (
    <>
      {isDeleteMode && canDeleteOrganization && (
        <DeleteModal
          portalId="delete-org-modal"
          elementName={organization?.name!}
          entityName="Organization"
          type={deleteType}
          onHide={handleDeleteModalClosed}
          onSubmit={handleAction}
        />
      )}
      <header css={styles.header}>
        {isLoadingOrg && !organization?.id ? (
          <SkeletonGrid>
            <Skeleton width="280px" />
          </SkeletonGrid>
        ) : (
          organization?.id && (
            <>
              <EditableTitle
                initialValue={organization?.name!}
                isLoading={isLoadingOrg}
                isSaving={isSavingOrganization!}
                onSaveClicked={handleSaveClicked}
                onEditClicked={handleEditClicked}
                canUpdate={canUpdateOrganization && !organization?.personal}
              />
              {(canDeleteOrganization || canLeaveOrganization) &&
                !organization.personal && (
                  <ButtonGroup type="flex">
                    {canDeleteOrganization && (
                      <Button
                        disabled={organization!.nodeCount > 0}
                        tooltip={
                          organization!.nodeCount > 0
                            ? 'Has Nodes Attached'
                            : ''
                        }
                        onClick={() => toggleDeleteModalOpen('Delete')}
                        style="basic"
                      >
                        <SvgIcon>
                          <IconDelete />
                        </SvgIcon>
                        <p>Delete</p>
                      </Button>
                    )}
                    {canLeaveOrganization && (
                      <Button
                        onClick={() => toggleDeleteModalOpen('Leave')}
                        style="basic"
                      >
                        <SvgIcon>
                          <IconDoor />
                        </SvgIcon>
                        <p>Leave</p>
                      </Button>
                    )}
                  </ButtonGroup>
                )}
            </>
          )
        )}
      </header>
    </>
  );
};
