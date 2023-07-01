import { useTheme } from '@emotion/react';
import { Button, Input } from '@shared/components';
import { useState } from 'react';
import {
  FieldValues,
  FormProvider,
  RegisterOptions,
  SubmitHandler,
  UseFormReturn,
} from 'react-hook-form';
import { styles } from './TableAdd.styles';

type Props = {
  placeholder?: string;
  placeholderFocused?: string;
  isLoading: boolean;
  onSubmit: SubmitHandler<any>;
  form: UseFormReturn<any, any>;
  field: string;
  validationOptions?: RegisterOptions<FieldValues, string>;
};

export const TableAdd = ({
  form,
  field,
  isLoading,
  onSubmit,
  placeholder = 'New Organization',
  placeholderFocused,
  validationOptions,
}: Props) => {
  const [isFocused, setIsFocused] = useState(false);
  const theme = useTheme();
  return (
    <>
      <FormProvider {...form}>
        <form onSubmit={form.handleSubmit(onSubmit)} css={styles.wrapper}>
          <Input
            placeholder={
              isFocused && placeholderFocused ? placeholderFocused : placeholder
            }
            name={field}
            type="text"
            inputSize="small"
            inputStyles={[styles.input(theme)]}
            autoComplete="off"
            required
            validationOptions={validationOptions}
            onFocus={() => setIsFocused(true)}
            onBlur={() => setIsFocused(false)}
          />
          <div css={styles.button}>
            <Button
              disabled={!form.formState.isValid}
              loading={isLoading}
              style="secondary"
              size="small"
              type="submit"
            >
              Add
            </Button>
          </div>
        </form>
      </FormProvider>
    </>
  );
};
