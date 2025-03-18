import { useEffect, useState } from 'react';
import { useRouter } from 'next/router';
import { useRecoilValue } from 'recoil';
import { isSafari } from 'react-device-detect';
import { authAtoms, useSignIn } from '@modules/auth';
import {
  useDefaultOrganization,
  useGetOrganizations,
} from '@modules/organization';
import { Alert, Button, FormError, Input } from '@shared/components';
import { ROUTES } from '@shared/constants/routes';
import { isValidEmail } from '@shared/utils/validation';
import { FormProvider, useForm } from 'react-hook-form';
import { display } from 'styles/utils.display.styles';
import { reset } from 'styles/utils.reset.styles';
import { spacing } from 'styles/utils.spacing.styles';
import { PasswordToggle } from '@modules/auth';

type LoginForm = {
  email: string;
  password: string;
};

export function LoginForm() {
  const router = useRouter();
  const { verified, redirect, forgot, invitation_id, invited } = router.query;

  const user = useRecoilValue(authAtoms.user);
  const userSettings = useRecoilValue(authAtoms.userSettings);

  const { organizations, getOrganizations } = useGetOrganizations();
  const signIn = useSignIn();
  const { defaultOrganization, setDefaultOrganization } =
    useDefaultOrganization();

  const form = useForm<LoginForm>({
    mode: 'all',
    reValidateMode: 'onBlur',
  });
  const { formState } = form;
  const { isValid } = formState;
  const [loading, setIsLoading] = useState(false);
  const [loginError, setLoginError] = useState<string | undefined>(undefined);
  const [activeType, setActiveType] = useState<'password' | 'text'>('password');

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
    } catch (error) {
      setLoginError('Invalid Credentials');

      setIsLoading(false);
    }
  });

  useEffect(() => {
    if (user?.userId)
      (async () => {
        handleRedirect();
      })();
  }, [user]);

  useEffect(() => {
    if (user && organizations?.length && userSettings && !defaultOrganization)
      setDefaultOrganization({
        orgId: organizations[0]?.orgId,
        name: organizations[0]?.name,
      });
  }, [user, userSettings, organizations]);

  return (
    <>
      {invitation_id && invited && (
        <Alert isSuccess>
          You've been invited to a BlockVisor organization. Please login to
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
                // TODO: Fix issue with validation in Safari
                validationOptions={
                  isSafari
                    ? undefined
                    : {
                        required: 'This is a mandatory field',
                        minLength: { value: 6, message: 'Password too short' },
                      }
                }
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
