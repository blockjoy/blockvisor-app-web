import { isMobile, isTablet } from 'react-device-detect';

export type ItemsPerPage = {
  sm: number;
  lg: number;
  xl: number;
  xxl: number;
};

export const itemsPerPage: ItemsPerPage = {
  sm: 18,
  lg: 36,
  xl: 48,
  xxl: 100,
};

export const numOfItemsPerPage = () => {
  let items = 0;

  if (isMobile) {
    items = itemsPerPage['sm'];
  } else if (isTablet) {
    items = itemsPerPage['lg'];
  } else {
    items = itemsPerPage['xxl'];
  }

  return items;
};
