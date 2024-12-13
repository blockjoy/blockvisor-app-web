import React, { useRef } from 'react';
import { SortOrder } from '@modules/grpc/library/blockjoy/common/v1/search';
import { useClickOutside } from '@shared/index';
import { SvgIcon, Portal } from '@shared/components';
import { styles } from './TableContextMenu.styles';

type Props = {
  context?: TableContext;
  header?: TableHeader;
  isFirst?: boolean;
  isLast?: boolean;
  sortOrder?: SortOrder;
};

export const TableContextMenu = ({
  context,
  header,
  isFirst,
  isLast,
  sortOrder,
}: Props) => {
  const { onClick, items, position } = context ?? {};

  const dropdownRef = useRef<HTMLDivElement>(null);

  const handleClickOutside = () => {
    onClick?.(null);
  };

  const handleClick = (
    e: React.MouseEvent<HTMLDivElement>,
    callback?: (header?: TableHeader) => void,
  ) => {
    e.stopPropagation();

    callback?.(header);
    handleClickOutside();
  };

  useClickOutside<HTMLDivElement>(dropdownRef, handleClickOutside);

  return (
    <Portal wrapperId="table-context-menu" inContainer>
      <div ref={dropdownRef} css={[styles.wrapper(position)]}>
        {items?.map((item) => {
          const filteredItems = item.items?.filter((itemInner) => {
            if (
              (['move_to_start', 'move_to_left'].includes(itemInner.id ?? '') &&
                isFirst) ||
              (['move_to_right', 'move_to_end'].includes(itemInner.id ?? '') &&
                isLast)
            )
              return false;
            return header?.actions?.includes(itemInner?.id!);
          });

          return (
            <React.Fragment key={item.title}>
              {Boolean(filteredItems.length) && (
                <span css={styles.title}>{item.title}</span>
              )}
              {filteredItems.map((item) => {
                const isActive = sortOrder
                  ? (sortOrder === SortOrder.SORT_ORDER_ASCENDING &&
                      item.id === 'sort_asc') ||
                    (sortOrder === SortOrder.SORT_ORDER_DESCENDING &&
                      item.id === 'sort_desc')
                  : null;

                return (
                  <React.Fragment key={item.id}>
                    {item.id === 'hide' && <div css={styles.spacer}></div>}
                    <div
                      css={styles.item}
                      className={isActive ? 'active' : ''}
                      onClick={(e) => handleClick(e, item.onClick)}
                    >
                      <SvgIcon size="12px">{item.icon}</SvgIcon>
                      <span>{item.title}</span>
                    </div>
                  </React.Fragment>
                );
              })}
            </React.Fragment>
          );
        })}
      </div>
    </Portal>
  );
};
