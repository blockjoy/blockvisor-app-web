import { spacing } from 'styles/utils.spacing.styles';
import { AllOrganizationsTable } from './OrganizationListTable';
import { styles } from './OrganizationList.styles';
import { useRecoilState } from 'recoil';
import { useEffect } from 'react';
import { useGetOrganizations } from '../../../hooks/useGetOrganizations';
import { Button } from '@shared/components';
import { layoutState } from '@modules/layout/store/layoutAtoms';

export const OrganizationsList = () => {
  const { getOrganizations, organizations } = useGetOrganizations();

  const [, setLayout] = useRecoilState(layoutState);

  useEffect(() => {
    if (!organizations?.length) {
      getOrganizations();
    }
  }, []);

  return (
    <div css={styles.wrapper}>
      <header css={[styles.header, spacing.bottom.large]}>
        All Organizations
        <span css={styles.createButton}>
          <Button
            size="small"
            style="outline"
            onClick={() => setLayout('organization')}
          >
            Add New
          </Button>
        </span>
      </header>
      <section css={spacing.top.large}>
        <AllOrganizationsTable />
      </section>
    </div>
  );
};
