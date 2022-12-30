import { useRouter } from 'next/router';
import { useEffect } from 'react';
import { BackButton } from '@shared/components/BackButton/BackButton';
import { queryAsString } from '@shared/utils/query';
import { OrganizationDetails } from './OrganizationDetails/OrganizationDetails';
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
} from '@shared/components';
import { useDeleteOrganization } from '@modules/organization/hooks/useDeleteOrganization';
import { useGetOrganization } from '@modules/organization/hooks/useGetOrganization';
import { Members } from './OrganizationMembers/OrganizationMembers';

export const OrganizationView = () => {
  const router = useRouter();
  const { id } = router.query;
  const { getOrganization, organization, isLoading } = useGetOrganization();
  const { deleteOrganization } = useDeleteOrganization();

  const handleDelete = async () => deleteOrganization(queryAsString(id));

  useEffect(() => {
    if (router.isReady) {
      getOrganization(queryAsString(id));
    }
  }, [router.isReady]);

  const details = getOrganizationDetails(organization);

  return (
    <>
      <PageTitle title="Organization Details"></PageTitle>
      <PageSection>
        <BackButton />
        {isLoading === 'initializing' ? (
          <>
            <SkeletonGrid padding="10px 0 70px">
              <Skeleton width="260px" />
              <Skeleton width="180px" />
            </SkeletonGrid>
            <TableSkeleton />
          </>
        ) : (
          <>
            <OrganizationDetails
              id={organization?.id}
              name={organization?.name}
            />
            <DetailsTable bodyElements={details ?? []} />
            <div css={[spacing.top.xLarge]} />
            <Members id={queryAsString(id)} />
            <div css={[spacing.top.xLarge]} />
          </>
        )}
      </PageSection>
      {isLoading === 'finished' && (
        <PageSection>
          <DangerZone
            elementName="Organization"
            elementNameToCompare={organization?.name ?? ''}
            handleDelete={handleDelete}
          ></DangerZone>
        </PageSection>
      )}
    </>
  );
};
