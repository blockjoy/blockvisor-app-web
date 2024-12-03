import { useState } from 'react';

export const useTableContext = (
  headersRef: React.MutableRefObject<(HTMLTableCellElement | null)[]>,
  wrapperRef?: React.RefObject<HTMLDivElement | null>,
) => {
  const [context, setContext] = useState<string | null>(null);
  const [position, setPosition] = useState<TableContextPosition>({
    top: 0,
    left: 0,
  });

  const handleMouseDown = (key: string | null, index?: number) => {
    setContext(key);

    if (index !== undefined) {
      const header = headersRef.current[index];

      const wrapperRect = wrapperRef?.current?.getBoundingClientRect();
      const headerRect = header?.getBoundingClientRect();

      if (headerRect && wrapperRect) {
        const position = getPosition(headerRect, wrapperRect);

        setPosition(position);
      }
    }
  };

  return {
    context,
    position,

    handleMouseDown,
  };
};

const getPosition = (
  headerRect: DOMRect,
  wrapperRect: DOMRect,
): TableContextPosition => {
  const menuWidth = 200;

  const top = window.scrollY + headerRect?.top + 36;

  let left = headerRect?.left;

  const shoudlAlignToRight =
    headerRect?.right + menuWidth - headerRect?.width > wrapperRect?.right;

  if (shoudlAlignToRight) left += headerRect?.width - menuWidth;

  if (left + menuWidth > wrapperRect?.right)
    left = wrapperRect?.right - menuWidth;

  return { top, left };
};
