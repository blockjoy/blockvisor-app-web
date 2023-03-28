import { spacing } from 'styles/utils.spacing.styles';
import { AllOrganizationsTable } from './OrganizationListTable';
import { styles } from './OrganizationList.styles';
import { layoutState } from '@modules/layout/store/layoutAtoms';
import { useRecoilValue } from 'recoil';
import { useGetOrganizations } from '../../../hooks/useGetOrganizations';
import { Button, TableSkeleton } from '@shared/components';
import { useOrganizationsUIContext } from '@modules/organization/ui/OrganizationsUIContext';
import { useMemo } from 'react';
import { organizationAtoms } from '@modules/organization/store/organizationAtoms';
import { useEffect, useState } from 'react';
import { useRouter } from 'next/router';
import { OrganizationAdd } from './OrganizationAdd/OrganizationAdd';
import IconOrganizations from '@public/assets/icons/organization-16.svg';

export const OrganizationsList = () => {
  const organizationUIContext = useOrganizationsUIContext();
  const organizationUIProps = useMemo(() => {
    return {
      queryParams: organizationUIContext.queryParams,
      setQueryParams: organizationUIContext.setQueryParams,
    };
  }, [organizationUIContext]);
  const router = useRouter();
  const { add } = router.query;

  const { isLoading } = useGetOrganizations();
  const organizationsActive = useRecoilValue(
    organizationAtoms.organizationsActive(organizationUIProps.queryParams),
  );

  const [isAdding, setIsAdding] = useState<boolean>(false);

  useEffect(() => {
    if (router.isReady && add) {
      setIsAdding(true);
    }
  }, [router.isReady, add]);

  return (
    <div css={styles.wrapper}>
      <header css={[styles.header, spacing.bottom.large]}>
        All Organizations
        {!isAdding && (
          <Button
            size="small"
            style="outline"
            onClick={() => setIsAdding(true)}
          >
            <span css={styles.addIcon}>
              <IconOrganizations />
            </span>
            Add New
          </Button>
        )}
      </header>
      {isAdding && <OrganizationAdd setIsAdding={setIsAdding} />}
      <section css={spacing.top.large}>
        {isLoading === 'initializing' ? (
          <TableSkeleton />
        ) : (
          <AllOrganizationsTable
            organizations={organizationsActive}
            isLoading={isLoading}
            queryParams={organizationUIProps.queryParams}
            setQueryParams={organizationUIProps.setQueryParams}
          />
        )}
      </section>
    </div>
  );
};
