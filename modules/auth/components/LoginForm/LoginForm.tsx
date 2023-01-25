import { Routes, useSignIn } from '@modules/auth';
import { ApplicationError } from '@modules/auth/utils/Errors';
import { useGetBlockchains } from '@modules/node';
import {
  useDefaultOrganization,
  useGetOrganizations,
} from '@modules/organization';
import { Alert, Button, Input } from '@shared/components';
import { env } from '@shared/constants/env';
import { delay } from '@shared/utils/delay';
import { isValidEmail } from '@shared/utils/validation';
import { useRouter } from 'next/router';
import { useEffect, useState } from 'react';
import { FormProvider, useForm } from 'react-hook-form';
import { colors } from 'styles/utils.colors.styles';
import { display } from 'styles/utils.display.styles';
import { reset } from 'styles/utils.reset.styles';
import { spacing } from 'styles/utils.spacing.styles';
import { typo } from 'styles/utils.typography.styles';
import { PasswordToggle } from '../PasswordTogle';

type LoginForm = {
  email: string;
  password: string;
};

export function LoginForm() {
  const { organizations, getOrganizations } = useGetOrganizations();

  const router = useRouter();

  const { invited, verified, redirect } = router.query;

  const signIn = useSignIn();
  const form = useForm<LoginForm>();
  const [loading, setIsLoading] = useState(false);

  const [loginError, setLoginError] = useState<string | undefined>(undefined);
  const [activeType, setActiveType] = useState<'password' | 'text'>('password');
  const { getDefaultOrganization } = useDefaultOrganization();
  const { getBlockchains } = useGetBlockchains();

  const handleIconClick = () => {
    const type = activeType === 'password' ? 'text' : 'password';
    setActiveType(type);
  };

  const onSubmit = form.handleSubmit(async ({ email, password }) => {
    setIsLoading(true);

    try {
      await signIn(email, password);
      await getOrganizations();
      await getBlockchains();

      router.push(`/${redirect?.toString() || 'nodes'}`);
    } catch (error) {
      if (error instanceof ApplicationError) {
        setLoginError('Invalid Credentials');
      }
      setIsLoading(false);
    }
  });

  useEffect(() => {
    if (organizations.length) {
      getDefaultOrganization();
    }
  }, [organizations]);

  return (
    <>
      {invited && (
        <Alert isSuccess>
          You've been invited, <br /> please login.
        </Alert>
      )}
      {verified && (
        <Alert isSuccess>
          Account verified, <br /> please login.
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
                type="email"
                validationOptions={{
                  required: 'Your e-mail address is required',
                  pattern: {
                    value: isValidEmail(),
                    message: 'Email format is not correct',
                  },
                }}
              />
            </li>
            <li css={[spacing.bottom.medium]}>
              <Input
                tabIndex={2}
                labelStyles={[display.visuallyHidden]}
                disabled={loading}
                name="password"
                placeholder="Password"
                type={activeType}
                validationOptions={{
                  required: 'This is a mandatory field',
                  minLength: { value: 6, message: 'Password too short' },
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
          </ul>
          <Button
            tabIndex={3}
            loading={loading}
            disabled={loading}
            size="medium"
            display="block"
            style="primary"
            type="submit"
          >
            Login
          </Button>
          {loginError && (
            <p css={[typo.smaller, colors.warning, spacing.top.small]}>
              {loginError}
            </p>
          )}
        </form>
      </FormProvider>
    </>
  );
}
