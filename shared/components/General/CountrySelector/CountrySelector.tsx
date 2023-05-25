const countryList = require('country-list');

import { useState } from 'react';

import { Scrollbar } from '../Scrollbar/Scrollbar';
import { styles } from './CountrySelector.styles';

import { SerializedStyles } from '@emotion/react';
import {
  DropdownButton,
  DropdownItem,
  DropdownMenu,
  DropdownWrapper,
  InputLabel,
} from '@shared/components';

const COUNTRIES = countryList.getCodeList();

export type CountrySelectorProps = {
  name: string;
  value: string;
  inputSize?: InputSize;
  label?: string;
  labelStyles?: SerializedStyles[];
  disabled?: boolean;
  onChange: (value: string) => void;
};

export const CountrySelector = ({
  name,
  value,
  inputSize,
  label,
  labelStyles,
  disabled,
  onChange,
}: CountrySelectorProps) => {
  const [isOpen, setIsOpen] = useState<boolean>(false);

  const defaultCountry = COUNTRIES[value?.toLocaleLowerCase()] ?? null;
  const [activeCountryName, setActiveCountryName] =
    useState<string | null>(defaultCountry);

  const handleClose = () => setIsOpen(!isOpen);

  const handleChange = (country: any) => {
    const [[countryKey, countryValue]]: string[][] = Object.entries(country);

    onChange(countryKey.toUpperCase());
    setActiveCountryName(countryValue);
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
              {Object.keys(COUNTRIES)?.map((countryKey: string) => {
                const countryName = COUNTRIES[countryKey];

                return (
                  <li key={countryKey}>
                    <DropdownItem
                      size="medium"
                      type="button"
                      onButtonClick={() =>
                        handleChange({ [countryKey]: countryName })
                      }
                    >
                      <p css={styles.activeOrg}>{countryName}</p>
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
