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
import { useOrganisations } from '../hooks/useOrganisations';
import { queryAsString } from '@shared/utils/query';
import { OrganisationDetails } from './OrganisationDetails/OrganisationDetails';
import { DetailsTable } from '@modules/app/components/shared/details-table/DetailsTable';
import { getOrganisationDetails } from '../utils/organisationDetails';
import { spacing } from 'styles/utils.spacing.styles';
import { MembersTable } from './MembersTable/MembersTable';

const OrganisationPage: NextPage = () => {
  const router = useRouter();
  const { id } = router.query;
  const {
    removeOrganisation,
    selectedOrganisation,
    getOrganisation,
    loadingOrganizations,
  } = useOrganisations();

  const handleDeleteOrganisation = async (id: string) => {
    await removeOrganisation(id);
  };

  useEffect(() => {
    getOrganisation(queryAsString(id));
  }, []);

  const details = getOrganisationDetails(selectedOrganisation);

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
            <OrganisationDetails
              id={selectedOrganisation?.id?.value ?? ''}
              name={selectedOrganisation?.name ?? ''}
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
          elementName="Organisation"
          elementNameToCompare={selectedOrganisation?.name ?? ''}
          handleDelete={() => handleDeleteOrganisation(queryAsString(id))}
        ></DangerZone>
      </PageSection>
    </>
  );
};

export default OrganisationPage;
