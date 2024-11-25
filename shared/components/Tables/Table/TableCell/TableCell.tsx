import { PropsWithChildren } from 'react';
import { SerializedStyles } from '@emotion/react';
import { generateCellStyles } from '@shared/components';
import { ITheme } from 'types/theme';
import { styles } from './TableCell.styles';

type Props = {
  cell: TableHeader;
  index?: number;
  verticalAlign?: 'top' | 'middle';
  resize?: TableResize;
  drag?: TableDrag;
  additionalStyles?: ((theme: ITheme) => SerializedStyles)[];
} & PropsWithChildren;

export const TableCell = ({
  children,
  cell,
  index,
  verticalAlign,
  resize,
  drag,
}: Props) => {
  const { isHiddenOnMobile, textAlign } = cell;

  const { isResizing, resizeIndex } = resize ?? {};
  const { draggingIndex, targetIndex, deltaX, itemShiftsX } = drag ?? {};

  const cellStyles = generateCellStyles(
    'td',
    isResizing,
    cell,
    {
      col: index,
      drag: draggingIndex,
      resize: resizeIndex,
      target: targetIndex,
    },
    deltaX,
  );

  return (
    <td
      css={[
        styles.cell,
        isHiddenOnMobile && styles.hiddenOnMobile,
        verticalAlign ? styles[verticalAlign] : styles.middle,
        styles.textAlign(textAlign || 'left'),
        cellStyles,
      ]}
      {...(draggingIndex !== null && {
        style: {
          transform: `translateX(${itemShiftsX?.[index!]}px)`,
        },
      })}
    >
      {children}
    </td>
  );
};
