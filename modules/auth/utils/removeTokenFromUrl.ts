import { delay } from '@shared/utils/delay';

export const removeTokenFromUrl = async () => {
  await delay(500);
  const { location, history } = window;
  const { search, href } = location;
  const cleanSearch = '';
  const cleanURL = href.replace(search, cleanSearch);
  history.replaceState({}, '', cleanURL);
};
