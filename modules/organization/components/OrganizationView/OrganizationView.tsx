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
} from '@shared/components';
import { useDeleteOrganization } from '@modules/organization/hooks/useDeleteOrganization';
import { useGetOrganization } from '@modules/organization/hooks/useGetOrganization';
import { Members } from './OrganizationMembers/OrganizationMembers';
import { useUpdateOrganization } from '@modules/organization';
import { Permissions, useHasPermissions } from '@modules/auth/hooks/useHasPermissions';
import { useLeaveOrganization } from '@modules/organization/hooks/useLeaveOrganization';

export const OrganizationView = () => {
  const router = useRouter();
  const { id } = router.query;
  const { getOrganization, organization, isLoading } = useGetOrganization();
  const { deleteOrganization } = useDeleteOrganization();
  const { updateOrganization } = useUpdateOrganization();
  const { leaveOrganization } = useLeaveOrganization();

  const [isSavingOrganization, setIsSavingOrganization] =
    useState<boolean>(false);

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

  const canUpdateOrganization: boolean = useHasPermissions(organization?.currentUser?.role!, Permissions.UPDATE_ORGANIZATION);
  const canDeleteOrganization: boolean = useHasPermissions(organization?.currentUser?.role!, Permissions.DELETE_ORGANIZATION);

  const action = canDeleteOrganization ? 'delete' : 'leave';

  const handleAction = async () => {
    if (canDeleteOrganization) {
      await deleteOrganization(queryAsString(id));
    } else {
      await leaveOrganization(queryAsString(id));
    }
  };

  useEffect(() => {
    if (router.isReady) {
      getOrganization(queryAsString(id));
    }
  }, [router.isReady]);

  const details = getOrganizationDetails(organization);

  return (
    <>
      <PageTitle title="Organizations" />
      <PageSection>
        <div css={spacing.top.medium}>
          <BackButton />
        </div>
        {isLoading === 'initializing' ? (
          <div css={spacing.top.medium}>
            <SkeletonGrid padding="10px 0 70px">
              <Skeleton width="260px" />
              <Skeleton width="180px" />
            </SkeletonGrid>
            <TableSkeleton />
          </div>
        ) : (
          <div css={spacing.top.medium}>
            <EditableTitle
              isSaving={isSavingOrganization}
              initialValue={organization?.name!}
              onSaveClicked={handleSaveClicked}
              canUpdate={canUpdateOrganization && !organization?.personal}
            />
            <DetailsTable bodyElements={details ?? []} />
            <div css={[spacing.top.xLarge]} />
            <Members id={queryAsString(id)} />
          </div>
        )}
      </PageSection>
      {isLoading === 'finished' && !organization?.personal && (
        <PageSection>
          <DangerZone
            elementName="Organization"
            elementNameToCompare={organization?.name ?? ''}
            activeAction={action}
            handleAction={handleAction}
          ></DangerZone>
        </PageSection>
      )}
    </>
  );
};
