import { useState } from 'react';
import { FormProvider, useForm } from 'react-hook-form';
import { Alert, Button, Input } from '@shared/components';
import { display } from 'styles/utils.display.styles';
import { spacing } from 'styles/utils.spacing.styles';
import { reset } from 'styles/utils.reset.styles';
import { PasswordToggle } from '../PasswordTogle';
import { isValidEmail } from '@shared/utils/validation';
import { apiClient } from '@modules/client';
import { isResponeMetaObject } from '@modules/auth/utils/authTypeGuards';
import Router, { useRouter } from 'next/router';
import { typo } from 'styles/utils.typography.styles';
import { colors } from 'styles/utils.colors.styles';
import { RegistrationStatus } from '../types';
import { Routes } from '@modules/auth/utils/routes';

type RegisterForm = {
  first_name: string;
  last_name: string;
  email: string;
  password: string;
  confirmPassword: string;
};

const errors = {
  'RpcError: Duplicate resource conflict.': 'Email address already registered',
};

export function RegisterForm() {
  const router = useRouter();
  const { invited } = router.query;

  const form = useForm<RegisterForm>();
  const [activeType, setActiveType] = useState<'password' | 'text'>('password');
  const [registerError, setRegisterError] = useState<string | undefined>();
  const [loading, setIsLoading] = useState(false);
  const { handleSubmit, watch } = form;
  const handleIconClick = () => {
    const type = activeType === 'password' ? 'text' : 'password';
    setActiveType(type);
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

      if (response.message) {
        setRegisterError(
          errors[response?.message] ||
            'Error creating account, invalid values.',
        );
        setIsLoading(false);
        return;
      }

      setIsLoading(false);
      Router.push(Routes.verify);
    },
  );
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
                name="first_name"
                placeholder="First Name"
                validationOptions={{
                  required: 'Your first name is required',
                }}
              />
            </li>
            <li css={[spacing.bottom.mediumSmall]}>
              <Input
                tabIndex={2}
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
              <Input
                tabIndex={3}
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
                tabIndex={4}
                labelStyles={[display.visuallyHidden]}
                disabled={loading}
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
                    tabIndex={0}
                    activeType={activeType}
                    onClick={handleIconClick}
                  />
                }
              />
            </li>
            <li css={[spacing.bottom.medium]}>
              <Input
                tabIndex={5}
                labelStyles={[display.visuallyHidden]}
                disabled={loading}
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
                    tabIndex={0}
                    activeType={activeType}
                    onClick={handleIconClick}
                  />
                }
              />
            </li>
          </ul>
          <Button
            tabIndex={5}
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
            <p css={[typo.smaller, colors.warning, spacing.top.small]}>
              {registerError}
            </p>
          )}
        </form>
      </FormProvider>
    </>
  );
}
