import { layoutState } from '@modules/layout/store/layoutAtoms';
import { useRecoilState } from 'recoil';
import { Button, Input } from '@shared/components';
import { FC, useState } from 'react';
import { FormProvider, SubmitHandler, useForm } from 'react-hook-form';
import { spacing } from 'styles/utils.spacing.styles';
import {
  Drawer,
  DrawerContent,
  DrawerHeader,
} from '../../../layout/components';
import { width } from 'styles/utils.width.styles';
import {
  useCreateOrganization,
  useGetOrganizations,
} from '@modules/organization';
import { toast } from 'react-toastify';
import { ApplicationError } from '@modules/auth/utils/Errors';
import { useRouter } from 'next/router';
import { useGetOrganizationMembers } from '@modules/organization/hooks/useGetMembers';
import { useSetDefaultOrganization } from '@modules/organization/hooks/useSetDefaultOrganization';

type OrganisationAddForm = {
  name: string;
};

export const OrganizationAdd: FC = () => {
  const router = useRouter();
  const form = useForm<OrganisationAddForm>();
  const [layout, setLayout] = useRecoilState(layoutState);
  const createOrganization = useCreateOrganization();
  const { getOrganizations } = useGetOrganizations();
  const { setDefaultOrganization } = useSetDefaultOrganization();

  const [loading, setLoading] = useState(false);

  const onSubmit: SubmitHandler<OrganisationAddForm> = async ({ name }) => {
    setLoading(true);

    try {
      await createOrganization(name, async (org: any) => {
        router.push(`/organizations/${org.id}`);
        await getOrganizations();
        form.reset();
        setLoading(false);
        setLayout(undefined);
        setDefaultOrganization(org.id, name);
      });
    } catch (error) {
      setLoading(false);
      if (error instanceof ApplicationError) toast.error(error.message);
    }
  };

  return (
    <Drawer isOpen={layout === 'organization'}>
      <FormProvider {...form}>
        <form onSubmit={form.handleSubmit(onSubmit)}>
          <DrawerHeader>Add Organization</DrawerHeader>
          <DrawerContent>
            <div css={spacing.bottom.medium}>
              <Input
                label="Organization name"
                placeholder="e.g. BlockJoy"
                name="name"
                type="text"
                validationOptions={{
                  required: 'This is a mandatory field',
                }}
              />
            </div>
            <Button
              style="secondary"
              size="medium"
              type="submit"
              loading={loading}
              customCss={[width.full]}
            >
              Add
            </Button>
          </DrawerContent>
        </form>
      </FormProvider>
    </Drawer>
  );
};
