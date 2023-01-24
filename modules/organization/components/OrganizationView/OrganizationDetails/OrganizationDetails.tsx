import { styles } from './OrganizationDetails.styles';
import { useEffect } from 'react';
import { Button, Input } from '@shared/components';
import { toast } from 'react-toastify';
import { useRouter } from 'next/router';
import { useUpdateOrganization } from '@modules/organization/hooks/useUpdateOrganization';
import { FormProvider, useForm } from 'react-hook-form';
import { spacing } from 'styles/utils.spacing.styles';

type Props = {
  name?: string;
  id?: string;
};

type OrganizationDetailsForm = {
  name: string;
};

export function OrganizationDetails({ name, id }: Props) {
  const router = useRouter();
  const form = useForm<OrganizationDetailsForm>();
  const { handleSubmit, setValue } = form;
  const { updateOrganization, loading } = useUpdateOrganization();

  useEffect(() => {
    setValue('name', name ?? '');
  }, [id, name]);

  const onSubmit = handleSubmit(async ({ name }, e) => {
    const id = e?.target.id;

    try {
      await updateOrganization({ id, name });
      toast.success('Organization renamed');
    } catch (error) {
      toast.error('Rename failed');
    }
  });

  return (
    <FormProvider {...form}>
      <form id={id} onSubmit={onSubmit} css={[spacing.bottom.large]}>
        <div css={[spacing.bottom.medium, styles.formInput]}>
          <Input
            label="Organization name"
            disabled={loading}
            name="name"
            validationOptions={{
              required: 'Organization name is required',
            }}
          />
        </div>
        <Button loading={loading} size="small" type="submit" disabled={loading}>
          Save
        </Button>
      </form>
    </FormProvider>
  );
}
