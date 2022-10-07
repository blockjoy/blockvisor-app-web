import {
  Drawer,
  DrawerAction,
  DrawerContent,
  DrawerHeader,
} from '@modules/layout/components';
import { layoutState } from '@modules/layout/store/layoutAtoms';
import { useOrganizations } from '@modules/organisations/hooks/useOrganizations';
import { delay } from '@shared/utils/delay';
import { Button, Input } from '@shared/components';
import { useEffect, useState } from 'react';
import { FormProvider, SubmitHandler, useForm } from 'react-hook-form';
import { useRecoilState } from 'recoil';
import { spacing } from 'styles/utils.spacing.styles';
import { width } from 'styles/utils.width.styles';
import { toast } from 'react-toastify';
import { env } from '@shared/constants/env';

type EditOrganisationForm = {
  name: string;
};

export function EditOrganization() {
  const [loading, setIsLoading] = useState(false);
  const { selectedOrganization, updateOrganization } = useOrganizations();

  const form = useForm<EditOrganisationForm>();
  const [layout, setLayout] = useRecoilState(layoutState);

  const onSubmit: SubmitHandler<EditOrganisationForm> = async ({ name }) => {
    if (selectedOrganization?.id) {
      setIsLoading(true);
      updateOrganization(selectedOrganization?.id?.value, name);
      await delay(env.loadingDuration);
      setIsLoading(false);
      setLayout(undefined);
      toast.success('Saved');
    }
  };

  const handleClickClose = () => {
    setLayout(undefined);
  };

  useEffect(() => {
    form.setValue('name', selectedOrganization?.name ?? '');
  }, [selectedOrganization?.name]);

  return (
    <Drawer isOpen={layout === 'editOrganization'}>
      <FormProvider {...form}>
        <form onSubmit={form.handleSubmit(onSubmit)}>
          <DrawerHeader onCloseClicked={handleClickClose}>
            Edit Organization
          </DrawerHeader>
          <DrawerContent>
            <div css={spacing.bottom.medium}>
              <Input disabled={loading} label="Organization name" name="name" />
            </div>
          </DrawerContent>
          <DrawerAction>
            <Button
              size="small"
              type="submit"
              loading={loading}
              customCss={[width.full]}
            >
              Save
            </Button>
          </DrawerAction>
        </form>
      </FormProvider>
    </Drawer>
  );
}
