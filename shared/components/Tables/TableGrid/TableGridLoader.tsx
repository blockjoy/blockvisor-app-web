import { Skeleton } from '@shared/components';
import { styles } from './TableGridCell.styles';

export type TableGridLoaderProps = {
  length?: number;
};

export const TableGridLoader = ({ length }: TableGridLoaderProps) => {
  return (
    <>
      {[...Array(length)].map((_, index) => {
        return (
          <div key={index} css={styles.cell}>
            <div css={styles.cellLeft}>
              <Skeleton width="28px" height="28px" />
            </div>
            <div css={styles.cellRight}>
              <header css={styles.cellHeader}>
                <Skeleton width="90%" />
              </header>
              <div css={styles.cellMiddle}>
                <Skeleton width="50px" />
              </div>
              <div css={styles.cellStatus}>
                <Skeleton width="100px" />
              </div>
            </div>
          </div>
        );
      })}
    </>
  );
};
