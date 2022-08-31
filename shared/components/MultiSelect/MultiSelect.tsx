import Select, { Options } from 'react-select';
import { Controller, Control, RegisterOptions } from 'react-hook-form';
import { ErrorMessage } from '@hookform/error-message';
import { styles } from './MultiSelect.styles';
import { typo } from 'styles/utils.typography.styles';
import { colors } from 'styles/utils.colors.styles';
import { spacing } from 'styles/utils.spacing.styles';

type Props = {
  label?: string;
  name: string;
  control: Control;
  options: Options<{ label: string; value: string }>;
  rules?: Pick<
    RegisterOptions,
    'required' | 'max' | 'min' | 'maxLength' | 'minLength' | 'validate'
  >;
};

export function MultiSelect({ label, name, control, options, rules }: Props) {
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
            <Select {...field} options={options} />
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
