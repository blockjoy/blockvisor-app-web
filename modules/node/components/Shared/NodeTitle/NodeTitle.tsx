import { css } from '@emotion/react';
import { SvgIcon } from '@shared/components';
import { ITheme } from 'types/theme';
import { ReactNode } from 'react';
import IconNodes from '@public/assets/icons/box-12.svg';

const styles = {
  wrapper: (theme: ITheme) => css`
    display: flex;
    align-items: center;
    gap: 11px;
    font-size: 18px;
    color: ${theme.colorText};

    svg > path {
      fill: ${theme.colorLabel};
    }
  `,
};

type Props = {
  icon?: ReactNode;
  titleText?: string;
};

export const NodeTitle = ({
  icon = <IconNodes />,
  titleText = 'Nodes',
}: Props) => {
  return (
    <span css={styles.wrapper}>
      <SvgIcon size="18px">{icon}</SvgIcon>
      <p>{titleText}</p>
    </span>
  );
};
