import { Node } from '@modules/grpc/library/blockjoy/v1/node';
import { formatters } from '@shared/index';
import { display } from 'styles/utils.display.styles';

type Props = Partial<Pick<Node, 'cost'>>;

export const Cost = ({ cost }: Props) => (
  <span css={display.ellipsis}>
    {cost?.amount?.amountMinorUnits
      ? formatters.formatCurrency(cost?.amount?.amountMinorUnits!)
      : '-'}
  </span>
);
