import { RefObject, useEffect, useState } from 'react';
import { calculateRowsPerPage, calculateColumnsPerPage } from '@modules/node';

export const useProtocolGrid = (
  isSidebarOpen: boolean,
  wrapperRef?: RefObject<HTMLDivElement>,
) => {
  let perPage = 0;

  const [itemsPerPage, setItemsPerPage] = useState(perPage);

  const calculateItemsToDisplay = () => {
    const wrapper = wrapperRef?.current;
    if (!wrapper) return;

    const numOfRows = calculateRowsPerPage(wrapper.clientHeight);
    const numOfColumns = calculateColumnsPerPage(isSidebarOpen);

    setItemsPerPage(numOfRows * numOfColumns);
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
