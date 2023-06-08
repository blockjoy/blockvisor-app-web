import { FiltersWrapper, RangeSlider } from '@shared/components';
import { useEffect, useState } from 'react';
import { SetterOrUpdater } from 'recoil';
import { styles } from './FiltersRange.styles';

type FiltersRangeProps = {
  name: string;
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
  formatter: (val: number) => void;
  customValues?: [number, number];
};

export const FiltersRange = ({
  name,
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
  formatter,
  customValues,
}: FiltersRangeProps) => {
  const [isFiltered, setIsFiltered] = useState(false);

  useEffect(() => {
    if (values[0] !== min || values[1] !== max) {
      setIsFiltered(true);
    } else {
      if (isFiltered) setIsFiltered(false);
    }
  }, [values]);

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
          onStateChange={onStateChange}
          formatter={formatter}
          customValues={customValues}
        />
      ) : isFiltered ? (
        <p css={styles.preview}>
          {`${formatter(values[0])} - ${formatter(values[1])}`}
        </p>
      ) : null}
    </FiltersWrapper>
  );
};
