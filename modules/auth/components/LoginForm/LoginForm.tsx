import { useState } from 'react';
import { FormProvider, useForm } from 'react-hook-form';
import { useRouter } from 'next/router';
import { Button, Input } from '@shared/components';
import { display } from 'styles/utils.display.styles';
import { spacing } from 'styles/utils.spacing.styles';
import { reset } from 'styles/utils.reset.styles';
import { PasswordToggle } from '../PasswordTogle';
import { isValidEmail } from '@shared/utils/validation';
import { apiClient } from '@modules/client';
import { isLoginSuccess } from '@modules/auth/utils/authGuards';
import { saveUser } from '@shared/utils/browserStorage';

type LoginForm = {
  email: string;
  password: string;
};

export function LoginForm() {
  const router = useRouter();
  const form = useForm<LoginForm>();
  const [loading, setIsLoading] = useState(false);
  const [activeType, setActiveType] = useState<'password' | 'text'>('password');

  const handleIconClick = () => {
    const type = activeType === 'password' ? 'text' : 'password';
    setActiveType(type);
  };

  // for signin use the hardcoded email in stub client: user@test.com
  const onSubmit = form.handleSubmit(async ({ email, password }) => {
    const response = await apiClient.login(email, password);
    setIsLoading(true);
    console.log('res', response);
    if (isLoginSuccess(response)) {
      saveUser({ accessToken: response.token });

      // simulate async req
      setTimeout(() => {
        setIsLoading(false);
        router.push('/dashboard');
      }, 1000);
    } else {
      setIsLoading(false);
    }
  });
  return (
    <FormProvider {...form}>
      <form onSubmit={onSubmit}>
        <ul css={[reset.list]}>
          <li css={[spacing.bottom.mediumSmall]}>
            <Input
              labelStyles={[display.visuallyHidden]}
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
          size="medium"
          display="block"
          style="primary"
          type="submit"
        >
          Login
        </Button>
      </form>
    </FormProvider>
  );
}
