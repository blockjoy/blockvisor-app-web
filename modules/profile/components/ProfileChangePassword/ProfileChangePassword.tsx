import { MouseEventHandler, useState } from 'react';
import { FormProvider, useForm } from 'react-hook-form';

import { Button, Input } from '@shared/components';
import { spacing } from 'styles/utils.spacing.styles';
import { reset } from 'styles/utils.reset.styles';
import { typo } from 'styles/utils.typography.styles';
import { colors } from 'styles/utils.colors.styles';
import { PasswordToggle, useChangePassword } from '@modules/auth';
import { containers } from 'styles/containers.styles';
import { styles } from './ProfileChangePassword.styles';
import { toast } from 'react-toastify';
import { ApplicationError } from '@modules/auth/utils/Errors';
import { useGetOrganizations } from '@modules/organization';

type ChangePasswordForm = {
  currentPassword: string;
  newPassword: string;
  confirmPassword: string;
};

export function ProfileChangePassword() {
  const form = useForm<ChangePasswordForm>();
  const changePassword = useChangePassword();
  const [activeType, setActiveType] = useState<
    Record<keyof ChangePasswordForm, 'password' | 'text'>
  >({
    confirmPassword: 'password',
    newPassword: 'password',
    currentPassword: 'password',
  });
  const [changePasswordError, setChangePasswordError] =
    useState<string | undefined>();
  const [loading, setIsLoading] = useState(false);
  const { handleSubmit, watch } = form;
  const {
    formState: { isDirty },
  } = form;

  const { getOrganizations } = useGetOrganizations();

  const handleIconClick: MouseEventHandler<HTMLButtonElement> = (e) => {
    const name = e.currentTarget.name as keyof ChangePasswordForm;

    const type = activeType[name] === 'password' ? 'text' : 'password';
    setActiveType((prev) => ({ ...prev, [name]: type }));
  };

  const onSubmit = handleSubmit(
    async ({ currentPassword, newPassword, confirmPassword }) => {
      setIsLoading(true);

      try {
        await changePassword(currentPassword, newPassword, confirmPassword);
        setChangePasswordError(undefined);
        setIsLoading(false);
        await getOrganizations(true);
        form.reset();
        toast.success('Password changed');
      } catch (error) {
        if (error instanceof ApplicationError) {
          const errorMessage = error.message.includes('invalid authentication')
            ? 'Error changing password, please check current password.'
            : 'Error changing password, please contact our support team.';
          setChangePasswordError(errorMessage);
        }
      } finally {
        setIsLoading(false);
      }
    },
  );
  return (
    <>
      <header css={[colors.text3, typo.medium, spacing.bottom.large]}>
        Change Password
      </header>
      <FormProvider {...form}>
        <form css={[containers.small]} onSubmit={onSubmit}>
          <ul css={[reset.list]}>
            <li css={[spacing.bottom.medium]}>
              <Input
                tabIndex={1}
                disabled={loading}
                label="Current password"
                name="currentPassword"
                placeholder="Current password"
                labelStyles={[typo.base]}
                type={activeType['currentPassword']}
                inputSize="medium"
                validationOptions={{
                  required: 'This is a mandatory field',
                  minLength: {
                    value: 8,
                    message: 'Password should be at least 8 characters long',
                  },
                }}
                rightIcon={
                  <PasswordToggle
                    name="currentPassword"
                    activeType={activeType['currentPassword']}
                    onClick={handleIconClick}
                  />
                }
              />
            </li>
            <li css={[spacing.bottom.medium]}>
              <Input
                tabIndex={2}
                label="New password"
                disabled={loading}
                name="newPassword"
                placeholder="New password"
                type={activeType['newPassword']}
                inputSize="medium"
                labelStyles={[typo.base]}
                validationOptions={{
                  required: 'This is a mandatory field',
                  minLength: {
                    value: 8,
                    message: 'Password should be at least 8 characters long',
                  },
                }}
                rightIcon={
                  <PasswordToggle
                    tabIndex={5}
                    name="newPassword"
                    activeType={activeType['newPassword']}
                    onClick={handleIconClick}
                  />
                }
              />
            </li>
            <li css={[spacing.bottom.large]}>
              <Input
                tabIndex={3}
                label="Confirm new password"
                disabled={loading}
                name="confirmPassword"
                placeholder="Confirm new password"
                inputSize="medium"
                labelStyles={[typo.base]}
                type={activeType['confirmPassword']}
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
                    tabIndex={6}
                    name="confirmPassword"
                    activeType={activeType['confirmPassword']}
                    onClick={handleIconClick}
                  />
                }
              />
            </li>
          </ul>
          <Button
            tabIndex={4}
            loading={loading}
            customCss={[styles.loadingButton]}
            disabled={!isDirty || loading}
            size="medium"
            display="inline"
            style="secondary"
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
    </>
  );
}
