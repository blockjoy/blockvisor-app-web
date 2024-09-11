import { RefObject, useEffect, useState } from 'react';
import { viewportBreakpoints } from '@shared/constants/viewport';

const ITEM_HEIGHT = 120;
const WRAPPER_OFFSET = 120;
const MIN_ROWS_PER_PAGE = 4;

const calculateRowsPerPage = (wrapperHeight: number) => {
  const rowsPerPage = Math.ceil((wrapperHeight - WRAPPER_OFFSET) / ITEM_HEIGHT);

  return rowsPerPage > MIN_ROWS_PER_PAGE ? rowsPerPage + 1 : MIN_ROWS_PER_PAGE;
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
        perPage = calculateRowsPerPage(wrapperHeight) * (isSidebarOpen ? 2 : 3);
        break;
      case width < viewportBreakpoints.xHuge:
        perPage = calculateRowsPerPage(wrapperHeight) * 3;
        break;
      default:
        perPage = calculateRowsPerPage(wrapperHeight) * (isSidebarOpen ? 3 : 4);
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
