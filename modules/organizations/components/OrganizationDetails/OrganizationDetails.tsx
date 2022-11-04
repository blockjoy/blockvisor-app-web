import { styles } from './OrganizationDetails.styles';
import { useEffect, useState } from 'react';
import { Button, Input } from '@shared/components';
import { toast } from 'react-toastify';
import { useGetOrganizationById } from '@modules/organizations/hooks/useGetOrganizationById';
import { useRouter } from 'next/router';
import { queryAsString } from '@shared/utils/query';
import { useUpdateOrganization } from '@modules/organizations/hooks/useUpdateOrganization';
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
  const [isSubmiting, setIsSubmitting] = useState(false);
  const form = useForm<OrganizationDetailsForm>();
  const { handleSubmit, setValue } = form;
  const { getOrganization } = useGetOrganizationById();
  const { updateOrganization } = useUpdateOrganization();

  useEffect(() => {
    if (!id) {
      getOrganization(queryAsString(router.query.id));
    }

    setValue('name', name ?? '');
  }, [id, name]);

  const onSubmit = handleSubmit(async ({ name }, e) => {
    setIsSubmitting(true);
    const id = e?.target.id;

    try {
      updateOrganization(id, name);
      toast.success('Organisation renamed');
      setIsSubmitting(true);
      getOrganization(queryAsString(router.query.id));
    } catch (error) {
      setIsSubmitting(true);
      toast.error('Rename failed');
    }
  });

  return (
    <FormProvider {...form}>
      <form id={id} onSubmit={onSubmit} css={[spacing.bottom.large]}>
        <div css={[spacing.bottom.medium, styles.formInput]}>
          <Input
            label="Organization name"
            disabled={isSubmiting}
            name="name"
            validationOptions={{
              required: 'Organization name is required',
            }}
          />
        </div>
        <Button
          loading={isSubmiting}
          size="small"
          type="submit"
          disabled={isSubmiting}
        >
          Save
        </Button>
      </form>
    </FormProvider>
  );
}
