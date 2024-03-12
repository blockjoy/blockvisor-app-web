import { useEffect, useState } from 'react';
import { FormProvider, useForm } from 'react-hook-form';
import { authClient } from '@modules/grpc';
import { Button, FormError, NextLink } from '@shared/components';
import { spacing } from 'styles/utils.spacing.styles';
import { reset } from 'styles/utils.reset.styles';
import { useRouter } from 'next/router';
import { typo } from 'styles/utils.typography.styles';
import { colors } from 'styles/utils.colors.styles';
import { ROUTES } from '@shared/constants/routes';
import { PasswordField } from '../PasswordField/PasswordField';
import { readToken } from '@shared/utils/readToken';
import { useSignIn } from '@modules/auth';

type NewPassword = {
  password: string;
  confirmPassword: string;
};

export function NewPasswordForm() {
  const signIn = useSignIn();

  const [serverError, setServerError] = useState<string>('');

  const [isLoading, setIsLoading] = useState(false);

  const [email, setEmail] = useState('');

  const form = useForm<NewPassword>({
    mode: 'onChange',
    reValidateMode: 'onBlur',
  });

  const router = useRouter();

  const {
    handleSubmit,
    watch,
    formState: { isDirty, isValid },
  } = form;

  const onSubmit = async ({ password, confirmPassword }: NewPassword) => {
    setIsLoading(true);

    const { token } = router.query;

    try {
      await authClient.updateResetPassword(token?.toString()!, password);
      await signIn({ email, password });
      router.push(ROUTES.NODES);
    } catch (err: any) {
      if (err?.toString()?.includes('TOKEN_EXPIRED')) {
        setServerError('Error resetting, token has expired.');
      } else {
        setServerError('Error resetting, please contact support.');
      }
    }
  };

  const doPasswordsMatch = watch('confirmPassword') === watch('password');

  useEffect(() => {
    const { token } = router.query;
    if (!token) return;
    const tokenObject = readToken(token as string);
    setEmail(tokenObject?.data?.email);
  }, [router.isReady]);

  return serverError ? (
    <p css={[typo.small, spacing.bottom.medium]}>
      There was an error resetting your password, please request to reset your
      password again{' '}
      <NextLink href={`${ROUTES.FORGOT_PASSWORD}?email=${email}`}>
        here
      </NextLink>
    </p>
  ) : (
    <>
      <div css={[spacing.bottom.mediumSmall]}>
        <FormProvider {...form}>
          <form onSubmit={handleSubmit(onSubmit)}>
            <ul css={[reset.list]}>
              <li css={[spacing.bottom.mediumSmall]}>
                <PasswordField
                  loading={isLoading}
                  tabIndex={1}
                  name="password"
                  placeholder="Password"
                />
              </li>
              <li css={[spacing.bottom.mediumSmall]}>
                <PasswordField
                  hideMeter
                  loading={isLoading}
                  tabIndex={2}
                  name="confirmPassword"
                  placeholder="Confirm Password"
                  compareTo={form.getValues().password}
                />
                <FormError isVisible={!doPasswordsMatch}>
                  Passwords do not match
                </FormError>
              </li>
            </ul>
            <Button
              loading={isLoading}
              disabled={!isDirty || !doPasswordsMatch || !isValid}
              tabIndex={3}
              size="medium"
              display="block"
              style="primary"
              type="submit"
            >
              Reset Password
            </Button>
          </form>
        </FormProvider>
      </div>
    </>
  );
}
