import { height } from 'styles/utils.height.styles';
import { width } from 'styles/utils.width.styles';
import { Skeleton } from '../Skeleton/Skeleton';
import { styles } from './tableGrid.styles';

type Props = {
  numOfItems: number;
};
export const TableGridSkeleton = ({ numOfItems }: Props) => (
  <div css={[styles.grid]}>
    {Array(numOfItems)
      .fill({})
      .map(() => (
        <Skeleton additionalStyles={[width.full, height.full]} />
      ))}
  </div>
);
