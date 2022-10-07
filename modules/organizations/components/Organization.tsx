import { useRouter } from 'next/router';
import { NextPage } from 'next';
import { useEffect } from 'react';
import {
  PageHeader,
  PageSection,
  Skeleton,
  SkeletonGrid,
  TableSkeleton,
} from '@modules/app/components/shared';
import { DangerZone } from '@modules/app/components/shared/danger-zone/DangerZone';
import { BackButton } from '@shared/components/BackButton/BackButton';
import { useOrganizations } from '../hooks/useOrganizations';
import { queryAsString } from '@shared/utils/query';
import { OrganizationDetails } from './OrganizationDetails/OrganizationDetails';
import { DetailsTable } from '@modules/app/components/shared/details-table/DetailsTable';
import { getOrganizationDetails } from '../utils/organizationDetails';
import { spacing } from 'styles/utils.spacing.styles';
import { MembersTable } from './MembersTable/MembersTable';

const Organization: NextPage = () => {
  const router = useRouter();
  const { id } = router.query;
  const {
    removeOrganization,
    selectedOrganization,
    getOrganization,
    loadingOrganizations,
  } = useOrganizations();

  const handleDeleteOrganisation = async (id: string) => {
    await removeOrganization(id);
  };

  useEffect(() => {
    getOrganization(queryAsString(id));
  }, []);

  const details = getOrganizationDetails(selectedOrganization);

  return (
    <>
      <PageSection>
        <PageHeader>
          <BackButton />
        </PageHeader>
        {loadingOrganizations ? (
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
              id={selectedOrganization?.id?.value ?? ''}
              name={selectedOrganization?.name ?? ''}
            />
            <DetailsTable bodyElements={details ?? []} />
            <div css={[spacing.top.xLarge]} />
            <h2 css={[spacing.bottom.large]}>Members</h2>
            <MembersTable isLoading={loadingOrganizations} />
          </>
        )}
      </PageSection>
      <PageSection>
        <DangerZone
          elementName="Organization"
          elementNameToCompare={selectedOrganization?.name ?? ''}
          handleDelete={() => handleDeleteOrganisation(queryAsString(id))}
        ></DangerZone>
      </PageSection>
    </>
  );
};

export default Organization;
