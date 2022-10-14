import { useState } from 'react';
import { FormProvider, useForm } from 'react-hook-form';

import { Button, Input } from '@shared/components';
import { spacing } from 'styles/utils.spacing.styles';
import { reset } from 'styles/utils.reset.styles';
import { typo } from 'styles/utils.typography.styles';
import { colors } from 'styles/utils.colors.styles';
import { isSuccess, PasswordToggle } from '@modules/auth';
import { containers } from 'styles/containers.styles';
import { styles } from './ChangePassword.styles';
import { apiClient } from '@modules/client';
import { updateAccessToken } from '@shared/utils/browserStorage';
import { toast } from 'react-toastify';

type ChangePasswordForm = {
  currentPassword: string;
  newPassword: string;
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
    async ({ currentPassword, newPassword, confirmPassword }) => {
      setIsLoading(true);
      const res = await apiClient.updatePassword({
        old_pwd: currentPassword,
        new_pwd: newPassword,
        new_pwd_confirmation: confirmPassword,
      });

      if (isSuccess(res)) {
        updateAccessToken(res.value);
        setIsLoading(false);
        form.reset();
        toast.success('Password changed');
      } else {
        setChangePasswordError(res?.message);
        toast.error('Something went wrong');
      }
    },
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
              name="confirmPassword"
              placeholder="Confirm Password"
              inputSize="large"
              type={activeType}
              validationOptions={{
                required: 'This is a mandatory field',
                validate: (value) => {
                  if (watch('newPassword') != value) {
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
          customCss={[styles.loadingButton]}
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
