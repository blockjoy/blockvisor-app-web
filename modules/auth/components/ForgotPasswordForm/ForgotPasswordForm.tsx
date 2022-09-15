import { FormProvider, useForm } from 'react-hook-form';

import { Button, Input } from '@shared/components';
import { spacing } from 'styles/utils.spacing.styles';
import { reset } from 'styles/utils.reset.styles';
import { isValidEmail } from '@shared/utils/validation';

type ForgotPassword = {
  email: string;
};

export function ForgotPasswordForm() {
  const form = useForm<ForgotPassword>();

  const onSubmit = form.handleSubmit(({ email }) => {
    console.log({ email });
  });

  return (
    <FormProvider {...form}>
      <form onSubmit={onSubmit}>
        <ul css={[reset.list]}>
          <li css={[spacing.bottom.medium]}>
            <Input
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
        <Button size="medium" display="block" style="primary" type="submit">
          Reset Password
        </Button>
      </form>
    </FormProvider>
  );
}
