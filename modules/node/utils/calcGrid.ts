import { viewportBreakpoints } from '@shared/constants/viewport';
import {
  BLOCKCHAIN_CARD_HEIGHT,
  MIN_BLOCKCHAIN_ROWS_PER_PAGE,
  NUM_OF_BLOCKCHAIN_COLUMNS,
} from '@modules/node';

export const calculateRowsPerPage = (wrapperHeight: number) => {
  const rowsPerPage = Math.ceil(wrapperHeight / BLOCKCHAIN_CARD_HEIGHT);

  return rowsPerPage > MIN_BLOCKCHAIN_ROWS_PER_PAGE
    ? rowsPerPage
    : MIN_BLOCKCHAIN_ROWS_PER_PAGE;
};

export const calculateColumnsPerPage = (isSidebarOpen: boolean): number => {
  const viewportWidth = window.innerWidth;

  if (viewportWidth >= viewportBreakpoints.xHuge)
    return isSidebarOpen
      ? NUM_OF_BLOCKCHAIN_COLUMNS['xHugeSidebar']
      : NUM_OF_BLOCKCHAIN_COLUMNS['xHuge'];
  else if (viewportWidth >= viewportBreakpoints.huge)
    return NUM_OF_BLOCKCHAIN_COLUMNS['huge'];
  else if (viewportWidth >= viewportBreakpoints.xLrg)
    return isSidebarOpen
      ? NUM_OF_BLOCKCHAIN_COLUMNS['xLrgSidebar']
      : NUM_OF_BLOCKCHAIN_COLUMNS['xLrg'];
  else if (viewportWidth >= viewportBreakpoints.lrg)
    return NUM_OF_BLOCKCHAIN_COLUMNS['lrg'];
  else if (viewportWidth >= viewportBreakpoints.med)
    return NUM_OF_BLOCKCHAIN_COLUMNS['med'];
  else if (viewportWidth >= viewportBreakpoints.sml)
    return NUM_OF_BLOCKCHAIN_COLUMNS['sml'];
  else if (viewportWidth >= viewportBreakpoints.tny)
    return NUM_OF_BLOCKCHAIN_COLUMNS['tny'];
  else return NUM_OF_BLOCKCHAIN_COLUMNS['min'];
};
