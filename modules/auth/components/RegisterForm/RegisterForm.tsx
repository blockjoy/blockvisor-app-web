import { useEffect, useState } from 'react';
import { FormProvider, useForm } from 'react-hook-form';
import { Alert, Button, Input } from '@shared/components';
import { display } from 'styles/utils.display.styles';
import { spacing } from 'styles/utils.spacing.styles';
import { reset } from 'styles/utils.reset.styles';
import { isValidEmail } from '@shared/utils/validation';
import Router, { useRouter } from 'next/router';
import { typo } from 'styles/utils.typography.styles';
import { colors } from 'styles/utils.colors.styles';
import { Routes } from '@modules/auth/utils/routes';
import { isStatusResponse } from '@modules/organization';
import { handleTokenFromQueryString } from '@modules/auth/utils/handleTokenFromQueryString';
import { PasswordField } from '../PasswordField/PasswordField';
import { usePasswordStrength } from '@modules/auth/hooks/usePasswordStrength';
import { userClient } from '@modules/grpc';

type RegisterForm = {
  firstName: string;
  lastName: string;
  email: string;
  password: string;
  // confirmPassword: string;
};

type ActiveType = {
  password: string;
  confirmPassword: string;
};

const getError = (message: string) => {
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

  const form = useForm<RegisterForm>({
    mode: 'all',
    reValidateMode: 'onBlur',
  });
  const [activeType, setActiveType] = useState<
    Record<keyof ActiveType, 'password' | 'text'>
  >({
    confirmPassword: 'password',
    password: 'password',
  });
  const [registerError, setRegisterError] = useState<string | undefined>();
  const [loading, setIsLoading] = useState(false);
  const { handleSubmit, setValue, formState, watch } = form;
  const { isValid } = formState;

  const { setPassword } = usePasswordStrength();

  const onSubmit = handleSubmit(
    async ({
      email,
      password,
      //confirmPassword,
      firstName,
      lastName,
    }) => {
      setIsLoading(true);
      const response: any = await userClient.createUser({
        firstName,
        lastName,
        email,
        password,
        passwordConfirmation: password,
        // password_confirmation: confirmPassword,
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

  const watchPassword = watch('password');

  useEffect(() => {
    setPassword(form.getValues().password);
  }, [watchPassword]);

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
                shouldAutoFocus
                tabIndex={1}
                labelStyles={[display.visuallyHidden]}
                disabled={loading}
                name="email"
                placeholder="Email"
                validationOptions={{
                  required: 'Your email address is required',
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
                name="firstName"
                placeholder="First name"
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
                name="lastName"
                placeholder="Last name"
                validationOptions={{
                  required: 'Your last name is required',
                }}
              />
            </li>
            <li css={[spacing.bottom.medium]}>
              <PasswordField
                loading={loading}
                tabIndex={4}
                name="password"
                placeholder="Password"
              />
            </li>
            {/* <li css={[spacing.bottom.medium]}>
              <Input
                tabIndex={5}
                labelStyles={[display.visuallyHidden]}
                disabled={loading}
                name="confirmPassword"
                placeholder="Confirm Password"
                type={activeType['confirmPassword']}
                validationOptions={{
                  required: 'You must confirm your password',
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
            </li> */}
          </ul>
          <Button
            tabIndex={6}
            loading={loading}
            disabled={loading || !isValid}
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
