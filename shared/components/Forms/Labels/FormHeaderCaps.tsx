import { css } from '@emotion/react';
import { FC, PropsWithChildren } from 'react';
import { ITheme } from 'types/theme';
import Link from 'next/link';

const styles = {
  h3: (theme: ITheme) => css`
    display: flex;
    align-items: center;
    color: ${theme.colorLabel};
    text-transform: uppercase;
    font-size: 11px;
    letter-spacing: 1px;
    margin-bottom: 16px;

    a {
      font-size: 10px;
      margin-top: -2px;
      margin-left: 8px;
      position: relative;
      color: ${theme.colorText};
      opacity: 0.6;
      transition: 0.3s;
    }

    a::after {
      content: '';
      position: absolute;
      left: 0;
      bottom: -1px;
      width: 100%;
      height: 1px;
      background: ${theme.colorText};
    }

    a:hover {
      opacity: 1;
    }
  `,
  h3NoMargin: css`
    margin-bottom: 0;
  `,
};

type Props = {
  noBottomMargin?: boolean;
  viewAllLink?: string;
} & PropsWithChildren;

export const FormHeaderCaps: FC<Props> = ({
  children,
  noBottomMargin,
  viewAllLink,
}) => {
  return (
    <h3 css={[styles.h3, noBottomMargin && styles.h3NoMargin]}>
      {children}
      {viewAllLink && (
        <Link replace={false} href={viewAllLink}>
          VIEW ALL
        </Link>
      )}
    </h3>
  );
};
