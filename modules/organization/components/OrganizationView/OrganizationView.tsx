import { useRouter } from 'next/router';
import { useEffect, useState } from 'react';
import { BackButton } from '@shared/components/BackButton/BackButton';
import { queryAsString } from '@shared/utils/query';
import { toast } from 'react-toastify';
import { getOrganizationDetails } from '@modules/organization/utils/organizationDetails';
import { spacing } from 'styles/utils.spacing.styles';
import {
  DangerZone,
  DetailsTable,
  PageTitle,
  PageSection,
  Skeleton,
  SkeletonGrid,
  TableSkeleton,
  EditableTitle,
  EmptyColumn,
} from '@shared/components';
import { useDeleteOrganization } from '@modules/organization/hooks/useDeleteOrganization';
import { useGetOrganization } from '@modules/organization/hooks/useGetOrganization';
import { useInvitations, useUpdateOrganization } from '@modules/organization';
import {
  Permissions,
  useHasPermissions,
} from '@modules/auth/hooks/useHasPermissions';
import { useLeaveOrganization } from '@modules/organization/hooks/useLeaveOrganization';
import { useGetOrganizationMembers } from '@modules/organization/hooks/useGetMembers';
import { ROUTES } from '@shared/index';
import { apiClient } from '@modules/client';
import { OrganizationMembersView } from '@modules/organization/components/OrganizationView/OrganizationMembers/OrganizationMembersView';

export const OrganizationView = () => {
  const router = useRouter();
  const { id } = router.query;
  const {
    getOrganization,
    setOrganization,
    organization,
    isLoading,
    setIsLoading,
  } = useGetOrganization();
  const { deleteOrganization } = useDeleteOrganization();
  const { updateOrganization } = useUpdateOrganization();
  const { leaveOrganization } = useLeaveOrganization();

  const {
    getOrganizationMembers,
    isLoading: membersLoadingState,
    setIsLoading: setIsLoadingMembers,
  } = useGetOrganizationMembers();
  const {
    getSentInvitations,
    isLoading: sentInvitationsLoadingState,
    setIsLoading: setSentInvitationsLoadingState,
  } = useInvitations();

  const [isSavingOrganization, setIsSavingOrganization] =
    useState<boolean | null>(null);

  const [isDeleting, setIsDeleting] = useState<boolean>(false);

  const [totalNodes, setTotalNodes] = useState<number | null>(null);

  const handleSaveClicked = async (newOrganizationName: string) => {
    setIsSavingOrganization(true);
    try {
      await updateOrganization(id?.toString()!, newOrganizationName);
      setIsSavingOrganization(false);
      toast.success('Organization Updated');
    } catch (err: any) {
      setIsSavingOrganization(false);
    }
  };

  const handleEditClicked = () => {
    setIsSavingOrganization(null);
  };

  const canUpdateOrganization: boolean = useHasPermissions(
    organization?.currentUser?.role!,
    Permissions.UPDATE_ORGANIZATION,
  );
  const canDeleteOrganization: boolean = useHasPermissions(
    organization?.currentUser?.role!,
    Permissions.DELETE_ORGANIZATION,
  );

  const action = canDeleteOrganization ? 'delete' : 'leave';

  const handleAction = async () => {
    setIsDeleting(true);
    if (canDeleteOrganization) {
      await deleteOrganization(queryAsString(id));
    } else {
      await leaveOrganization(queryAsString(id));
    }
  };

  const getTotalNodes = async () => {
    const nodes: any = await apiClient.listNodes(
      id?.toString()!,
      {
        blockchain: [],
        node_status: [],
        node_type: [],
      },
      {
        current_page: 1,
        items_per_page: 1000,
      },
    );

    if (nodes?.code) {
      return;
    }

    setTotalNodes(nodes?.length);
  };

  useEffect(() => {
    if (router.isReady) {
      setIsDeleting(false);
      setIsSavingOrganization(false);
      getOrganization(queryAsString(id));
      getOrganizationMembers(queryAsString(id));
      getSentInvitations(queryAsString(id));
    }

    return () => {
      setIsLoading('initializing');
      setIsLoadingMembers('initializing');
      setSentInvitationsLoadingState('initializing');
      setOrganization(null);
    };
  }, [router.isReady]);

  // TODO: improve - it causes performance leaks. (quick win to check if org has nodes)
  useEffect(() => {
    getTotalNodes();
  }, []);

  const details = getOrganizationDetails(organization);
  const isLoadingOrg =
    isLoading !== 'finished' ||
    membersLoadingState !== 'finished' ||
    sentInvitationsLoadingState !== 'finished' ||
    totalNodes === null;

  return (
    <>
      <PageTitle title="Organizations" />
      <PageSection bottomBorder={false}>
        <div css={spacing.top.medium}>
          <BackButton backUrl={ROUTES.ORGANIZATIONS} />
        </div>
        {isLoadingOrg ? (
          <div css={spacing.top.medium}>
            <SkeletonGrid padding="10px 0 70px">
              <Skeleton width="260px" />
              <Skeleton width="180px" />
            </SkeletonGrid>
            <TableSkeleton />
          </div>
        ) : organization === null ? (
          <EmptyColumn
            title="Organization Not Found"
            description="No organization exists with this ID"
          />
        ) : (
          <div css={spacing.top.medium}>
            {organization?.name?.length && (
              <EditableTitle
                isLoading={isLoadingOrg}
                isSaving={isSavingOrganization!}
                initialValue={organization?.name!}
                onSaveClicked={handleSaveClicked}
                onEditClicked={handleEditClicked}
                canUpdate={canUpdateOrganization && !organization?.personal}
              />
            )}

            <DetailsTable bodyElements={details ?? []} />
            <div css={[spacing.top.xLarge]} />
            <OrganizationMembersView />
          </div>
        )}
      </PageSection>
      {!isLoadingOrg && organization !== null && !organization?.personal && (
        <PageSection bottomBorder={false}>
          <DangerZone
            elementName="Organization"
            elementNameToCompare={organization?.name ?? ''}
            activeAction={action}
            handleAction={handleAction}
            isLoading={isDeleting}
            isDisabled={
              action === 'delete' && totalNodes !== null && totalNodes! > 0
            }
          ></DangerZone>
        </PageSection>
      )}
    </>
  );
};
