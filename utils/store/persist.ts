import { AtomEffect, DefaultValue } from 'recoil';

export const localStorageEffect = <T>(
  key: string,
  defaultValue?: T,
): AtomEffect<T> => {
  return ({ setSelf, onSet }) => {
    const savedValue = localStorage.getItem(key);
    if (savedValue !== null) {
      setSelf(JSON.parse(savedValue));
    }
    if (defaultValue) setSelf(defaultValue);

    onSet((newValue) => {
      if (newValue instanceof DefaultValue) {
        localStorage.removeItem(key);
      } else {
        localStorage.setItem(key, JSON.stringify(newValue));
      }
    });
  };
};
