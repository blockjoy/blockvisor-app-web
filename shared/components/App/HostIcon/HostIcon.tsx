import { css } from '@emotion/react';
import IconHost from '@public/assets/icons/app/Host.svg';
import { SvgIcon } from '@shared/components';
import { ITheme } from 'types/theme';
import { getHostStatusInfo, getHostStatusColor } from '@shared/components';

type Props = {
  status: number;
  size?: string;
};

const styles = {
  icon: (theme: ITheme) => css`
    display: inline-block;
    padding: 12px;
    border-radius: 50%;
    background: ${theme.colorLightGrey};

    path {
      fill: ${theme.colorLabel};
    }
  `,
};

export const HostIcon = ({ status, size = '14px' }: Props) => (
  <span
    css={[styles.icon, getHostStatusColor(getHostStatusInfo(status)?.name!)]}
  >
    <SvgIcon size={size}>
      <IconHost />
    </SvgIcon>
  </span>
);
