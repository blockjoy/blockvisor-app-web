import { useRef, useState } from 'react';
import { FormProvider, useForm } from 'react-hook-form';
import { authClient } from '@modules/grpc';
import { Button, FormError } from '@shared/components';
import { spacing } from 'styles/utils.spacing.styles';
import { reset } from 'styles/utils.reset.styles';
import { useRouter } from 'next/router';
import { typo } from 'styles/utils.typography.styles';
import { colors } from 'styles/utils.colors.styles';
import { ROUTES } from '@shared/constants/routes';
import { PasswordField } from '../PasswordField/PasswordField';

type NewPassword = {
  password: string;
  confirmPassword: string;
};

export function NewPasswordForm() {
  const [serverError, setServerError] = useState<string>('');

  const [isLoading, setIsLoading] = useState(false);

  const form = useForm<NewPassword>();

  const router = useRouter();

  const {
    handleSubmit,
    watch,
    formState: { isDirty, isValid },
  } = form;

  const password = useRef({});
  password.current = watch('confirmPassword', '');

  const onSubmit = async ({ password, confirmPassword }: NewPassword) => {
    setIsLoading(true);

    const { token } = router.query;

    const response = await authClient.updateResetPassword(
      token?.toString()!,
      password,
    );

    if (response?.code) {
      setServerError('Error setting new password, please contact support.');
    } else {
      router.push({
        pathname: ROUTES.LOGIN,
        query: { forgot: true },
      });
    }
  };

  const doPasswordsMatch = watch('confirmPassword') === watch('password');

  return serverError ? (
    <p css={[typo.small, colors.warning, spacing.bottom.medium]}>
      There was an error resetting your password, please contact our support
      team.
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
