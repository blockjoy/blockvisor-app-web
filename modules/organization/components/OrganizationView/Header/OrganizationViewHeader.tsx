import { useState } from 'react';
import { useRecoilValue } from 'recoil';
import { toast } from 'react-toastify';
import { Skeleton, SkeletonGrid, EditableTitle } from '@shared/components';
import { styles } from './OrganizationViewHeader.styles';
import {
  useGetOrganization,
  useUpdateOrganization,
} from '@modules/organization';
import { authSelectors } from '@modules/auth';
import { OrganizationViewHeaderActions } from './Actions/OrganizationViewHeaderActions';

export const OrganizationViewHeader = () => {
  const { organization, isLoading } = useGetOrganization();

  const { updateOrganization } = useUpdateOrganization();

  const canUpdate = useRecoilValue(authSelectors.hasPermission('org-update'));
  const canAdminUpdate = useRecoilValue(
    authSelectors.hasPermission('org-admin-update'),
  );

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

  const handleEditClicked = () => {
    setIsSavingOrganization(null);
  };

  const canUpdateOrganization =
    (canUpdate || canAdminUpdate) && !organization?.personal;

  const isLoadingOrg =
    isLoading !== 'finished' || organization?.nodeCount === null;

  return (
    <>
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
                canUpdate={canUpdateOrganization}
              />
              {!organization.personal && <OrganizationViewHeaderActions />}
            </>
          )
        )}
      </header>
    </>
  );
};
