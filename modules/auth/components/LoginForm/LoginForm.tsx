import {
  useSignIn,
  useIdentityRepository,
  useUserBilling,
  useUserSubscription,
} from '@modules/auth';
import { useGetBlockchains } from '@modules/node';
import { useGetOrganizations } from '@modules/organization';
import { Alert, Button, FormError, Input } from '@shared/components';
import { ROUTES } from '@shared/constants/routes';
import { isValidEmail } from '@shared/utils/validation';
import { useRouter } from 'next/router';
import { useState } from 'react';
import { FormProvider, useForm } from 'react-hook-form';
import { display } from 'styles/utils.display.styles';
import { reset } from 'styles/utils.reset.styles';
import { spacing } from 'styles/utils.spacing.styles';
import { PasswordToggle } from '@modules/auth';
import { useCustomer, useSubscription } from '@modules/billing';
import { fetchFromLocalStorage } from 'utils/fetchFromLocalStorage';

type LoginForm = {
  email: string;
  password: string;
};

export function LoginForm() {
  const { getOrganizations } = useGetOrganizations();
  const router = useRouter();
  const { verified, redirect, forgot, invitation_id, invited } = router.query;
  const signIn = useSignIn();
  const form = useForm<LoginForm>({
    mode: 'all',
    reValidateMode: 'onBlur',
  });
  const { formState } = form;
  const { isValid } = formState;
  const [loading, setIsLoading] = useState(false);
  const [loginError, setLoginError] = useState<string | undefined>(undefined);
  const [activeType, setActiveType] = useState<'password' | 'text'>('password');
  const repository = useIdentityRepository();
  const { getBlockchains } = useGetBlockchains();
  const { getCustomer } = useCustomer();
  const { fetchSubscription } = useSubscription();
  const { getUserBilling } = useUserBilling();
  const { getUserSubscription } = useUserSubscription();

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
      await signIn(
        { email, password },
        undefined,
        invitation_id as string,
        !!invited,
      );
      await getOrganizations(!invited);

      const userId = repository?.getIdentity()?.id;
      const billingId = await getUserBilling(userId!);
      if (billingId) await getCustomer(billingId!);

      const defaultOrganization: DefaultOrganization = fetchFromLocalStorage(
        'defaultOrganization',
      );
      const userSubscription = await getUserSubscription(
        defaultOrganization?.id!,
      );
      await fetchSubscription(userSubscription?.externalId);

      getBlockchains();
      handleRedirect();
    } catch (error) {
      setLoginError('Invalid Credentials');

      setIsLoading(false);
    }
  });

  return (
    <>
      {invitation_id && invited && (
        <Alert isSuccess>
          You've been invited to a BlockJoy organization. Please login to
          accept.
        </Alert>
      )}
      {invitation_id && !invited && (
        <Alert>Please login to decline the invitation.</Alert>
      )}
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
          <FormError isVisible={Boolean(loginError)}>
            Invalid email or password
          </FormError>
        </form>
      </FormProvider>
    </>
  );
}
