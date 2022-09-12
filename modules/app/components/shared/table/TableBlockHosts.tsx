import { css } from '@emotion/react';
import { ITheme } from 'types/theme';

type Props = {
  address: string;
  location: string;
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

    @media only screen and (min-width: ${theme.screenSm}) {
      flex-direction: row;
      gap: 0;
    }
  `,
  location: (theme: ITheme) => css`
    color: ${theme.colorDefault};

    @media only screen and (min-width: ${theme.screenSm}) {
      overflow: hidden;
      text-overflow: ellipsis;
      white-space: nowrap;
      max-width: 130px;
    }
  `,
  address: (theme: ITheme) => css`
    color: ${theme.colorLabel};

    @media only screen and (min-width: ${theme.screenSm}) {
      flex-direction: row;
      gap: 0;
    }
  `,
};

export const TableBlockHosts: React.FC<Props> = ({
  name,
  location,
  address,
}) => (
  <span css={styles.wrapper}>
    <span css={styles.name} className="has-hover-color">
      {name}
    </span>
    <span css={styles.row}>
      <span css={styles.location}>{location}</span>
      <span css={styles.address}>{address}</span>
    </span>
  </span>
);
