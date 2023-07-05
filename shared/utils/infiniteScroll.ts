import { isMobile, isTablet } from 'react-device-detect';

export const itemsPerPage = {
  sm: 18,
  lg: 36,
  xxl: 48,
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
