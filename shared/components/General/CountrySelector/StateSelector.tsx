import { useMemo, useState } from 'react';
import { SerializedStyles } from '@emotion/react';
import { Dropdown, InputLabel, withSearchDropdown } from '@shared/components';
import { getStates } from '@shared/utils/getCountries';

export type StateSelectorProps = {
  name: string;
  value: string;
  onChange: (value: string) => void;
  inputSize?: InputSize;
  label?: string;
  labelStyles?: SerializedStyles[];
  disabled?: boolean;
  tabIndex?: number;
  country?: string;
};

export const StateSelector = ({
  name,
  value,
  inputSize,
  label,
  labelStyles,
  disabled,
  onChange,
  country,
}: StateSelectorProps) => {
  const states = useMemo(() => getStates(country), [country]);

  const [isOpen, setIsOpen] = useState(false);
  const handleOpen = (open: boolean = true) => {
    setIsOpen(open);
  };

  const defaultState =
    states.find((state: State) => state.code === value) ?? null;

  const [selectedState, setSelectedState] =
    useState<State | null>(defaultState);

  const handleStateChange = (state: State | null) => {
    if (state?.code) onChange(state?.code);
    setSelectedState(state);
  };

  const StateSelectDropdown = useMemo(
    () => withSearchDropdown<State>(Dropdown),
    [states],
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

      <StateSelectDropdown
        items={states}
        selectedItem={selectedState}
        handleSelected={handleStateChange}
        defaultText={defaultState ? defaultState?.name : 'Select state'}
        isOpen={isOpen}
        handleOpen={handleOpen}
        size="small"
        buttonType="input"
      />
    </>
  );
};
