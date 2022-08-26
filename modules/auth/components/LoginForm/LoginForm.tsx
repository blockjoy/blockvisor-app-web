import { useState } from 'react';
import { FormProvider, useForm } from 'react-hook-form';

import { Button, Input } from '@shared/components';
import { display } from 'styles/utils.display.styles';
import { spacing } from 'styles/utils.spacing.styles';
import { reset } from 'styles/utils.reset.styles';
import { PasswordToggle } from '../PasswordTogle';
import { isValidEmail } from '@shared/utils/validation';

type LoginForm = {
  email: string;
  password: string;
};

export function LoginForm() {
  const form = useForm<LoginForm>();
  const [activeType, setActiveType] = useState<'password' | 'text'>('password');

  const handleIconClick = () => {
    const type = activeType === 'password' ? 'text' : 'password';
    setActiveType(type);
  };

  const onSubmit = form.handleSubmit(({ email, password }) => {
    console.log({ email, password });
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
        <Button size="medium" display="block" style="primary" type="submit">
          Login
        </Button>
      </form>
    </FormProvider>
  );
}
