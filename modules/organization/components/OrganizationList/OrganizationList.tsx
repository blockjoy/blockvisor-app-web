import { styles } from './OrganizationList.styles';
import { useRecoilValue } from 'recoil';
import {
  useGetOrganization,
  useGetOrganizations,
  useSwitchOrganization,
} from '@modules/organization';
import { Badge, Scrollbar, Skeleton, SkeletonGrid } from '@shared/components';
import { useOrganizationsUIContext } from '@modules/organization/ui/OrganizationsUIContext';
import { useEffect, useMemo } from 'react';
import { organizationAtoms } from '@modules/organization/store/organizationAtoms';
import { useRouter } from 'next/router';
import { OrganizationListHeader } from '@modules/organization';
import { ROUTES } from '@shared/constants/routes';
import { escapeHtml } from '@shared/utils/escapeHtml';

export const OrganizationsList = () => {
  const router = useRouter();
  const { id: activeOrgId } = router.query;

  const organizationUIContext = useOrganizationsUIContext();
  const organizationUIProps = useMemo(() => {
    return {
      queryParams: organizationUIContext.queryParams,
      setQueryParams: organizationUIContext.setQueryParams,
    };
  }, [organizationUIContext]);

  const { isLoading, getOrganizations } = useGetOrganizations();
  const { getOrganization } = useGetOrganization();

  const { switchOrganization } = useSwitchOrganization();

  const defaultOrganization = useRecoilValue(
    organizationAtoms.defaultOrganization,
  );
  const allOrganizationsSorted = useRecoilValue(
    organizationAtoms.allOrganizationsSorted,
  );

  const handleRowClicked = (id: string, name: string) => {
    switchOrganization(id, name);
    router.push(`${ROUTES.ORGANIZATION(id)}`);
  };

  useEffect(() => {
    (async () => {
      if (router.isReady) {
        await getOrganizations(false, false);
        getOrganization(activeOrgId as string);
      }
    })();
  }, [router.isReady]);

  return (
    <div css={styles.wrapper}>
      <OrganizationListHeader />
      {isLoading === 'initializing' ? (
        <SkeletonGrid padding="20px 0 0">
          <Skeleton width="150px" />
          <Skeleton width="230px" />
          <Skeleton width="110px" />
        </SkeletonGrid>
      ) : (
        <Scrollbar additionalStyles={[styles.scrollbar]}>
          {allOrganizationsSorted?.map((org) => {
            const isActive = defaultOrganization?.id === org.id;
            return (
              <button
                className={isActive ? 'active' : ''}
                onClick={() => handleRowClicked(org.id, org.name)}
                css={styles.row}
                key={org.id}
              >
                <p>{escapeHtml(org.name)}</p>
                {isActive && (
                  <Badge color="primary" style="outline">
                    Current
                  </Badge>
                )}
              </button>
            );
          })}
        </Scrollbar>
      )}
    </div>
  );
};
