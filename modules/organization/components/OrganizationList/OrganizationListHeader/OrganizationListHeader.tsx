import { ApplicationError } from '@modules/auth/utils/Errors';
import { Org } from '@modules/grpc/library/blockjoy/v1/org';
import {
  useCreateOrganization,
  useGetOrganization,
  useGetOrganizations,
} from '@modules/organization';
import { TableAdd } from '@shared/components';
import { useRouter } from 'next/router';
import { useState } from 'react';
import { toast } from 'react-toastify';
import { styles } from './OrganizationListHeader.styles';

export const OrganizationListHeader = () => {
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const router = useRouter();
  const createOrganization = useCreateOrganization();
  const { addToOrganizations } = useGetOrganizations();
  const { setOrganization } = useGetOrganization();

  const onSubmit = async (name: string) => {
    try {
      setIsLoading(true);
      await createOrganization(name, async (org: Org) => {
        addToOrganizations(org);
        setOrganization(org);
        router.push(`/organizations/${org.orgId}`);
      });
    } catch (error) {
      if (error instanceof ApplicationError) toast.error(error.message);
    } finally {
      setIsLoading(false);
      return true;
    }
  };

  return (
    <header css={styles.header}>
      <TableAdd
        placeholder="Add Organization"
        placeholderFocused="Enter a name"
        onSubmit={onSubmit}
        isLoading={isLoading}
      />
    </header>
  );
};
