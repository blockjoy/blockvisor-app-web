import { useRouter } from 'next/router';
import { NextPage } from 'next';
import { useEffect } from 'react';
import { BackButton } from '@shared/components/BackButton/BackButton';
import { queryAsString } from '@shared/utils/query';
import { OrganizationDetails } from './OrganizationDetails/OrganizationDetails';
import { getOrganizationDetails } from '../utils/organizationDetails';
import { spacing } from 'styles/utils.spacing.styles';
import { MembersTable } from './MembersTable/MembersTable';
import {
  DangerZone,
  DetailsTable,
  PageHeader,
  PageSection,
  Skeleton,
  SkeletonGrid,
  TableSkeleton,
} from '@shared/components';
import { useDeleteOrganization } from '../hooks/useDeleteOrganization';
import { useGetOrganizationById } from '../hooks/useGetOrganizationById';
import { toast } from 'react-toastify';

const Organization: NextPage = () => {
  const router = useRouter();
  const { id } = router.query;
  const { getOrganization, organization, loading } = useGetOrganizationById();
  const { deleteOrganization } = useDeleteOrganization();

  const handleDeleteOrganisation = async (id: string) => {
    try {
      await deleteOrganization(id);
      toast.success('Deleted successfully');
    } catch (error) {
      toast.error('Delete failed');
    }
  };

  useEffect(() => {
    getOrganization(queryAsString(id));
  }, []);

  const details = getOrganizationDetails(organization);

  return (
    <>
      <PageSection>
        <PageHeader>
          <BackButton />
        </PageHeader>
        {loading ? (
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
            <h2 css={[spacing.bottom.large]}>Members</h2>
            <MembersTable isLoading={loading} />
          </>
        )}
      </PageSection>
      <PageSection>
        <DangerZone
          elementName="Organization"
          elementNameToCompare={organization?.name ?? ''}
          handleDelete={() => handleDeleteOrganisation(queryAsString(id))}
        ></DangerZone>
      </PageSection>
    </>
  );
};

export default Organization;
