import { FC, ReactNode } from 'react';
import { TableSortButton } from '../shared';

type Props = {
  children: ReactNode;
  nodesSortExpression: string;
  handleSort: (args1: string) => void;
};

export const NodesSortButton: FC<Props> = ({
  children,
  nodesSortExpression,
  handleSort,
}) => (
  <TableSortButton
    activeSortExpression={nodesSortExpression}
    sortExpression={children?.toString() || ''}
    onClick={() => handleSort(children?.toString() || '')}
  >
    {children}
  </TableSortButton>
);
