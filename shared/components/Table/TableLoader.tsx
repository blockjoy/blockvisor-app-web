import { FC } from 'react';
import { styles } from './TableLoader.styles';

type Props = {
  isLoading: boolean;
};

export const TableLoader: FC<Props> = ({ isLoading }) => {
  return (
    <div css={[styles.wrapper, isLoading ? styles.loading : '']}>
      <div css={[styles.spinner]} />
    </div>
  );
};
