import { useState } from 'react';
import { FormProvider, useForm } from 'react-hook-form';

import { Button, Input } from '@shared/components';
import { display } from 'styles/utils.display.styles';
import { spacing } from 'styles/utils.spacing.styles';
import { reset } from 'styles/utils.reset.styles';
import { typo } from 'styles/utils.typography.styles';
import { colors } from 'styles/utils.colors.styles';
import { PasswordToggle } from '@modules/auth';
import { containers } from 'styles/containers.styles';

type ChangePasswordForm = {
  currentPassword: string;
  password: string;
  confirmPassword: string;
};

export function ChangePassword() {
  const form = useForm<ChangePasswordForm>();
  const [activeType, setActiveType] = useState<'password' | 'text'>('password');
  const [changePasswordError, setChangePasswordError] =
    useState<string | undefined>();
  const [loading, setIsLoading] = useState(false);
  const { handleSubmit, watch } = form;
  const handleIconClick = () => {
    const type = activeType === 'password' ? 'text' : 'password';
    setActiveType(type);
  };

  const onSubmit = handleSubmit(
    async ({ currentPassword, password, confirmPassword }) => {},
  );
  return (
    <FormProvider {...form}>
      <form css={[containers.small]} onSubmit={onSubmit}>
        <ul css={[reset.list]}>
          <li css={[spacing.bottom.large]}>
            <Input
              disabled={loading}
              label="Current Password"
              name="currentPassword"
              placeholder="Current Password"
              type={activeType}
              inputSize="large"
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
          <li css={[spacing.bottom.mediumSmall]}>
            <Input
              label="New Password"
              disabled={loading}
              name="newPassword"
              placeholder="New Password"
              type={activeType}
              inputSize="large"
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
              label="Confirm new password"
              disabled={loading}
              name="confirmNewPassword"
              placeholder="Confirm Password"
              inputSize="large"
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
        <Button
          loading={loading}
          disabled={loading}
          size="medium"
          display="inline"
          style="primary"
          type="submit"
        >
          Change Password
        </Button>
        {changePasswordError && (
          <p css={[typo.smaller, colors.warning, spacing.top.small]}>
            {changePasswordError}
          </p>
        )}
      </form>
    </FormProvider>
  );
}
