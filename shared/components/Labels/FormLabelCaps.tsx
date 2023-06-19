import { css } from '@emotion/react';
import { FC, PropsWithChildren } from 'react';
import { ITheme } from 'types/theme';

const styles = {
  h4: (theme: ITheme) => css`
    color: ${theme.colorDefault};
    text-transform: uppercase;
    font-size: 11px;
    letter-spacing: 1px;
    margin-bottom: 16px;
  `,
  h4NoBottomMargin: css`
    margin-bottom: 0;
  `,
};

type Props = {
  noBottomMargin?: boolean;
} & PropsWithChildren;

export const FormLabelCaps: FC<Props> = ({ children, noBottomMargin }) => {
  return (
    <h4 css={[styles.h4, noBottomMargin && styles.h4NoBottomMargin]}>
      {children}
    </h4>
  );
};
