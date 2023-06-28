import { AllOrganizationsTable } from './OrganizationListTable';
import { styles } from './OrganizationList.styles';
import { useRecoilValue } from 'recoil';
import {
  useDefaultOrganization,
  useGetOrganizations,
} from '@modules/organization';
import {
  Badge,
  Scrollbar,
  Skeleton,
  SkeletonGrid,
  TableSkeleton,
} from '@shared/components';
import { useOrganizationsUIContext } from '@modules/organization/ui/OrganizationsUIContext';
import { useMemo } from 'react';
import { organizationAtoms } from '@modules/organization/store/organizationAtoms';
import { useState } from 'react';
import { useRouter } from 'next/router';

import { OrganizationListHeader } from '@modules/organization';
import { ROUTES } from '@shared/constants/routes';

export const OrganizationsList = () => {
  const router = useRouter();

  const organizationUIContext = useOrganizationsUIContext();
  const organizationUIProps = useMemo(() => {
    return {
      queryParams: organizationUIContext.queryParams,
      setQueryParams: organizationUIContext.setQueryParams,
    };
  }, [organizationUIContext]);

  const { isLoading } = useGetOrganizations();

  const [searchTerm, setSearchTerm] = useState('');

  const toggleSearchTerm = (value: string) => setSearchTerm(value);

  const { defaultOrganization } = useDefaultOrganization();

  const organizationsActive = useRecoilValue(
    organizationAtoms.organizationsActive(organizationUIProps.queryParams),
  );

  const filteredOrgz = organizationsActive.filter((org) =>
    org.name.toLowerCase().includes(searchTerm.toLowerCase()),
  );

  const handleRowClicked = (id: string) => {
    router.push(`${ROUTES.ORGANIZATION(id)}`);
  };

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
          {filteredOrgz?.map((org) => {
            const isActive = defaultOrganization?.id === org.id;
            return (
              <button
                className={isActive ? 'active' : ''}
                onClick={() => handleRowClicked(org.id)}
                css={styles.row}
                key={org.id}
              >
                <p>{org.name}</p>
                {isActive && (
                  <Badge color="primary" style="outline">
                    Default
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
