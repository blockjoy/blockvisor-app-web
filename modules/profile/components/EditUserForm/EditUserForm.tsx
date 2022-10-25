import { useIdentity } from '@modules/auth';
import { EditUserError } from '@modules/auth/utils/Errors';
import { Button, Input } from '@shared/components';
import { delay } from '@shared/utils/delay';
import { useEffect, useState } from 'react';
import { FormProvider, useForm } from 'react-hook-form';
import { toast } from 'react-toastify';
import { containers } from 'styles/containers.styles';
import { colors } from 'styles/utils.colors.styles';
import { reset } from 'styles/utils.reset.styles';
import { spacing } from 'styles/utils.spacing.styles';
import { typo } from 'styles/utils.typography.styles';
import { styles } from './EditUserForm.styles';

type EditUserForm = {
  firstName: string;
  lastName: string;
};

type Props = {
  id?: string;
  firstName?: string;
  lastName?: string;
};

export function EditUser({ firstName, lastName, id }: Props) {
  const form = useForm<EditUserForm>();
  const { editUser } = useIdentity();
  const [loading, setIsLoading] = useState(false);
  const [updateError, setUpdateError] = useState<string | undefined>();

  useEffect(() => {
    form.setValue('firstName', firstName ?? '');
    form.setValue('lastName', lastName ?? '');
  }, []);

  const onSubmit = form.handleSubmit(async ({ firstName, lastName }) => {
    setIsLoading(true);

    try {
      await editUser(firstName, lastName, id ?? '');
      await delay(1000);
      setIsLoading(false);
      toast.success('Profile updated');
    } catch (error) {
      if (error instanceof EditUserError) {
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
              disabled={loading}
              labelStyles={[typo.base]}
              inputSize="large"
              label="First Name"
              name="firstName"
              validationOptions={{
                required: 'Your first name is required',
              }}
            />
          </li>
          <li css={[styles.formItem]}>
            <Input
              disabled={loading}
              inputSize="large"
              labelStyles={[typo.base]}
              label="Last Name"
              name="lastName"
              validationOptions={{
                required: 'Your last name is required',
              }}
            />
          </li>
        </ul>
        <Button
          loading={loading}
          customCss={[styles.loadingButton]}
          disabled={loading}
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
