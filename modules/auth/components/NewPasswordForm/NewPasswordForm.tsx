import { MouseEventHandler, useState } from 'react';
import { FormProvider, useForm } from 'react-hook-form';
import { authClient } from '@modules/grpc';
import { Button, Input } from '@shared/components';
import { spacing } from 'styles/utils.spacing.styles';
import { display } from 'styles/utils.display.styles';
import { reset } from 'styles/utils.reset.styles';
import { PasswordToggle } from '@modules/auth';
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

  const [activeType, setActiveType] = useState<
    Record<keyof NewPassword, 'password' | 'text'>
  >({
    confirmPassword: 'password',
    password: 'password',
  });

  const { handleSubmit, watch } = form;

  const handleIconClick: MouseEventHandler<HTMLButtonElement> = (e) => {
    const name = e.currentTarget.name as keyof NewPassword;
    const type = activeType[name] === 'password' ? 'text' : 'password';
    setActiveType((prev) => ({ ...prev, [name]: type }));
  };

  const onSubmit = async ({ password, confirmPassword }: NewPassword) => {
    setIsLoading(true);

    const { token } = router.query;

    const response: any = await authClient.updateResetPassword(
      token?.toString()!,
      password,
    );

    if (response.code) {
      setServerError('Error setting new password, please contact support.');
    } else {
      router.push({
        pathname: ROUTES.LOGIN,
        query: { forgot: true },
      });
    }
  };

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
                  tabIndex={4}
                  name="password"
                  placeholder="Password"
                />
              </li>
              <li css={[spacing.bottom.medium]}>
                <Input
                  tabIndex={2}
                  labelStyles={[display.visuallyHidden]}
                  name="confirmPassword"
                  placeholder="Confirm password"
                  type={activeType['confirmPassword']}
                  validationOptions={{
                    required: 'This is a mandatory field',
                    validate: (value) => {
                      if (watch('password') != value) {
                        return 'Passwords do not match';
                      }
                    },
                  }}
                  rightIcon={
                    <PasswordToggle
                      tabIndex={5}
                      name="confirmPassword"
                      activeType={activeType['confirmPassword']}
                      onClick={handleIconClick}
                    />
                  }
                />
              </li>
            </ul>
            <Button
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
