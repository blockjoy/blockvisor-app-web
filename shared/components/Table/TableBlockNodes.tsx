import { css } from '@emotion/react';
import { ITheme } from 'types/theme';

type Props = {
  id: string;
  address: string;
  name: string;
};

const styles = {
  wrapper: css`
    display: block;
  `,
  name: (theme: ITheme) => css`
    display: block;
    margin-bottom: 10px;
    color: ${theme.colorText};
  `,
  row: (theme: ITheme) => css`
    display: flex;
    flex-direction: column;
    gap: 8px;
  `,
  id: (theme: ITheme) => css`
    color: ${theme.colorDefault};
  `,
  address: (theme: ITheme) => css`
    color: ${theme.colorLabel};
  `,
};

export const TableBlockNodes: React.FC<Props> = ({ name, id, address }) => (
  <span css={styles.wrapper}>
    <span css={styles.name} className="has-hover-color">
      {name}
    </span>
    <span css={styles.row}>
      <span css={styles.id}>{id}</span>
      <span css={styles.address}>{address}</span>
    </span>
  </span>
);
