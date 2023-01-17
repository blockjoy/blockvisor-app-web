import { useState } from 'react';
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

type NewPassword = {
  password: string;
  confirmPassword: string;
};

export function NewPasswordForm() {
  const [serverError, setServerError] = useState<string>('');
  const [isReset, setIsReset] = useState<boolean>(false);

  const form = useForm<NewPassword>();

  const router = useRouter();

  const [activeType, setActiveType] = useState<'password' | 'text'>('password');
  const { handleSubmit, watch } = form;
  const handleIconClick = () => {
    const type = activeType === 'password' ? 'text' : 'password';
    setActiveType(type);
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
      setIsReset(true);
    }
  };

  return serverError ? (
    <p css={[typo.small, colors.warning, spacing.bottom.medium]}>
      There was an error verifying your account, please try again.
    </p>
  ) : isReset ? (
    <div css={spacing.bottom.xLarge}>
      <p css={[typo.small, colors.text3, spacing.bottom.large]}>
        Your password has now been reset, please login.
      </p>
      <Button
        onClick={() => router.push('/')}
        size="medium"
        style="outline"
        type="button"
      >
        Login
      </Button>
    </div>
  ) : (
    <>
      <p
        css={[typo.small, colors.text3, spacing.bottom.medium]}
        className="t-small t-color-text-3 s-bottom--medium forgot-password__description"
      >
        Set up your new password and makes sure you store it in a safe place.
      </p>
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
                  type={activeType}
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
                      activeType={activeType}
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
                  placeholder="Confirm Password"
                  type={activeType}
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
                      activeType={activeType}
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
              Set New Password
            </Button>
          </form>
        </FormProvider>
      </div>
    </>
  );
}
