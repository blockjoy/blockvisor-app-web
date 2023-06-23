import { Skeleton, SkeletonGrid, EditableTitle } from '@shared/components';
import { FC, useState } from 'react';
import { styles } from './OrganizationViewHeader.styles';
import { OrganizationViewHeaderActions } from './Actions/OrganizationViewHeaderActions';
import { OrganizationViewHeaderDelete } from './Delete/OrganizationViewHeaderDelete';
import { wrapper } from 'styles/wrapper.styles';
import {
  getOrganizationDetails,
  getOrgMemberRole,
  useDeleteOrganization,
  useGetOrganization,
  useInvitations,
  useUpdateOrganization,
} from '@modules/organization';
import { useLeaveOrganization } from '@modules/organization/hooks/useLeaveOrganization';
import { useIdentity } from '@modules/auth';
import {
  Permissions,
  useHasPermissions,
} from '@modules/auth/hooks/useHasPermissions';
import { toast } from 'react-toastify';

export const OrganizationViewHeader: FC = () => {
  const [isDeleteMode, setIsDeleteMode] = useState(false);

  const { setOrganization, organization, isLoading, setIsLoading } =
    useGetOrganization();

  const { deleteOrganization } = useDeleteOrganization();
  const { updateOrganization } = useUpdateOrganization();
  const { leaveOrganization } = useLeaveOrganization();

  const { user } = useIdentity();

  const {
    getSentInvitations,
    isLoading: sentInvitationsLoadingState,
    setIsLoading: setSentInvitationsLoadingState,
  } = useInvitations();

  const [isSavingOrganization, setIsSavingOrganization] =
    useState<boolean | null>(null);

  const [isDeleting, setIsDeleting] = useState<boolean>(false);

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

  const role = getOrgMemberRole(organization!, user?.id!);

  const canUpdateOrganization: boolean = useHasPermissions(
    role,
    Permissions.UPDATE_ORGANIZATION,
  );

  const canDeleteOrganization: boolean = useHasPermissions(
    role,
    Permissions.DELETE_ORGANIZATION,
  );

  const action = canDeleteOrganization ? 'delete' : 'leave';

  const handleAction = async () => {
    setIsDeleting(true);
    if (canDeleteOrganization) {
      await deleteOrganization(organization!.id);
    } else {
      await leaveOrganization(organization!.id);
    }
  };

  const details = getOrganizationDetails(organization);
  const isLoadingOrg =
    isLoading !== 'finished' ||
    sentInvitationsLoadingState !== 'finished' ||
    organization?.nodeCount === null;

  console.log('isLoading', isLoadingOrg);

  return (
    <>
      {isDeleteMode && (
        <OrganizationViewHeaderDelete onHide={handleDeleteModalClosed} />
      )}

      <div css={wrapper.main}>
        <header css={styles.header}>
          {false && !organization?.id ? (
            <SkeletonGrid>
              <Skeleton width="400px" />
            </SkeletonGrid>
          ) : (
            organization?.id && (
              <>
                <EditableTitle
                  initialValue={organization?.name!}
                  // isLoading={false}
                  // isSaving={false}
                  // onSaveClicked={(string) => console.log(string)}
                  // onEditClicked={() => console.log('')}
                  // canUpdate={false}
                  isLoading={isLoadingOrg}
                  isSaving={isSavingOrganization!}
                  onSaveClicked={handleSaveClicked}
                  onEditClicked={handleEditClicked}
                  canUpdate={canUpdateOrganization && !organization?.personal}
                />
                <div css={styles.actions}>
                  <OrganizationViewHeaderActions
                    onDeleteClicked={toggleDeleteModalOpen}
                  />
                </div>
              </>
            )
          )}
        </header>
      </div>
    </>
  );
};
