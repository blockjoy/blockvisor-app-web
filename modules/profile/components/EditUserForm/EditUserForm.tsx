import { Button, Input } from '@shared/components';
import { useState } from 'react';
import { FormProvider, useForm } from 'react-hook-form';
import { containers } from 'styles/containers.styles';
import { colors } from 'styles/utils.colors.styles';
import { reset } from 'styles/utils.reset.styles';
import { spacing } from 'styles/utils.spacing.styles';
import { typo } from 'styles/utils.typography.styles';
import { styles } from './EditUserForm.styles';

type LoginForm = {
  firstName: string;
  lastName: string;
};

export function EditUser() {
  const form = useForm<LoginForm>();
  const [loading, setIsLoading] = useState(false);
  const [loginError, setLoginError] = useState<string | undefined>();

  const onSubmit = form.handleSubmit(async ({ firstName, lastName }) => {});

  return (
    <FormProvider {...form}>
      <form css={[containers.small]} onSubmit={onSubmit}>
        <ul css={[reset.list]}>
          <li css={[styles.formItem]}>
            <Input
              disabled={loading}
              labelStyles={[typo.base]}
              inputSize="large"
              label="First Name"
              name="firstName"
              validationOptions={{
                required: 'Your first name is required',
              }}
            />
          </li>
          <li css={[styles.formItem]}>
            <Input
              disabled={loading}
              inputSize="large"
              labelStyles={[typo.base]}
              label="Last Name"
              name="lastName"
              validationOptions={{
                required: 'Your last name is required',
              }}
            />
          </li>
        </ul>
        <Button
          loading={loading}
          disabled={loading}
          size="medium"
          display="inline"
          style="secondary"
          type="submit"
        >
          Save
        </Button>
        {loginError && (
          <p css={[typo.smaller, colors.warning, spacing.top.small]}>
            {loginError}
          </p>
        )}
      </form>
    </FormProvider>
  );
}
