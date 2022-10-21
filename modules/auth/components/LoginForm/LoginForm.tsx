import { Routes } from '@modules/auth';
import { authAtoms } from '@modules/auth/store/authAtoms';
import { isSuccess } from '@modules/auth/utils/authTypeGuards';
import { apiClient } from '@modules/client';
import { useOrganizations } from '@modules/organizations';
import { Button, Input } from '@shared/components';
import { saveUser, updateUser } from '@shared/utils/browserStorage';
import { isValidEmail } from '@shared/utils/validation';
import { useRouter } from 'next/router';
import { useState } from 'react';
import { FormProvider, useForm } from 'react-hook-form';
import { useRecoilState } from 'recoil';
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
  const router = useRouter();
  const form = useForm<LoginForm>();
  const [loading, setIsLoading] = useState(false);
  const [, setAuth] = useRecoilState(authAtoms.user);
  const [loginError, setLoginError] = useState<string | undefined>();
  const [activeType, setActiveType] = useState<'password' | 'text'>('password');
  const { getDefaultOrganization } = useOrganizations();

  const handleIconClick = () => {
    const type = activeType === 'password' ? 'text' : 'password';
    setActiveType(type);
  };

  const onSubmit = form.handleSubmit(async ({ email, password }) => {
    setLoginError(undefined);
    setIsLoading(true);

    const response = await apiClient.login(email, password);
    if (isSuccess(response)) {
      apiClient.setTokenValue(response.value);
      saveUser({
        accessToken: response.value,
        // for demo purposes only, this will be set later
        verified: true,
      });
      const user: any = await apiClient.getUser();
      updateUser({
        id: user?.id,
        firstName: user?.firstName,
        lastName: user?.lastName,
        email: user?.email,
      });
      setAuth({
        accessToken: response.value,
        id: user?.id,
        firstName: user?.firstName,
        lastName: user?.lastName,
        email: user?.email,
      });

      // simulate async req
      getDefaultOrganization();
      setTimeout(() => {
        setIsLoading(false);
        router.push(Routes.dashboard);
      }, 1000);
    } else {
      setIsLoading(false);
      setLoginError('Invalid Credentials');
    }
  });
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
          <li css={[spacing.bottom.medium]}>
            <Input
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
          Login
        </Button>
        {loginError && (
          <p css={[typo.smaller, colors.warning, spacing.top.small]}>
            {loginError}
          </p>
        )}
      </form>
    </FormProvider>
  );
}
