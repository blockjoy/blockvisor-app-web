import { User } from '@blockjoy/blockjoy-grpc/dist/out/common_pb';
import { apiClient } from '@modules/client';
import { isStatusResponse } from '@modules/organizations';
import { Button, Input } from '@shared/components';
import { delay } from '@shared/utils/delay';
import { useState } from 'react';
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

export function EditUser() {
  const form = useForm<EditUserForm>();
  const [loading, setIsLoading] = useState(false);
  const [updateError, setUpdateError] = useState<string | undefined>();

  const onSubmit = form.handleSubmit(async ({ firstName, lastName }) => {
    setIsLoading(true);

    const user = new User();
    user.setFirstName(firstName);
    user.setLastName(lastName);
    const res = await apiClient.updateUser(user);

    await delay(1000);
    if (isStatusResponse(res)) {
      setIsLoading(false);
      setUpdateError(res.message);
    } else {
      setIsLoading(false);
      toast.success('Profile updated');
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
