import { AtomEffect, DefaultValue } from 'recoil';

const getExistingData = (key: string): any => {
  const data = localStorage.getItem(key);
  return data ? JSON.parse(data) : {};
};

export const localStorageEffect: <T>(key: string) => AtomEffect<T> =
  (key: string) =>
  ({ setSelf, onSet }) => {
    const savedValue = localStorage.getItem(key);
    if (savedValue != null) {
      setSelf(JSON.parse(savedValue));
    }

    onSet((newValue) => {
      if (newValue instanceof DefaultValue) {
        localStorage.removeItem(key);
      } else {
        localStorage.setItem(key, JSON.stringify(newValue));
      }
    });
  };

// export const localStorageEffectNested: <T>(key: string) => AtomEffect<T> =
//   (key: string) =>
//   ({ setSelf, onSet }) => {
//     const [mainKey, subKey] = key.split('.');

//     const savedValue = getExistingData(mainKey);
//     if (savedValue[subKey]) {
//       setSelf(savedValue[subKey]);
//     }

//     onSet((newValue) => {
//       const existingData = getExistingData(mainKey);

//       if (newValue instanceof DefaultValue) {
//         delete existingData[subKey];
//       } else {
//         existingData[subKey] = newValue;
//       }

//       localStorage.setItem(mainKey, JSON.stringify(existingData));
//     });
//   };
