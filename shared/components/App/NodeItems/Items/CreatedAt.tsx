import { css } from '@emotion/react';
import { Node } from '@modules/grpc/library/blockjoy/v1/node';
import { ITheme } from 'types/theme';
import { SvgIcon, DateTime } from '@shared/components';
import IconCalendar from '@public/assets/icons/common/Calendar.svg';

type Props = Partial<Pick<Node, 'createdAt'>>;

export const CreatedAt = ({ createdAt }: Props) => (
  <span css={styles.createdAt}>
    <SvgIcon size="12px">
      <IconCalendar />
    </SvgIcon>
    {createdAt ? <DateTime date={createdAt} /> : <span>-</span>}
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
};
