import { InputLabel } from '@shared/components';
import { Controller, useFormContext } from 'react-hook-form';
import { css } from '@emotion/react';
import { ITheme } from 'types/theme';
import { FC } from 'react';
import Slider from 'rc-slider';

const styles = {
  slider: (theme: ITheme) => css`
    display: flex;
    gap: 20px;
    align-items: center;
    .rc-slider-rail {
      height: 8px;
      background: ${theme.colorLightGrey};
    }
    .rc-slider-track {
      height: 8px;
      background: ${theme.colorPrimary};
    }
    .rc-slider-handle {
      width: 18px;
      height: 18px;
      background: ${theme.colorPrimary};
      opacity: 1;
      border: 2px solid ${theme.colorBackground};
    }
    .rc-slider-handle-dragging {
      background: ${theme.colorPrimary};
      box-shadow: none !important;
      border: 2px solid ${theme.colorBackground} !important;
    }
  `,
  sliderValue: css`
    flex: 0 0 30px;
    min-width: 30px;
    max-width: 30px;
  `,
};

type Props = {
  label: string;
  name: string;
};

export const FormSlider: FC<Props> = ({ label, name }) => {
  const {
    control,
    formState: { errors },
  } = useFormContext();

  return (
    <>
      <div>
        <InputLabel name={name} labelSize="small">
          {label}
        </InputLabel>
      </div>
      <Controller
        control={control}
        name={name}
        defaultValue={50}
        render={({ field: { value, onChange } }) => (
          <div css={styles.slider}>
            <div css={styles.sliderValue}>{value}</div>
            <Slider
              onChange={onChange}
              min={50}
              max={1000}
              step={50}
              value={value}
            />
          </div>
        )}
      />
    </>
  );
};
