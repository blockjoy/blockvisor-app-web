import { authAtoms } from '@modules/auth/store/authAtoms';
import { isLoginSuccess } from '@modules/auth/utils/authTypeGuards';
import { apiClient } from '@modules/client';
import { Button, Input } from '@shared/components';
import { saveUser } from '@shared/utils/browserStorage';
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

  const handleIconClick = () => {
    const type = activeType === 'password' ? 'text' : 'password';
    setActiveType(type);
  };

  // for signin use the hardcoded email in stub client: user@test.com
  const onSubmit = form.handleSubmit(async ({ email, password }) => {
    setLoginError(undefined);
    setIsLoading(true);

    const response = await apiClient.login(email, password);
    console.log('respo', response);
    if (isLoginSuccess(response)) {
      saveUser({
        accessToken: response.value,
      });
      setAuth({ accessToken: response.value });
      apiClient.setTokenValue(response.value);
      // simulate async req

      setTimeout(() => {
        setIsLoading(false);
        router.push('/dashboard');
      }, 1000);
    } else {
      setIsLoading(false);
      setLoginError(response?.message);
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
