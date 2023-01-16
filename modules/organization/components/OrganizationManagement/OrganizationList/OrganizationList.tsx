import { spacing } from 'styles/utils.spacing.styles';
import { AllOrganizationsTable } from './OrganizationListTable';
import { styles } from './OrganizationList.styles';
import { useRecoilState } from 'recoil';
import { useEffect } from 'react';
import { useGetOrganizations } from '../../../hooks/useGetOrganizations';
import { Button } from '@shared/components';
import { layoutState } from '@modules/layout/store/layoutAtoms';

export const OrganizationsList = () => {
  const { getOrganizations } = useGetOrganizations();

  const [, setLayout] = useRecoilState(layoutState);

  useEffect(() => {
    getOrganizations();
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
            Create New
          </Button>
        </span>
      </header>
      <section css={spacing.top.large}>
        <AllOrganizationsTable />
      </section>
    </div>
  );
};
