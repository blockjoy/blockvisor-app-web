import { css } from '@emotion/react';
import { FC, PropsWithChildren } from 'react';
import { ITheme } from 'types/theme';

const styles = {
  h3: (theme: ITheme) => css`
    color: ${theme.colorLabel};
    text-transform: uppercase;
    font-size: 11px;
    letter-spacing: 1px;
    margin-bottom: 16px;
  `,
  h3NoMargin: css`
    margin-bottom: 0;
  `,
};

type Props = {
  noBottomMargin?: boolean;
} & PropsWithChildren;

export const NodeViewFormHeader: FC<Props> = ({ children, noBottomMargin }) => {
  return (
    <h3 css={[styles.h3, noBottomMargin && styles.h3NoMargin]}>{children}</h3>
  );
};
