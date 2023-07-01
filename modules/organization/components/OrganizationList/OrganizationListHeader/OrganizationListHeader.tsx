import { ApplicationError } from '@modules/auth/utils/Errors';
import {
  useCreateOrganization,
  useGetOrganization,
  useGetOrganizations,
  useSwitchOrganization,
} from '@modules/organization';
import { TableAdd } from '@shared/components';
import { useRouter } from 'next/router';
import { useState } from 'react';
import { SubmitHandler, useForm } from 'react-hook-form';
import { toast } from 'react-toastify';
import { styles } from './OrganizationListHeader.styles';

export const OrganizationListHeader = () => {
  const [isLoading, setIsLoading] = useState<boolean>(false);

  const router = useRouter();
  const createOrganization = useCreateOrganization();
  const { addToOrganizations } = useGetOrganizations();
  const { setOrganization } = useGetOrganization();
  const { switchOrganization } = useSwitchOrganization();

  const form = useForm<{ name: string }>();

  const onSubmit: SubmitHandler<{ name: string }> = async ({ name }) => {
    try {
      setIsLoading(true);
      await createOrganization(name, async (org: any) => {
        form.reset();
        addToOrganizations(org);
        setOrganization(org);
        router.push(`/organizations/${org.id}`);
        switchOrganization(org.id, name);
      });
    } catch (error) {
      if (error instanceof ApplicationError) toast.error(error.message);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <header css={styles.header}>
      <TableAdd
        placeholder="Add Organization"
        placeholderFocused="Enter a name"
        field="name"
        form={form}
        validationOptions={{
          required: 'A name is required',
        }}
        onSubmit={onSubmit}
        isLoading={isLoading}
      />
    </header>
  );
};
