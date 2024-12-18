import { css } from '@emotion/react';
import { Node } from '@modules/grpc/library/blockjoy/v1/node';
import { ITheme } from 'types/theme';
import { formatters } from '@shared/index';
import { SvgIcon } from '@shared/components';
import IconCalendar from '@public/assets/icons/common/Calendar.svg';

type Props = Partial<Pick<Node, 'createdAt'>> & { inGroup?: boolean };

export const CreatedAt = ({ createdAt, inGroup }: Props) => (
  <span css={styles.createdAt(inGroup)}>
    <SvgIcon size={`${inGroup ? 12 : 14}px`}>
      <IconCalendar />
    </SvgIcon>
    {createdAt ? (
      <span css={styles.time}>
        <span>{formatters.formatDate(createdAt)}</span>
        <span>@ {formatters.formatDate(createdAt, 'time')}</span>
      </span>
    ) : (
      <span>-</span>
    )}
  </span>
);

const styles = {
  createdAt: (inGroup?: boolean) => (theme: ITheme) =>
    css`
      display: flex;
      gap: 5px;
      font-size: ${inGroup ? 12 : 14}px;
      ${inGroup && `color: ${theme.colorLabel};`}
      ${!inGroup && `>span:first-child { color: ${theme.colorDefault}; }`}
    `,
  time: css`
    display: flex;
    flex-flow: row wrap;
    column-gap: 5px;
  `,
};
