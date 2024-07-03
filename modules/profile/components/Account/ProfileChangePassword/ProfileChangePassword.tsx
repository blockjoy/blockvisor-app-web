import { MouseEventHandler, useState } from 'react';
import { FormProvider, useForm } from 'react-hook-form';
import { Button, FormError, Input } from '@shared/components';
import { spacing } from 'styles/utils.spacing.styles';
import { reset } from 'styles/utils.reset.styles';
import { typo } from 'styles/utils.typography.styles';
import { colors } from 'styles/utils.colors.styles';
import { PasswordToggle, useChangePassword } from '@modules/auth';
import { containers } from 'styles/containers.styles';
import { styles } from './ProfileChangePassword.styles';
import { toast } from 'react-toastify';
import { useGetOrganizations } from '@modules/organization';
import { PasswordField } from '@modules/auth/components/PasswordField/PasswordField';

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
    formState: { isDirty, isValid, isSubmitted },
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
        setChangePasswordError(
          'Error changing password, check current password',
        );
      } finally {
        setIsLoading(false);
      }
    },
  );
  return (
    <>
      <header css={[colors.text3, typo.medium, spacing.bottom.medium]}>
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
                    tabIndex={7}
                  />
                }
              />
            </li>
            <li css={[spacing.bottom.medium]}>
              <PasswordField
                tabIndex={2}
                loading={loading}
                label="New password"
                name="newPassword"
                placeholder="New password"
                isCompact
                isSubmitted={isSubmitted}
              />
            </li>
            <li css={[spacing.bottom.medium]}>
              <Input
                tabIndex={4}
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
                    tabIndex={8}
                    name="confirmPassword"
                    activeType={activeType['confirmPassword']}
                    onClick={handleIconClick}
                  />
                }
              />
            </li>
          </ul>
          <Button
            tabIndex={6}
            loading={loading}
            customCss={[styles.loadingButton]}
            disabled={!isDirty || loading || !isValid}
            size="medium"
            display="inline"
            style="secondary"
            type="submit"
          >
            Change Password
          </Button>
        </form>
      </FormProvider>
      <FormError isVisible={Boolean(changePasswordError)}>
        {changePasswordError}
      </FormError>
    </>
  );
}
