import { useState } from 'react';
import { FormProvider, useForm } from 'react-hook-form';

import { Button, Input } from '@shared/components';
import { spacing } from 'styles/utils.spacing.styles';
import { display } from 'styles/utils.display.styles';
import { reset } from 'styles/utils.reset.styles';
import { PasswordToggle } from '../PasswordTogle';

type NewPassword = {
  password: string;
  confirmPassword: string;
};

export function NewPasswordForm() {
  const form = useForm<NewPassword>();
  const [activeType, setActiveType] = useState<'password' | 'text'>('password');
  const { handleSubmit, watch } = form;
  const handleIconClick = () => {
    const type = activeType === 'password' ? 'text' : 'password';
    setActiveType(type);
  };

  const onSubmit = handleSubmit(({ password, confirmPassword }) => {
    console.log({ password, confirmPassword });
  });

  return (
    <FormProvider {...form}>
      <form onSubmit={onSubmit}>
        <ul css={[reset.list]}>
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
          Set New Password
        </Button>
      </form>
    </FormProvider>
  );
}
