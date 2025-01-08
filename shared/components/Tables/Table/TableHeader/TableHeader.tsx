import { PropsWithChildren } from 'react';
import { SerializedStyles } from '@emotion/react';
import { SortOrder } from '@modules/grpc/library/blockjoy/common/v1/search';
import { generateCellStyles, SvgIcon } from '@shared/components';
import { Sort } from '@shared/common/common';
import { ITheme } from 'types/theme';
import { TableContextMenu } from '../TableContextMenu/TableContextMenu';
import { styles } from './TableHeader.styles';
import IconArrowDown from '@public/assets/icons/common/ArrowDown.svg';
import IconSort from '@public/assets/icons/common/Sort.svg';

type Props = {
  header: TableHeader;
  index?: number;
  sort?: Sort<any>;
  resize?: TableResize;
  drag?: TableDrag;
  context?: TableContext;
  isFirst?: boolean;
  isLast?: boolean;
  additionalStyles?: ((theme: ITheme) => SerializedStyles)[];
  handleRef?: (el: HTMLTableCellElement | null) => void;
  handleSort?: (key: any) => void;
} & PropsWithChildren;

export const TableHeader = ({
  children,
  header,
  index,
  resize,
  drag,
  context,
  sort,
  handleSort,
  additionalStyles,
  isFirst,
  isLast,
  handleRef,
}: Props) => {
  const { isHiddenOnMobile, dataField } = header;

  const isSortable = handleSort && dataField;

  const isActive = sort?.field === dataField;
  const isAscending = sort?.order === SortOrder.SORT_ORDER_ASCENDING;

  const { isResizing, isResizable, resizeIndex, onResize } = resize ?? {};

  const {
    isDraggable,
    draggingIndex,
    targetIndex,
    deltaX,
    itemShiftsX,
    onDrag,
  } = drag ?? {};

  const cellStyles = generateCellStyles(
    'th',
    isResizing,
    header,
    {
      col: index,
      drag: draggingIndex,
      resize: resizeIndex,
      target: targetIndex,
    },
    deltaX,
  );

  const handleResize = (
    e: React.MouseEvent<HTMLTableCellElement, MouseEvent>,
  ) => {
    e.stopPropagation();
    onResize?.(e, index!);
  };

  const handleDrag = (
    e: React.MouseEvent<HTMLTableCellElement, MouseEvent>,
  ) => {
    onDrag?.(e, index!);
  };

  const handleClick = (e: React.MouseEvent<HTMLDivElement>) => {
    e.stopPropagation();

    if (context?.onClick) {
      if (isResizing) return;

      context?.onClick?.(header.key === context.key ? null : header.key, index);

      return;
    }

    if (handleSort) {
      handleSort(header.key);

      return;
    }
  };

  const headerClasses = [];
  if (isHiddenOnMobile) headerClasses.push('hidden-on-mobile');
  if (header.key === context?.key) headerClasses.push('active');

  return (
    <th
      ref={handleRef}
      className={headerClasses.join(' ')}
      css={[
        styles.header,
        Boolean(additionalStyles) && additionalStyles,
        Boolean(cellStyles) && cellStyles,
      ]}
      {...(draggingIndex !== null && {
        style: {
          transform: `translateX(${itemShiftsX?.[index!]}px)`,
        },
      })}
      {...(isDraggable && {
        onMouseDown: handleDrag,
      })}
    >
      <div css={styles.headerWrapper} onClick={handleClick}>
        <span css={[styles.text(!!isSortable, Boolean(context))]}>
          {children}
        </span>
        {isSortable && (
          <button
            onClick={(e) => {
              e.stopPropagation();
              handleSort(dataField || '');
            }}
            css={[
              styles.button(Boolean(context)),
              isActive && styles.buttonActive,
            ]}
            className="table-sort"
          >
            <SvgIcon size="10px" additionalStyles={[styles.icon(isAscending)]}>
              {isActive ? <IconArrowDown /> : <IconSort />}
            </SvgIcon>
          </button>
        )}
        {isResizable && (
          <div
            className="table-resize"
            css={styles.resizer}
            onMouseDown={handleResize}
          ></div>
        )}
      </div>
      {header.key === context?.key && (
        <TableContextMenu
          context={context}
          header={header}
          isFirst={isFirst}
          isLast={isLast}
          {...(isActive && {
            sortOrder: sort?.order,
          })}
        />
      )}
    </th>
  );
};
