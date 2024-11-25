import { css } from '@emotion/react';
import { ITheme } from 'types/theme';

type Props = {
  middleRow?: string | React.ReactNode;
  bottomRow?: string | React.ReactNode;
  topRow?: string | React.ReactNode;
};

const styles = {
  wrapper: css`
    display: block;
  `,
  topRow: (isOverflow?: boolean) => (theme: ITheme) =>
    css`
      display: block;
      color: ${theme.colorText};
      ${isOverflow &&
      `overflow: hidden;
        text-overflow: ellipsis;
        white-space: nowrap;
      `}
      max-width: 100%;
    `,
  row: css`
    display: flex;
    flex-direction: column;
  `,
  middleRow: (theme: ITheme) => css`
    color: ${theme.colorDefault};
    margin-bottom: 6px;
    overflow: hidden;
    white-space: nowrap;
    text-overflow: ellipsis;
    max-width: 80%;
  `,
  bottomRow: (theme: ITheme) => css`
    color: ${theme.colorLabel};

    svg :is(path) {
      fill: ${theme.colorLabel};
    }
  `,
};

export const TableBlock = ({
  topRow,
  middleRow,
  bottomRow,
  isOverflow = true,
}: Props) => (
  <span css={styles.wrapper}>
    {topRow && (
      <span css={styles.topRow} className="has-hover-color">
        {topRow}
      </span>
    )}
    <span css={styles.row}>
      {!!middleRow && <span css={styles.middleRow}>{middleRow}</span>}
      {!!bottomRow && <span css={styles.bottomRow}>{bottomRow}</span>}
    </span>
  </span>
);
