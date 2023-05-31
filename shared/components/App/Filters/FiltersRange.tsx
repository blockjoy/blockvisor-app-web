import { FiltersWrapper, RangeSlider } from '@shared/components';
import { SetterOrUpdater } from 'recoil';
import { styles } from './FiltersRange.styles';

type FiltersRangeProps = {
  name: string;
  label?: string;
  isDisabled?: boolean;
  step: number;
  min: number;
  max: number;
  values: [number, number];
  setValues: SetterOrUpdater<[number, number]>;
  isOpen: boolean;
  onPlusMinusClicked: (filterName: string, args1: boolean) => void;
  onFilterBlockClicked: (name: string) => void;
  onStateChange: VoidFunction;
};

export const FiltersRange = ({
  name,
  label,
  isDisabled = false,
  step,
  min,
  max,
  values,
  setValues,
  isOpen,
  onPlusMinusClicked,
  onFilterBlockClicked,
  onStateChange,
}: FiltersRangeProps) => {
  return (
    <FiltersWrapper
      name={name}
      isOpen={isOpen}
      onFilterBlockClicked={onFilterBlockClicked}
      onPlusMinusClicked={onPlusMinusClicked}
      isDisabled={isDisabled}
    >
      {isOpen ? (
        <RangeSlider
          step={step}
          min={min}
          max={max}
          values={values}
          setValues={setValues}
          label={label}
          onStateChange={onStateChange}
        />
      ) : (
        <p css={styles.preview}>{`${values[0]}${label ?? ''} - ${values[1]}${
          label ?? ''
        }`}</p>
      )}
    </FiltersWrapper>
  );
};
