import { useEffect, useState } from 'react';
import { FiltersWrapper, RangeSlider } from '@shared/components';
import { styles } from './FiltersRange.styles';

type FiltersRangeProps = {
  filter: FilterItem;
  isOpen: boolean;
  onPlusMinusClicked: (filterName: string, args1: boolean) => void;
  onFilterBlockClicked: (name: string) => void;
  customValues?: [number, number];
};

export const FiltersRange = ({
  filter,
  isOpen,
  onPlusMinusClicked,
  onFilterBlockClicked,
  customValues,
}: FiltersRangeProps) => {
  const { id, name, step, min, max, values, setValues, disabled, formatter } =
    filter;

  const [isFiltered, setIsFiltered] = useState(false);

  useEffect(() => {
    if (values?.[0] !== min || values?.[1] !== max) {
      setIsFiltered(true);
    } else {
      if (isFiltered) setIsFiltered(false);
    }
  }, [values]);

  return (
    <FiltersWrapper
      id={id}
      name={name}
      isOpen={isOpen}
      onFilterBlockClicked={onFilterBlockClicked}
      onPlusMinusClicked={onPlusMinusClicked}
      isDisabled={disabled}
    >
      {isOpen ? (
        <RangeSlider
          step={step!}
          min={min!}
          max={max!}
          values={values!}
          setValues={setValues}
          formatter={formatter}
          customValues={customValues}
        />
      ) : isFiltered ? (
        <p css={styles.preview}>
          {`${formatter(values?.[0] ?? 0)} - ${formatter(values?.[1] ?? 0)}`}
        </p>
      ) : null}
    </FiltersWrapper>
  );
};
