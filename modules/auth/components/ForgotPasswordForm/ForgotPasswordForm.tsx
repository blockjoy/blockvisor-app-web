import { FormProvider, useForm } from 'react-hook-form';
import { authClient } from '@modules/grpc';
import { Button, Input } from '@shared/components';
import { spacing } from 'styles/utils.spacing.styles';
import { reset } from 'styles/utils.reset.styles';
import { isValidEmail } from '@shared/utils/validation';
import { useEffect, useState } from 'react';
import { toast } from 'react-toastify';
import { useRouter } from 'next/router';
import { ROUTES } from '@shared/constants/routes';

type ForgotPassword = {
  email: string;
};

export function ForgotPasswordForm() {
  const form = useForm<ForgotPassword>({
    mode: 'all',
    reValidateMode: 'onBlur',
  });

  const { formState, setValue } = form;
  const { isValid } = formState;

  const router = useRouter();
  const [isLoading, setIsLoading] = useState<boolean>(false);

  const onSubmit = form.handleSubmit(async ({ email }) => {
    setIsLoading(true);
    await authClient.resetPassword(email);

    router.push(ROUTES.LOGIN);

    toast.success('Email sent');

    setIsLoading(false);
  });

  useEffect(() => {
    const { email } = router.query;
    if (email) {
      setValue('email', email?.toString());
    }
  }, [router.isReady]);

  return (
    <FormProvider {...form}>
      <form onSubmit={onSubmit}>
        <ul css={[reset.list]}>
          <li css={[spacing.bottom.medium]}>
            <Input
              shouldAutoFocus
              tabIndex={1}
              type="email"
              name="email"
              placeholder="Your email"
              validationOptions={{
                required: 'Your email address is required',
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
          disabled={!isValid}
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
