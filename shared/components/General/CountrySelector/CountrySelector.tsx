import { useState } from 'react';
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

  const defaultCountry =
    COUNTRIES.find((country: Country) => country.code === value) ?? null;

  const [activeCountryName, setActiveCountryName] = useState<string | null>(
    defaultCountry?.name!,
  );

  const handleClose = () => setIsOpen(!isOpen);

  const handleChange = (e: any, country: Country) => {
    e.preventDefault();
    onChange(country.code);
    setActiveCountryName(country.name);
    handleClose();
  };

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
          text={<p>{value ? activeCountryName : 'Select country'}</p>}
          onClick={handleClose}
          isOpen={isOpen}
        />

        <DropdownMenu isOpen={isOpen} additionalStyles={styles.dropdown}>
          <Scrollbar additionalStyles={[styles.dropdownInner]}>
            <ul>
              {COUNTRIES.map((country: Country) => {
                return (
                  <li key={country.name}>
                    <DropdownItem
                      size="medium"
                      type="button"
                      onButtonClick={(e) => handleChange(e, country)}
                    >
                      <p css={styles.activeOrg}>{country.name}</p>
                    </DropdownItem>
                  </li>
                );
              })}
            </ul>
          </Scrollbar>
        </DropdownMenu>
      </DropdownWrapper>
    </>
  );
};
