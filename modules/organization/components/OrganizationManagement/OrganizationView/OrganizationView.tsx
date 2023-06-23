import router, { useRouter } from 'next/router';
import { PropsWithChildren, useEffect, useState } from 'react';
import { BackButton } from '@shared/components/Buttons/BackButton/BackButton';
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
import { useIdentity } from '@modules/auth';
import { useDeleteOrganization } from '@modules/organization/hooks/useDeleteOrganization';
import { useGetOrganization } from '@modules/organization/hooks/useGetOrganization';
import {
  getOrgMemberRole,
  useDefaultOrganization,
  useInvitations,
  useUpdateOrganization,
} from '@modules/organization';
import {
  Permissions,
  useHasPermissions,
} from '@modules/auth/hooks/useHasPermissions';
import { useLeaveOrganization } from '@modules/organization/hooks/useLeaveOrganization';
import { PageHeader, ROUTES } from '@shared/index';
import { nodeClient } from '@modules/grpc';
import { OrganizationMembersView } from '@modules/organization/components/OrganizationManagement/OrganizationView/Tabs/OrganizationMembers/OrganizationMembersView';

import { OrganizationViewHeader } from './Header/OrganizationViewHeader';

export const OrganizationView = ({ children }: PropsWithChildren) => {
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

  const { user } = useIdentity();

  const {
    getSentInvitations,
    isLoading: sentInvitationsLoadingState,
    setIsLoading: setSentInvitationsLoadingState,
  } = useInvitations();

  const [isSavingOrganization, setIsSavingOrganization] =
    useState<boolean | null>(null);

  const [isDeleting, setIsDeleting] = useState<boolean>(false);

  useEffect(() => {
    if (router.isReady) {
      setIsDeleting(false);
      setIsSavingOrganization(false);
      getOrganization(queryAsString(id));
      getSentInvitations(queryAsString(id));
    }
  }, [id, router.isReady]);

  return (
    <>
      <OrganizationViewHeader />
      <PageSection bottomBorder={false}>
        {/* <div css={spacing.top.medium}>
          <BackButton backUrl={ROUTES.ORGANIZATIONS} />
        </div> */}
        {false ? (
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
            {/* {organization?.name?.length && (
              
            )} */}
            {/* <DetailsTable bodyElements={details ?? []} />
            <div css={[spacing.top.xLarge]} />
            <OrganizationMembersView /> */}
          </div>
        )}
      </PageSection>
      {/* {!isLoadingOrg && organization !== null && !organization?.personal && (
        <PageSection bottomBorder={false}>
          <DangerZone
            elementName="Organization"
            elementNameToCompare={organization?.name ?? ''}
            activeAction={action}
            handleAction={handleAction}
            isLoading={isDeleting}
            isDisabled={
              action === 'delete' &&
              organization.nodeCount !== null &&
              organization.nodeCount! > 0
            }
          ></DangerZone>
        </PageSection>
      )} */}
    </>
  );
};
