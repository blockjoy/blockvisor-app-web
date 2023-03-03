import { EmptyColumn } from '@shared/index';
import { styles } from './PlanPreview.styles';

export const PlanPreview = () => {
  return (
    <EmptyColumn
      title="You Have No Active Plans."
      description={
        <div>
          <p style={{ marginBottom: '10px' }}>
            You are currently on a free plan. To access BlockVisor features add
            a paid plan.
          </p>
        </div>
      }
      align="left"
      additionalStyles={styles.emptyColumn}
    />
  );
};
