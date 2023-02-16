import { spacing } from 'styles/utils.spacing.styles';
import { AllOrganizationsTable } from './OrganizationListTable';
import { styles } from './OrganizationList.styles';
import { useEffect, useState } from 'react';
import { useGetOrganizations } from '../../../hooks/useGetOrganizations';
import { Button } from '@shared/components';
import { OrganizationAdd } from '@modules/organization';
import IconOrganizations from '@public/assets/icons/organization-16.svg';

export const OrganizationsList = () => {
  const { getOrganizations, organizations } = useGetOrganizations();

  const [isAdding, setIsAdding] = useState<boolean>(false);

  useEffect(() => {
    if (!organizations?.length) {
      getOrganizations();
    }
  }, []);

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
        <AllOrganizationsTable />
      </section>
    </div>
  );
};
