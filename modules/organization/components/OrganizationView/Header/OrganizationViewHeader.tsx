<<<<<<< HEAD
import { Skeleton, SkeletonGrid, EditableTitle } from '@shared/components';
import { FC, useState } from 'react';
=======
import {
  Skeleton,
  SkeletonGrid,
  EditableTitle,
  Button,
  SvgIcon,
  DeleteModal,
} from '@shared/components';
import { useState } from 'react';
import { useRecoilValue } from 'recoil';
>>>>>>> edc70c6f (feat: [sc-2354] updated permissions; moved billing to sidebar)
import { styles } from './OrganizationViewHeader.styles';
import {
  useGetOrganization,
  useUpdateOrganization,
} from '@modules/organization';
import { usePermissions } from '@modules/auth';
import { toast } from 'react-toastify';
import { OrganizationViewHeaderActions } from './Actions/OrganizationViewHeaderActions';

<<<<<<< HEAD
export const OrganizationViewHeader: FC = () => {
=======
export const OrganizationViewHeader = () => {
  const [isDeleteMode, setIsDeleteMode] = useState(false);

>>>>>>> edc70c6f (feat: [sc-2354] updated permissions; moved billing to sidebar)
  const { organization, isLoading } = useGetOrganization();

  const { updateOrganization } = useUpdateOrganization();
  const { hasPermission } = usePermissions();

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

  const canUpdateOrganization = hasPermission('org-update');

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
                canUpdate={canUpdateOrganization && !organization?.personal}
              />
              {!organization.personal && <OrganizationViewHeaderActions />}
            </>
          )
        )}
      </header>
    </>
  );
};
