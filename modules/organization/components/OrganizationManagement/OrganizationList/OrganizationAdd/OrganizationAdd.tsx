import { layoutState } from '@modules/layout/store/layoutAtoms';
import { useRecoilState } from 'recoil';
import { Button, Input } from '@shared/components';
import { Dispatch, FC, SetStateAction, useState } from 'react';
import { FormProvider, SubmitHandler, useForm } from 'react-hook-form';
import { spacing } from 'styles/utils.spacing.styles';
import { styles } from './OrganizationAdd.styles';
import { width } from 'styles/utils.width.styles';
import {
  useCreateOrganization,
  useGetOrganization,
  useGetOrganizations,
} from '@modules/organization';
import { toast } from 'react-toastify';
import { ApplicationError } from '@modules/auth/utils/Errors';
import { useRouter } from 'next/router';
import { useSwitchOrganization } from '@modules/organization/hooks/useSwitchOrganization';
import { ROUTES } from '@shared/constants/routes';

type OrganisationAddForm = {
  name: string;
};

type Props = {
  setIsAdding: Dispatch<SetStateAction<boolean>>;
};

export const OrganizationAdd: FC<Props> = ({ setIsAdding }) => {
  const router = useRouter();
  const form = useForm<OrganisationAddForm>();
  const [layout, setLayout] = useRecoilState(layoutState);
  const createOrganization = useCreateOrganization();
  const { addToOrganizations } = useGetOrganizations();
  const { setOrganization } = useGetOrganization();
  const { switchOrganization } = useSwitchOrganization();

  const [loading, setLoading] = useState(false);

  const onSubmit: SubmitHandler<OrganisationAddForm> = async ({ name }) => {
    setLoading(true);

    try {
      await createOrganization(name, async (org: any) => {
        form.reset();
        addToOrganizations(org);
        setOrganization(org);
        router.push(`/organizations/${org.id}`);
        switchOrganization(org.id, name);
      });
    } catch (error) {
      setLoading(false);
      if (error instanceof ApplicationError) toast.error(error.message);
    }
  };

  const handleCancel = () => {
    setIsAdding(false);
    router.push(ROUTES.ORGANIZATIONS);
  };

  return (
    <>
      <FormProvider {...form}>
        <form onSubmit={form.handleSubmit(onSubmit)} css={styles.wrapper}>
          <Input
            placeholder="New organization name"
            name="name"
            type="text"
            inputSize="medium"
            validationOptions={{
              required: 'This is a mandatory field',
            }}
            autoFocus
          />
          <div css={styles.buttons}>
            <Button
              loading={loading}
              style="secondary"
              size="small"
              type="submit"
            >
              Add
            </Button>
            <Button onClick={handleCancel} style="outline" size="small">
              Cancel
            </Button>
          </div>
        </form>
      </FormProvider>
    </>
  );
};
