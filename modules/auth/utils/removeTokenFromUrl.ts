import { delay } from '@shared/utils/delay';

export const removeTokenFromUrl = async () => {
  try {
    await delay(500);
    const { location, history } = window;
    const { search } = location;
    const cleanSearch = '';
    const cleanURL = location.toString().replace(search, cleanSearch);
    history.replaceState({}, '', cleanURL);
  } catch (err) {
    console.log('removeTokenFromUrl Error', err);
  }
};
