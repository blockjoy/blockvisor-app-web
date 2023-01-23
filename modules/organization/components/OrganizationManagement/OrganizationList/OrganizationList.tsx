import { spacing } from 'styles/utils.spacing.styles';
import { AllOrganizationsTable } from './OrganizationListTable';
import { styles } from './OrganizationList.styles';
import { useRecoilState } from 'recoil';
import { Button } from '@shared/components';
import { layoutState } from '@modules/layout/store/layoutAtoms';

export const OrganizationsList = () => {
  const [, setLayout] = useRecoilState(layoutState);

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
