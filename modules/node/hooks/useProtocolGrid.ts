import { RefObject, useEffect, useState } from 'react';
import { viewportBreakpoints } from '@shared/constants/viewport';

const ITEM_HEIGHT = 120;
const WRAPPER_OFFSET = 120;
const MIN_ITEMS_PER_COLUMN = 3;

const calculateItemsPerColumn = (wrapperHeight: number) => {
  const itemsPerColumn = Math.floor(
    (wrapperHeight - WRAPPER_OFFSET) / ITEM_HEIGHT,
  );

  return itemsPerColumn > MIN_ITEMS_PER_COLUMN
    ? itemsPerColumn + 2
    : MIN_ITEMS_PER_COLUMN;
};

export const useProtocolGrid = (
  isSidebarOpen: boolean,
  wrapperRef?: RefObject<HTMLDivElement>,
) => {
  let perPage = 0;

  const [itemsPerPage, setItemsPerPage] = useState(perPage);

  const calculateItemsToDisplay = () => {
    const wrapper = wrapperRef?.current;
    if (!wrapper) return;

    const width = window.innerWidth;
    const wrapperHeight = wrapper.clientHeight;

    switch (true) {
      case width < viewportBreakpoints.tny:
        perPage = 12;
        break;
      case width < viewportBreakpoints.sml:
        perPage = 15;
        break;
      case width < viewportBreakpoints.med:
        perPage = 20;
        break;
      case width < viewportBreakpoints.lrg:
        perPage = 25;
        break;
      case width < viewportBreakpoints.xLrg:
        perPage = 30;
        break;
      case width < viewportBreakpoints.huge:
        perPage =
          calculateItemsPerColumn(wrapperHeight) * (isSidebarOpen ? 2 : 3);
        break;
      case width < viewportBreakpoints.xHuge:
        perPage = calculateItemsPerColumn(wrapperHeight) * 3;
        break;
      default:
        perPage =
          calculateItemsPerColumn(wrapperHeight) * (isSidebarOpen ? 3 : 4);
    }

    setItemsPerPage(perPage);
  };

  useEffect(() => {
    calculateItemsToDisplay();

    window.addEventListener('resize', calculateItemsToDisplay);

    return () => {
      window.removeEventListener('resize', calculateItemsToDisplay);
    };
  }, [isSidebarOpen, wrapperRef]);

  return {
    itemsPerPage,
  };
};
