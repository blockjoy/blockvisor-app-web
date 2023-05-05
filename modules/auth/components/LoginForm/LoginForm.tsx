import { useIdentityRepository, useSignIn } from '@modules/auth';
import { ApplicationError } from '@modules/auth/utils/Errors';
import { handleTokenFromQueryString } from '@modules/auth/utils/handleTokenFromQueryString';
import { useGetBlockchains } from '@modules/node';
import { useGetOrganizations } from '@modules/organization';
import { Alert, Button, Input } from '@shared/components';
import { ROUTES } from '@shared/index';
import { isValidEmail } from '@shared/utils/validation';
import { useRouter } from 'next/router';
import { useEffect, useState } from 'react';
import { FormProvider, useForm } from 'react-hook-form';
import { colors } from 'styles/utils.colors.styles';
import { display } from 'styles/utils.display.styles';
import { reset } from 'styles/utils.reset.styles';
import { spacing } from 'styles/utils.spacing.styles';
import { typo } from 'styles/utils.typography.styles';
import { PasswordToggle } from '@modules/auth';
import { useCustomer, useSubscription } from '@modules/billing';

type LoginForm = {
  email: string;
  password: string;
};

export function LoginForm() {
  const { getOrganizations } = useGetOrganizations();
  const router = useRouter();
  const { invited, verified, redirect, forgot, token } = router.query;
  const signIn = useSignIn();
  const form = useForm<LoginForm>({
    mode: 'all',
    reValidateMode: 'onBlur',
  });
  const { setValue, formState } = form;
  const { isValid } = formState;
  const [loading, setIsLoading] = useState(false);
  const [loginError, setLoginError] = useState<string | undefined>(undefined);
  const [activeType, setActiveType] = useState<'password' | 'text'>('password');
  const { getBlockchains } = useGetBlockchains();
  const { getCustomer } = useCustomer();
  const { getSubscription } = useSubscription();

  const repository = useIdentityRepository();

  const handleIconClick = () => {
    const type = activeType === 'password' ? 'text' : 'password';
    setActiveType(type);
  };

  const handleRedirect = () => {
    const loginRedirect = /^\/$|\/login/.test(redirect?.toString()!)
      ? ROUTES.DEFAULT
      : redirect?.toString()!;
    router.push(`${loginRedirect || ROUTES.DEFAULT}`, undefined, {
      shallow: true,
    });
  };

  const onSubmit = form.handleSubmit(async ({ email, password }) => {
    setIsLoading(true);

    try {
      await signIn({ email, password });
      await getOrganizations(true);

      const usr_id = repository?.getIdentity()?.id;
      await getCustomer(usr_id!);

      const org_id = repository?.getIdentity()?.defaultOrganization?.id;
      await getSubscription(org_id!);

      getBlockchains();
      handleRedirect();
    } catch (error) {
      if (error instanceof ApplicationError) {
        setLoginError('Invalid Credentials');
      }
      setIsLoading(false);
    }
  });

  useEffect(() => {
    if (router.isReady) {
      if (token) {
        handleTokenFromQueryString(token?.toString()!, setValue);
      }
    }
  }, [router.isReady]);

  return (
    <>
      {invited && <Alert isSuccess>You've been invited, please login.</Alert>}
      {verified && <Alert isSuccess>Account verified, please login.</Alert>}
      {forgot && <Alert isSuccess>Password reset, please login.</Alert>}
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
                type="email"
                validationOptions={{
                  required: 'Your email address is required',
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
            disabled={loading || !isValid}
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
