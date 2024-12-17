import { useRef } from 'react';
import { SerializedStyles } from '@emotion/react';
import { ITheme } from 'types/theme';
import { useDraggableList } from '@shared/index';
import { SvgIcon } from '@shared/components';
import { getItemStyle } from './utils/getItemStyle';
import { styles } from './DraggableList.styles';
import IconDrag from '@public/assets/icons/common/Drag.svg';

type Props<T> = {
  items: T[];
  onChange: (movingIndex?: number, targetIndex?: number) => void;
  renderItem?: (item: T, isActiveItem?: boolean) => React.ReactNode;
  additionalyStyles?:
    | SerializedStyles[]
    | ((theme: ITheme) => SerializedStyles);
};

export const DraggableList = <T extends { key: string }, I>({
  items,
  onChange,
  renderItem,
  additionalyStyles,
}: Props<T>) => {
  const itemRefs = useRef<(HTMLLIElement | null)[]>([]);

  const {
    currentItems,
    isDragging,
    draggingIndex,
    handleMouseDown,
    willEndDragging,
    itemShiftsY,
  } = useDraggableList(items, onChange, itemRefs);

  const draggableItems =
    !isDragging && items.length !== currentItems.length ? items : currentItems;

  return (
    <ul {...(additionalyStyles ? { css: additionalyStyles } : null)}>
      {draggableItems?.map((item, index) => {
        const isDragged =
          (isDragging || willEndDragging) && index === draggingIndex;

        return (
          <li
            key={item.key}
            ref={(el) => (itemRefs.current[index] = el)}
            onMouseDown={(e) => handleMouseDown(e, index)}
            onTouchStart={(e) => handleMouseDown(e, index)}
            style={
              isDragging || willEndDragging
                ? getItemStyle(
                    index === draggingIndex,
                    willEndDragging,
                    itemShiftsY[index],
                  )
                : { transform: 'none' }
            }
            css={styles.li(isDragged, isDragging || willEndDragging)}
          >
            <SvgIcon size="16px" additionalStyles={styles.moveHandle}>
              <IconDrag />
            </SvgIcon>
            {renderItem?.(item)}
          </li>
        );
      })}
    </ul>
  );
};
