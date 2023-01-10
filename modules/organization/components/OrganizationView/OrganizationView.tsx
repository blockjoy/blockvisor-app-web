import { useRouter } from 'next/router';
import { useEffect, useState } from 'react';
import { BackButton } from '@shared/components/BackButton/BackButton';
import { queryAsString } from '@shared/utils/query';
import { OrganizationDetails } from './OrganizationDetails/OrganizationDetails';
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

export const OrganizationView = () => {
  const router = useRouter();
  const { id } = router.query;
  const { getOrganization, organization, isLoading } = useGetOrganization();
  const { deleteOrganization } = useDeleteOrganization();
  const { updateOrganization } = useUpdateOrganization();

  const handleDelete = async () => deleteOrganization(queryAsString(id));

  const [isSavingOrganization, setIsSavingOrganization] =
    useState<boolean>(false);

  const handleSaveClicked = async (newOrganizationName: string) => {
    console.log('handleSaveClicked', newOrganizationName);

    setIsSavingOrganization(true);

    try {
      await updateOrganization(newOrganizationName);
      setIsSavingOrganization(false);
      toast.success('Organization Updated');
    } catch (err: any) {
      setIsSavingOrganization(false);
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
      <PageTitle title="Organization Management"></PageTitle>
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
          <div css={spacing.top.medium}>
            <EditableTitle
              isSaving={isSavingOrganization}
              initialValue={organization?.name!}
              onSaveClicked={handleSaveClicked}
            />
            {/* <OrganizationDetails
              id={organization?.id}
              name={organization?.name}
            /> */}
            <DetailsTable bodyElements={details ?? []} />
            <div css={[spacing.top.xLarge]} />
            <Members id={queryAsString(id)} />
            <div css={[spacing.top.xLarge]} />
          </div>
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
