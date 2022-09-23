import { css } from '@emotion/react';
import { InputLabel } from '@shared/components';
import { FC } from 'react';
import { Controller, useFormContext } from 'react-hook-form';
import { ITheme } from 'types/theme';

type Props = {
  label: string;
  name: string;
};

const styles = {
  input: (theme: ITheme) => css`
    position: absolute;
    transform: scale(0);

    &:checked ~ label {
      background: ${theme.colorPrimary};
    }

    &:checked ~ label::after {
      visibility: visible;
      opacity: 1;
    }
  `,
  checkbox: (theme: ITheme) => css`
    display: grid;
    place-items: center;
    width: 24px;
    height: 24px;
    border-radius: 4px;
    background: ${theme.colorLightGrey};
    cursor: pointer;

    ::after {
      content: '';
      display: block;
      width: 6px;
      height: 12px;
      border-right: 2px solid ${theme.colorPrimaryText};
      border-bottom: 2px solid ${theme.colorPrimaryText};
      transform: rotate(45deg);
      visibility: hidden;
      opacity: 0;
      transition-property: visibility, opacity;
      transition-duration: 0.3s;
    }
  `,
};

export const FormCheckbox: FC<Props> = ({ label, name }) => {
  const { control } = useFormContext();
  console.log('label', label);
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
          <>
            <input
              id={name}
              css={styles.input}
              type="checkbox"
              value={value}
              onChange={onChange}
            />
            <label htmlFor={name} css={styles.checkbox} />
          </>
        )}
      />
    </>
  );
};
