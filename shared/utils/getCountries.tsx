import { COUNTRIES } from '@shared/constants/countries';
import { STATES } from '@shared/constants/states';

export const getCountries = (): Country[] => {
  return Object.entries(COUNTRIES)
    .map(([code, name]) => ({
      code,
      name,
    }))
    .sort((a, b) => a.name.localeCompare(b.name));
};

export const getStates = (countryCode?: string): State[] => {
  if (!countryCode) return [];

  const states = STATES[countryCode];
  if (!states) return [];

  return states.map((state: any) => {
    if (typeof state === 'string') {
      return { code: state, name: state };
    } else {
      const [code, name] = Object.entries(state)[0];
      return { code, name };
    }
  });
};
