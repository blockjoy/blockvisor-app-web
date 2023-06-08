import { css } from '@emotion/react';
import { ITheme } from 'types/theme';

type Props = {
  id?: string;
  address: string;
  name: string;
};

const styles = {
  wrapper: css`
    display: block;
  `,
  name: (theme: ITheme) => css`
    display: block;
    margin-bottom: 6px;
    color: ${theme.colorText};
  `,
  row: (theme: ITheme) => css`
    display: flex;
    flex-direction: column;
  `,
  id: (theme: ITheme) => css`
    color: ${theme.colorDefault};
    margin-bottom: 6px;
    overflow: hidden;
    white-space: nowrap;
    text-overflow: ellipsis;
    max-width: 80%;
  `,
  address: (theme: ITheme) => css`
    color: ${theme.colorLabel};
  `,
};

export const TableBlock: React.FC<Props> = ({ name, id, address }) => (
  <span css={styles.wrapper}>
    <span css={styles.name} className="has-hover-color">
      {name}
    </span>
    <span css={styles.row}>
      {!!id && <span css={styles.id}>{id}</span>}
      <span css={styles.address}>{address}</span>
    </span>
  </span>
);
