import { useMemo, useState } from 'react';
import { SerializedStyles } from '@emotion/react';
import { Dropdown, InputLabel, withSearchDropdown } from '@shared/components';
import { getCountries } from '@shared/utils/getCountries';

export type CountrySelectorProps = {
  name: string;
  value: string;
  onChange: (value: string) => void;
  inputSize?: InputSize;
  label?: string;
  labelStyles?: SerializedStyles[];
  disabled?: boolean;
  tabIndex?: number;
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
  const countries = useMemo(() => getCountries(), []);
  const [isOpen, setIsOpen] = useState(false);
  const handleOpen = (open: boolean = true) => {
    setIsOpen(open);
  };

  const defaultCountry =
    countries.find((country: Country) => country.code === value) ?? null;

  const [selectedCountry, setSelectedCountry] =
    useState<Country | null>(defaultCountry);

  const handleCountryChange = (country: Country | null) => {
    if (country?.code) onChange(country?.code);
    setSelectedCountry(country);
  };

  const CountrySelectDropdown = useMemo(
    () => withSearchDropdown<Country>(Dropdown),
    [],
  );

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

      <CountrySelectDropdown
        items={countries}
        selectedItem={selectedCountry}
        handleSelected={handleCountryChange}
        defaultText={defaultCountry ? defaultCountry?.name : 'Select country'}
        isOpen={isOpen}
        handleOpen={handleOpen}
        size="small"
        buttonType="input"
      />
    </>
  );
};
