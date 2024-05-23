import { styles } from './TableLoader.styles';

type Props = {
  isLoading: boolean;
};

export const TableLoader = ({ isLoading }: Props) => {
  return (
    <div css={[styles.wrapper, isLoading ? styles.loading : '']}>
      <div css={[styles.spinner]} />
    </div>
  );
};
