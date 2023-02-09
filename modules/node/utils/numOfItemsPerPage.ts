import { itemsPerPage } from '../ui/NodeUIHelpers';

export const numOfItemsPerPage = () => {
  let items = 0;

  if (window.innerWidth < 568) {
    items = itemsPerPage['sm'];
  } else if (window.innerWidth > 2000 || window.innerHeight > 1000) {
    items = itemsPerPage['xxl'];
  } else {
    items = itemsPerPage['lg'];
  }

  return items;
};
