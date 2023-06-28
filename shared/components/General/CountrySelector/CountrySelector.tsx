import { useEffect, useRef, useState } from 'react';
import countryList, { Country } from 'country-list';
import { SerializedStyles } from '@emotion/react';
import { styles } from './CountrySelector.styles';
import {
  DropdownButton,
  DropdownItem,
  DropdownMenu,
  DropdownWrapper,
  InputLabel,
  Scrollbar,
} from '@shared/components';
import { CountrySearch } from './CountrySearch/CountrySearch';

const COUNTRIES = countryList
  .getData()
  .sort((a: Country, b: Country) => a.name.localeCompare(b.name));

export type CountrySelectorProps = {
  name: string;
  value: string;
  onChange: (value: string) => void;
  inputSize?: InputSize;
  label?: string;
  labelStyles?: SerializedStyles[];
  disabled?: boolean;
};

export const CountrySelector = ({
  name,
  value,
  onChange,
  inputSize,
  label,
  labelStyles,
  disabled,
}: CountrySelectorProps) => {
  const [isOpen, setIsOpen] = useState<boolean>(false);
  const countrySearchRef = useRef<HTMLInputElement>(null);

  const defaultCountry =
    COUNTRIES.find((country: Country) => country.code === value) ?? null;

  const [filteredCountries, setFilteredCountries] =
    useState<Country[]>(COUNTRIES);

  const [activeCountryName, setActiveCountryName] = useState<string | null>(
    defaultCountry?.name!,
  );

  const toggleDropdown = () => setIsOpen(!isOpen);

  const handleChange = (e: any, country: Country) => {
    e.preventDefault();
    onChange(country.code);
    setActiveCountryName(country.name);
    toggleDropdown();
  };

  const handleCountrySearch = (e: any) => {
    const searchValue = e.target.value.trim();
    const listOfFilteredCountries = COUNTRIES.filter((country: Country) =>
      country.name.toLowerCase().includes(searchValue.toLowerCase()),
    );

    setFilteredCountries(listOfFilteredCountries);
  };

  useEffect(() => {
    setTimeout(() => {
      if (isOpen && countrySearchRef.current) {
        countrySearchRef?.current?.focus();
      }
    }, 100);
  }, [isOpen]);

  return (
    <>
      {label && (
        <InputLabel
          css={[labelStyles]}
          labelSize={inputSize}
          name={name}
          disabled={disabled}
        >
          {label}
        </InputLabel>
      )}

      <DropdownWrapper
        isEmpty={false}
        isOpen={isOpen}
        onClose={() => setIsOpen(false)}
      >
        <DropdownButton
          text={
            <p css={!value ? styles.placeholder : ''}>
              {value ? activeCountryName : 'Select country'}
            </p>
          }
          onClick={toggleDropdown}
          isOpen={isOpen}
          type="input"
        />

        <DropdownMenu isOpen={isOpen} additionalStyles={styles.dropdown}>
          <CountrySearch
            ref={countrySearchRef}
            handleChange={handleCountrySearch}
          />
          <Scrollbar additionalStyles={[styles.dropdownInner]}>
            <ul>
              {filteredCountries.length ? (
                filteredCountries.map((country: Country) => {
                  return (
                    <li key={country.name}>
                      <DropdownItem
                        size="medium"
                        type="button"
                        onButtonClick={(e) => handleChange(e, country)}
                      >
                        <p css={styles.active}>{country.name}</p>
                      </DropdownItem>
                    </li>
                  );
                })
              ) : (
                <p css={styles.noResults}>No results found</p>
              )}
            </ul>
          </Scrollbar>
        </DropdownMenu>
      </DropdownWrapper>
    </>
  );
};
