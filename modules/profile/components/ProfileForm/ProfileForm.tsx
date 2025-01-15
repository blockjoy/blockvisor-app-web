import { useEffect, useState } from 'react';
import { useRecoilValue } from 'recoil';
import { FormProvider, useForm } from 'react-hook-form';
import { toast } from 'react-toastify';
import { authAtoms, useEditUser } from '@modules/auth';
import { ApplicationError } from '@modules/auth/utils/Errors';
import { escapeHtml } from '@shared/utils/escapeHtml';
import { Button, Input } from '@shared/components';
import { containers } from 'styles/containers.styles';
import { colors } from 'styles/utils.colors.styles';
import { reset } from 'styles/utils.reset.styles';
import { spacing } from 'styles/utils.spacing.styles';
import { typo } from 'styles/utils.typography.styles';
import { styles } from './ProfileForm.styles';

type EditUserForm = {
  firstName: string;
  lastName: string;
};

export function ProfileForm() {
  const user = useRecoilValue(authAtoms.user);
  const { firstName, lastName, userId, email } = user!;

  const form = useForm<EditUserForm>({
    mode: 'all',
    reValidateMode: 'onBlur',
  });
  const editUser = useEditUser();
  const [loading, setIsLoading] = useState(false);
  const [updateError, setUpdateError] = useState<string | undefined>();
  const {
    formState: { isDirty, isValid },
  } = form;

  useEffect(() => {
    form.setValue('firstName', escapeHtml(firstName!) ?? '');
    form.setValue('lastName', escapeHtml(lastName!) ?? '');
  }, []);

  const onSubmit = form.handleSubmit(async ({ firstName, lastName }) => {
    setIsLoading(true);

    try {
      await editUser(firstName, lastName, userId ?? '');
      setIsLoading(false);
      form.reset();
      form.setValue('firstName', escapeHtml(firstName) ?? '');
      form.setValue('lastName', escapeHtml(lastName) ?? '');
      toast.success('Profile updated');
    } catch (error) {
      if (error instanceof ApplicationError) {
        setUpdateError(error.message);
      }
    } finally {
      setIsLoading(false);
    }
  });

  return (
    <FormProvider {...form}>
      <form css={[containers.small]} onSubmit={onSubmit}>
        <ul css={[reset.list]}>
          <li css={[styles.formItem]}>
            <Input
              disabled={true}
              inputSize="medium"
              labelStyles={[typo.base]}
              label="Email"
              name="email"
              placeholder="Email"
              value={escapeHtml(email!)}
            />
          </li>
          <li css={[styles.formItem]}>
            <Input
              disabled={loading}
              labelStyles={[typo.base]}
              inputSize="medium"
              label="First name"
              name="firstName"
              placeholder="First name"
              validationOptions={{
                required: 'Your first name is required',
              }}
            />
          </li>
          <li css={[styles.formItem]}>
            <Input
              disabled={loading}
              inputSize="medium"
              labelStyles={[typo.base]}
              label="Last name"
              name="lastName"
              placeholder="Last name"
              validationOptions={{
                required: 'Your last name is required',
              }}
            />
          </li>
        </ul>
        <Button
          loading={loading}
          customCss={[styles.loadingButton]}
          disabled={!isDirty || loading || !isValid}
          size="medium"
          display="inline"
          style="secondary"
          type="submit"
        >
          Save
        </Button>
        {updateError && (
          <p css={[typo.smaller, colors.warning, spacing.top.small]}>
            {updateError}
          </p>
        )}
      </form>
    </FormProvider>
  );
}
