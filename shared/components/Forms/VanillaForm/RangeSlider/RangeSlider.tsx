import { Range, getTrackBackground } from 'react-range';
import { themeDefault } from 'themes';
import { styles } from './RangeSlider.styles';

type RangeSliderProps = {
  step: number;
  min: number;
  max: number;
  values: [number, number];
  setValues: any;
  label?: string;
  onStateChange: VoidFunction;
};

export const RangeSlider = ({
  step,
  min,
  max,
  values,
  setValues,
  label,
  onStateChange,
}: RangeSliderProps) => {
  return (
    <div css={styles.wrapper}>
      <Range
        values={values}
        step={step}
        min={min}
        max={max}
        onChange={(values) => {
          setValues(values);
          onStateChange();
        }}
        renderTrack={({ props, children }) => (
          <div
            onMouseDown={props.onMouseDown}
            onTouchStart={props.onTouchStart}
            css={styles.slider}
          >
            <div
              ref={props.ref}
              css={styles.progress}
              style={{
                background: getTrackBackground({
                  values,
                  colors: [
                    `${themeDefault.colorInput}`,
                    `${themeDefault.colorPrimary}`,
                    `${themeDefault.colorInput}`,
                  ],
                  min,
                  max,
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
        {`${values[0]}${label ?? ''} - ${values[1]}${label ?? ''}`}
      </p>
    </div>
  );
};
