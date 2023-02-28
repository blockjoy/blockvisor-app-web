import { EmptyColumn } from '@shared/index';
import { styles } from './Plan.styles';

export const Plan = () => {
  return (
    <EmptyColumn
      title="You Have No Active Plans."
      description={
        <div>
          <p>
            You are currently on a free plan. To access BlockVisor features add
            a paid plan.
          </p>
        </div>
      }
      align="left"
      additionalStyles={styles.wrapper}
    />
  );
};
