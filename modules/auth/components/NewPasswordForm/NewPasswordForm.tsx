import { MouseEventHandler, useState } from 'react';
import { FormProvider, useForm } from 'react-hook-form';
import { apiClient } from '@modules/client';
import { Button, Input } from '@shared/components';
import { spacing } from 'styles/utils.spacing.styles';
import { display } from 'styles/utils.display.styles';
import { reset } from 'styles/utils.reset.styles';
import { PasswordToggle } from '../PasswordTogle';
import { useRouter } from 'next/router';
import { typo } from 'styles/utils.typography.styles';
import { colors } from 'styles/utils.colors.styles';
import { ROUTES } from '@shared/constants/routes';

type NewPassword = {
  password: string;
  confirmPassword: string;
};

export function NewPasswordForm() {
  const [serverError, setServerError] = useState<string>('');

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
    const { token } = router.query;

    console.log({ password, confirmPassword, token });

    const response: any = await apiClient.updateResetPassword(
      token?.toString()!,
      password,
      confirmPassword,
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
      There was an error verifying your account, please try again.
    </p>
  ) : (
    <>
      <div css={[spacing.bottom.mediumSmall]}>
        <FormProvider {...form}>
          <form onSubmit={handleSubmit(onSubmit)}>
            <ul css={[reset.list]}>
              <li css={[spacing.bottom.mediumSmall]}>
                <Input
                  tabIndex={1}
                  labelStyles={[display.visuallyHidden]}
                  name="password"
                  placeholder="Password"
                  type={activeType['password']}
                  validationOptions={{
                    required: 'This is a mandatory field',
                    minLength: {
                      value: 8,
                      message: 'Password should be at least 8 characters long',
                    },
                  }}
                  rightIcon={
                    <PasswordToggle
                      tabIndex={4}
                      name="password"
                      activeType={activeType['password']}
                      onClick={handleIconClick}
                    />
                  }
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
