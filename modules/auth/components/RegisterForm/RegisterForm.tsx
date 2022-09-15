import { useState } from 'react';
import { FormProvider, useForm } from 'react-hook-form';

import { Button, Input } from '@shared/components';
import { display } from 'styles/utils.display.styles';
import { spacing } from 'styles/utils.spacing.styles';
import { reset } from 'styles/utils.reset.styles';
import { PasswordToggle } from '../PasswordTogle';
import { isValidEmail } from '@shared/utils/validation';
import { apiClient } from '@modules/client';
import { isResponeMetaObject } from '@modules/auth/utils/authTypeGuards';
import Router from 'next/router';
import { typo } from 'styles/utils.typography.styles';
import { colors } from 'styles/utils.colors.styles';
import { RegistrationStatus } from '../types';

type RegisterForm = {
  email: string;
  password: string;
  confirmPassword: string;
};

export function RegisterForm() {
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
    async ({ email, password, confirmPassword }) => {
      setIsLoading(true);
      const response = await apiClient.createUser({
        first_name: '',
        last_name: '',
        email,
        password,
        password_confirmation: confirmPassword,
      });

      // simulate async req
      setTimeout(() => {
        if (isResponeMetaObject(response)) {
          if (response.status === RegistrationStatus.SUCCESS.valueOf()) {
            setIsLoading(false);
            Router.push('/');
          } else {
            setIsLoading(false);
            setRegisterError('something went wrong');
          }
        } else {
          setIsLoading(false);
          setRegisterError(response?.message);
        }
      }, 1000);
    },
  );
  return (
    <FormProvider {...form}>
      <form onSubmit={onSubmit}>
        <ul css={[reset.list]}>
          <li css={[spacing.bottom.mediumSmall]}>
            <Input
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
                  activeType={activeType}
                  onClick={handleIconClick}
                />
              }
            />
          </li>
          <li css={[spacing.bottom.medium]}>
            <Input
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
                  activeType={activeType}
                  onClick={handleIconClick}
                />
              }
            />
          </li>
        </ul>
        <Button
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
  );
}
