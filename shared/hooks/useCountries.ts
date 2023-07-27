import { useMemo } from 'react';
import countries from 'i18n-iso-countries';
import english from 'i18n-iso-countries/langs/en.json';

export interface Country {
  code: string;
  name: string;
}

countries.registerLocale(english);

export const useCountries = () => {
  const countryNames = useMemo(() => {
    return Object.entries(countries.getNames('en', { select: 'official' }))
      .sort((a, b) => a[1].localeCompare(b[1]))
      .map(([code, name]) => ({ code, name }));
  }, []);

  return countryNames;
};
