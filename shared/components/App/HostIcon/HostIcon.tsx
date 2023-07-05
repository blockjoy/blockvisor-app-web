import { css } from '@emotion/react';
import IconHost from '@public/assets/icons/app/Host.svg';
import { SvgIcon } from '@shared/components';
import { ITheme } from 'types/theme';

type Props = {
  status?: number;
  size?: string;
};

const styles = {
  icon: (theme: ITheme) => css`
    display: inline-block;
    padding: 12px;
    border-radius: 50%;
    background: ${theme.colorLightGrey};
  `,
};

export const HostIcon = ({ status = 1, size = '14px' }: Props) => (
  <span css={[styles.icon]}>
    <SvgIcon size={size} isDefaultColor>
      <IconHost />
    </SvgIcon>
  </span>
);
