import { css } from '@emotion/react';
import { Node } from '@modules/grpc/library/blockjoy/v1/node';
import { ITheme } from 'types/theme';
import { formatters } from '@shared/index';
import { SvgIcon } from '@shared/components';
import IconCalendar from '@public/assets/icons/common/Calendar.svg';

type Props = Partial<Pick<Node, 'createdAt'>>;

export const CreatedAt = ({ createdAt }: Props) => (
  <span css={styles.createdAt}>
    <SvgIcon size="12px">
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
  createdAt: (theme: ITheme) => css`
    color: ${theme.colorLabel};
    font-size: 12px;
    display: flex;
    gap: 5px;

    svg :is(path) {
      fill: ${theme.colorLabel};
    }
  `,
  time: css`
    display: flex;
    flex-flow: row wrap;
    column-gap: 5px;
  `,
};
