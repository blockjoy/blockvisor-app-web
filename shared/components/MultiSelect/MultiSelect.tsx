import Select, { Options, StylesConfig } from 'react-select';
import { Controller, Control, RegisterOptions } from 'react-hook-form';
import { ErrorMessage } from '@hookform/error-message';
import { styles } from './MultiSelect.styles';
import { typo } from 'styles/utils.typography.styles';
import { colors } from 'styles/utils.colors.styles';
import { spacing } from 'styles/utils.spacing.styles';

type Props = {
  label?: string;
  name: string;
  placeholder?: string;
  control: Control;
  options: Options<{ label: string; value: string }>;
  rules?: Pick<
    RegisterOptions,
    'required' | 'max' | 'min' | 'maxLength' | 'minLength' | 'validate'
  >;
};

const customStyles: StylesConfig = {
  control: (base) => ({
    ...base,
    minHeight: '60px',
    backgroundColor: 'var(--color-input-background)',
    border: '1px solid var(--color-text-5-o10)',
    boxShadow: 'none',
    '&:hover': {
      cursor: 'pointer',
    },
  }),
  indicatorsContainer: () => ({
    '& svg': {
      fill: 'var(--color-border-4)',
    },
  }),
  menu: (base) => ({
    ...base,
    backgroundColor: 'var(--color-overlay-background-1)',
  }),
  option: () => ({
    padding: '8px 12px',
    color: 'var(--color-text-4)',
    '&-active, &:hover,  &:active, &:focus': {
      cursor: 'pointer',
      backgroundColor: 'var(--color-text-5-o3)',
    },
  }),
  multiValue: () => ({
    alignItems: 'center',
    backgroundColor: 'var(--color-text-5-o10)',
    borderRadius: ' 4px',
    display: 'inline-flex',
    gap: '8px',
    padding: '4px 16px',
  }),
  valueContainer: (base) => ({ ...base, gap: '8px' }),
  multiValueLabel: () => ({
    color: 'var(--color-text-4)',
    fontSize: '16px',
    lineHeight: '24px',
    cursor: 'auto',
  }),
  multiValueRemove: () => ({
    paddingLeft: '4px',
    paddingRight: '4px',
    display: 'flex',

    '& svg': {
      width: '16px',
      height: '16px',
      fill: 'var(--color-border-4)',
    },
  }),
};

export function MultiSelect({
  label,
  name,
  control,
  options,
  rules,
  placeholder,
}: Props) {
  return (
    <>
      {label && (
        <label css={[styles.label]} htmlFor={name}>
          {label}
        </label>
      )}
      <Controller
        name={name}
        rules={rules}
        control={control}
        render={({ field, formState }) => (
          <>
            <Select
              styles={customStyles}
              placeholder={placeholder}
              components={{
                IndicatorSeparator: () => null,
                ClearIndicator: () => null,
              }}
              isMulti={true}
              {...field}
              options={options}
            />
            <ErrorMessage
              name={name}
              errors={formState.errors[name]}
              as={<p css={[typo.smaller, colors.warning, spacing.top.small]} />}
            />
          </>
        )}
      />
    </>
  );
}
