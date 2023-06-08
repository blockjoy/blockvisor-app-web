import { useState } from 'react';
import { Range, getTrackBackground } from 'react-range';
import { SetterOrUpdater } from 'recoil';
import { themeDefault } from 'themes';
import { styles } from './RangeSlider.styles';

type RangeSliderProps = {
  step: number;
  min: number;
  max: number;
  values: [number, number];
  customValues?: [number, number];
  setValues: SetterOrUpdater<[number, number]>;
  onStateChange: VoidFunction;
  formatter: (value: number) => void;
};

export const RangeSlider = ({
  step,
  min,
  max,
  values,
  customValues,
  setValues,
  onStateChange,
  formatter,
}: RangeSliderProps) => {
  const innerValuesDefaultFirst: number =
    customValues?.findIndex(
      (customValue: number) => customValue === values[0],
    ) ?? values[0];
  const innerValuesDefaultLast: number =
    customValues?.findIndex(
      (customValue: number) => customValue === values[1],
    ) ?? values[1];

  const innerValuesDefault: [number, number] = customValues
    ? [innerValuesDefaultFirst, innerValuesDefaultLast]
    : values;
  const [innerValues, setInnerValues] =
    useState<[number, number]>(innerValuesDefault);

  const innerMin = customValues ? 0 : min;
  const innerMax = customValues ? customValues.length - 1 : max;
  const innerStep = customValues ? 1 : step;

  const handleChange = (values: number[]) => {
    setInnerValues(values as [number, number]);
    if (customValues)
      setValues([customValues[values[0]], customValues[values[1]]]);
    else setValues(values as [number, number]);
    onStateChange();
  };

  return (
    <div css={styles.wrapper}>
      <Range
        step={innerStep}
        min={innerMin}
        max={innerMax}
        values={innerValues}
        onChange={handleChange}
        renderTrack={({ props, children }) => (
          <div
            onMouseDown={props.onMouseDown}
            onTouchStart={props.onTouchStart}
            css={styles.slider}
          >
            <div
              className="track"
              ref={props.ref}
              css={styles.progress}
              style={{
                background: getTrackBackground({
                  values: innerValues,
                  colors: [
                    `${themeDefault.colorBorder}`,
                    `${themeDefault.colorPrimary}`,
                    `${themeDefault.colorBorder}`,
                  ],
                  min: innerMin,
                  max: innerMax,
                }),
              }}
            >
              {children}
            </div>
          </div>
        )}
        renderThumb={({ index, props, isDragged }) => (
          <div
            {...props}
            css={styles.progressBar}
            style={{
              ...props.style,
            }}
          ></div>
        )}
      />
      <p css={styles.label}>
        {`${formatter(values[0])} - ${formatter(values[1])}`}
      </p>
    </div>
  );
};
