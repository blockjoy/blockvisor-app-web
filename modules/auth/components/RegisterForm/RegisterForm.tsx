import { useState } from 'react';
import { FormProvider, useForm } from 'react-hook-form';

import { Button, Input } from '@shared/components';
import { display } from 'styles/utils.display.styles';
import { spacing } from 'styles/utils.spacing.styles';
import { reset } from 'styles/utils.reset.styles';
import { PasswordToggle } from '../PasswordTogle';
import { isValidEmail } from '@shared/utils';

type RegisterForm = {
  email: string;
  password: string;
  confirmPassword: string;
};

export function RegisterForm() {
  const form = useForm<RegisterForm>();
  const [activeType, setActiveType] = useState<'password' | 'text'>('password');
  const { handleSubmit, watch } = form;
  const handleIconClick = () => {
    const type = activeType === 'password' ? 'text' : 'password';
    setActiveType(type);
  };

  const onSubmit = handleSubmit(({ email, password, confirmPassword }) => {
    console.log({ email, password, confirmPassword });
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
          <li css={[spacing.bottom.mediumSmall]}>
            <Input
              labelStyles={[display.visuallyHidden]}
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
        <Button size="medium" display="block" style="primary" type="submit">
          Create Account
        </Button>
      </form>
    </FormProvider>
  );
}
