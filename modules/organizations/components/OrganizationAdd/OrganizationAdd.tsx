import { layoutState } from '@modules/layout/store/layoutAtoms';
import { useRecoilState } from 'recoil';

import { Button, Input, Select } from '@shared/components';
import { FC, useState } from 'react';
import { FormProvider, SubmitHandler, useForm } from 'react-hook-form';
import { spacing } from 'styles/utils.spacing.styles';
import {
  Drawer,
  DrawerAction,
  DrawerContent,
  DrawerHeader,
} from '../../../layout/components';
import { width } from 'styles/utils.width.styles';
import { useOrganizations } from '@modules/organizations';
import { toast } from 'react-toastify';
import { delay } from '@shared/utils/delay';
import { env } from '@shared/constants/env';

type OrganisationAddForm = {
  name: string;
};

export const OrganizationAdd: FC = () => {
  const form = useForm<OrganisationAddForm>();
  const [layout, setLayout] = useRecoilState(layoutState);
  const { createOrganization } = useOrganizations();

  const [loading, setLoading] = useState(false);

  const onSubmit: SubmitHandler<OrganisationAddForm> = async ({ name }) => {
    setLoading(true);
    createOrganization(name);
    await delay(env.loadingDuration);
    setLoading(false);
    setLayout(undefined);
    toast.success('Organisation created');
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
          </DrawerContent>
          <DrawerAction>
            <Button
              size="small"
              type="submit"
              loading={loading}
              customCss={[width.full]}
            >
              Create
            </Button>
          </DrawerAction>
        </form>
      </FormProvider>
    </Drawer>
  );
};
