import {
  Skeleton,
  SkeletonGrid,
  EditableTitle,
  Button,
  SvgIcon,
  DeleteModal,
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
import { useHasPermissions } from '@modules/auth';
import { toast } from 'react-toastify';
import { useRouter } from 'next/router';
import { ROUTES } from '@shared/constants/routes';
import IconDelete from '@public/assets/icons/common/Trash.svg';
import IconDoor from '@public/assets/icons/common/Door.svg';

export const OrganizationViewHeader: FC = () => {
  const [isDeleteMode, setIsDeleteMode] = useState(false);

  const { organization, isLoading } = useGetOrganization();

  const router = useRouter();

  const { deleteOrganization } = useDeleteOrganization();
  const { updateOrganization } = useUpdateOrganization();
  const { leaveOrganization } = useLeaveOrganization();

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

  const toggleDeleteModalOpen = () => setIsDeleteMode(!isDeleteMode);

  const handleEditClicked = () => {
    setIsSavingOrganization(null);
  };

  const canUpdateOrganization = useHasPermissions('org-update');

  const canDeleteOrganization = useHasPermissions('org-delete');

  const { getDefaultOrganization } = useDefaultOrganization();

  const callback = async () => {
    await getDefaultOrganization(organizations);
    router.push(ROUTES.ORGANIZATION(organizations[0].id));
    setIsDeleteMode(false);
  };

  const handleAction = async () => {
    if (canDeleteOrganization) {
      deleteOrganization(organization!.id, callback);
    } else {
      leaveOrganization(organization!.id, callback);
    }
  };

  const type = canDeleteOrganization ? 'Delete' : 'Leave';

  const isLoadingOrg =
    isLoading !== 'finished' || organization?.nodeCount === null;

  return (
    <>
      {isDeleteMode && (
        <DeleteModal
          portalId="delete-org-modal"
          elementName={organization?.name!}
          entityName="Organization"
          type={type}
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
              {!organization.personal && (
                <Button
                  disabled={
                    canDeleteOrganization ? organization!.nodeCount > 0 : false
                  }
                  tooltip={
                    canDeleteOrganization && organization!.nodeCount > 0
                      ? 'Has Nodes Attached'
                      : ''
                  }
                  onClick={toggleDeleteModalOpen}
                  style="basic"
                >
                  <SvgIcon>
                    {canDeleteOrganization ? <IconDelete /> : <IconDoor />}
                  </SvgIcon>
                  <p>{canDeleteOrganization ? 'Delete' : 'Leave'}</p>
                </Button>
              )}
            </>
          )
        )}
      </header>
    </>
  );
};
