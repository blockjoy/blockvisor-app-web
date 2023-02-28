import { MouseEventHandler, useEffect, useState } from 'react';
import { FormProvider, useForm } from 'react-hook-form';
import { Alert, Button, Input } from '@shared/components';
import { display } from 'styles/utils.display.styles';
import { spacing } from 'styles/utils.spacing.styles';
import { reset } from 'styles/utils.reset.styles';
import { PasswordToggle } from '@modules/auth';
import { isValidEmail } from '@shared/utils/validation';
import { apiClient } from '@modules/client';
import Router, { useRouter } from 'next/router';
import { typo } from 'styles/utils.typography.styles';
import { colors } from 'styles/utils.colors.styles';
import { Routes } from '@modules/auth/utils/routes';
import { isStatusResponse } from '@modules/organization';
import { handleTokenFromQueryString } from '@modules/auth/utils/handleTokenFromQueryString';
import { PasswordField } from '../PasswordField/PasswordField';

type RegisterForm = {
  first_name: string;
  last_name: string;
  email: string;
  password: string;
  confirmPassword: string;
};

type ActiveType = {
  password: string;
  confirmPassword: string;
};

const getError = (message: string) => {
  console.log('getError');
  // temporary getError method based on message
  if (message?.toLowerCase()?.includes('duplicate')) {
    return 'Email address already registered';
  } else {
    return 'Error creating account, please contact our support team.';
  }
};

export function RegisterForm() {
  const router = useRouter();
  const { invited, token } = router.query;

  const form = useForm<RegisterForm>();
  const [activeType, setActiveType] = useState<
    Record<keyof ActiveType, 'password' | 'text'>
  >({
    confirmPassword: 'password',
    password: 'password',
  });
  const [registerError, setRegisterError] = useState<string | undefined>();
  const [loading, setIsLoading] = useState(false);
  const { handleSubmit, watch, setValue } = form;
  const handleIconClick: MouseEventHandler<HTMLButtonElement> = (e) => {
    const name = e.currentTarget.name as keyof ActiveType;
    const type = activeType[name] === 'password' ? 'text' : 'password';
    setActiveType((prev) => ({ ...prev, [name]: type }));
  };

  const onSubmit = handleSubmit(
    async ({ email, password, confirmPassword, first_name, last_name }) => {
      setIsLoading(true);
      const response: any = await apiClient.createUser({
        first_name,
        last_name,
        email,
        password,
        password_confirmation: confirmPassword,
      });

      console.log('signup', response);

      if (isStatusResponse(response)) {
        setRegisterError(getError(response.message));
        setIsLoading(false);
        return;
      }

      setIsLoading(false);
      Router.push(Routes.verify);
    },
  );

  useEffect(() => {
    if (router.isReady) {
      if (token) {
        handleTokenFromQueryString(token?.toString()!, setValue);
      }
    }
  }, [router.isReady]);

  return (
    <>
      {invited && (
        <Alert isSuccess>
          You've been invited, please create an account to accept.
        </Alert>
      )}
      <FormProvider {...form}>
        <form onSubmit={onSubmit}>
          <ul css={[reset.list]}>
            <li css={[spacing.bottom.mediumSmall]}>
              <Input
                tabIndex={1}
                labelStyles={[display.visuallyHidden]}
                disabled={loading}
                name="email"
                placeholder="Email"
                validationOptions={{
                  required: 'Your e-mail address is required',
                  pattern: {
                    value: isValidEmail(),
                    message: 'Email format is not correct',
                  },
                }}
              />
            </li>
            <li css={[spacing.bottom.mediumSmall]}>
              <Input
                tabIndex={2}
                labelStyles={[display.visuallyHidden]}
                disabled={loading}
                name="first_name"
                placeholder="First Name"
                validationOptions={{
                  required: 'Your first name is required',
                }}
              />
            </li>
            <li css={[spacing.bottom.mediumSmall]}>
              <Input
                tabIndex={3}
                labelStyles={[display.visuallyHidden]}
                disabled={loading}
                name="last_name"
                placeholder="Last Name"
                validationOptions={{
                  required: 'Your last name is required',
                }}
              />
            </li>
            <li css={[spacing.bottom.mediumSmall]}>
              <PasswordField
                loading={loading}
                tabIndex={4}
                name="password"
                placeholder="Password"
              />
            </li>
            <li css={[spacing.bottom.medium]}>
              <Input
                tabIndex={5}
                labelStyles={[display.visuallyHidden]}
                disabled={loading}
                name="confirmPassword"
                placeholder="Confirm Password"
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
                    tabIndex={0}
                    name="confirmPassword"
                    activeType={activeType['confirmPassword']}
                    onClick={handleIconClick}
                  />
                }
              />
            </li>
          </ul>
          <Button
            tabIndex={6}
            loading={loading}
            disabled={loading}
            size="medium"
            display="block"
            style="primary"
            type="submit"
          >
            Create Account
          </Button>
          {registerError && (
            <p css={[typo.smaller, colors.warning, spacing.top.medium]}>
              {registerError}
            </p>
          )}
        </form>
      </FormProvider>
    </>
  );
}
