import { FormProvider, useForm } from 'react-hook-form';

import { apiClient } from '@modules/client';

import { Button, Input } from '@shared/components';
import { spacing } from 'styles/utils.spacing.styles';
import { reset } from 'styles/utils.reset.styles';
import { isValidEmail } from '@shared/utils/validation';
import { useState } from 'react';
import { toast } from 'react-toastify';

type ForgotPassword = {
  email: string;
};

export function ForgotPasswordForm() {
  const form = useForm<ForgotPassword>();
  const [isLoading, setIsLoading] = useState<boolean>(false);

  const onSubmit = form.handleSubmit(async ({ email }) => {
    setIsLoading(true);
    await apiClient.resetPassword(email);

    toast.success('Email sent');

    setIsLoading(false);
  });

  return (
    <FormProvider {...form}>
      <form onSubmit={onSubmit}>
        <ul css={[reset.list]}>
          <li css={[spacing.bottom.medium]}>
            <Input
              tabIndex={1}
              name="email"
              placeholder="Your e-mail"
              validationOptions={{
                required: 'Your e-mail address is required',
                pattern: {
                  value: isValidEmail(),
                  message: 'Email format is not correct',
                },
              }}
            />
          </li>
        </ul>
        <Button
          tabIndex={2}
          loading={isLoading}
          size="medium"
          display="block"
          style="primary"
          type="submit"
        >
          Reset Password
        </Button>
      </form>
    </FormProvider>
  );
}
