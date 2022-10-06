import {
  Drawer,
  DrawerAction,
  DrawerContent,
  DrawerHeader,
} from '@modules/layout/components';
import { layoutState } from '@modules/layout/store/layoutAtoms';
import { useOrganisations } from '@modules/organisations/hooks/useOrganisations';
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

export function EditOrganisaton() {
  const [loading, setIsLoading] = useState(false);
  const { selectedOrganisation, updateOrganisation } = useOrganisations();

  const form = useForm<EditOrganisationForm>();
  const [layout, setLayout] = useRecoilState(layoutState);

  const onSubmit: SubmitHandler<EditOrganisationForm> = async ({ name }) => {
    if (selectedOrganisation?.id) {
      setIsLoading(true);
      updateOrganisation(selectedOrganisation?.id?.value, name);
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
    form.setValue('name', selectedOrganisation?.name ?? '');
  }, [selectedOrganisation?.name]);

  return (
    <Drawer isOpen={layout === 'editOrganisation'}>
      <FormProvider {...form}>
        <form onSubmit={form.handleSubmit(onSubmit)}>
          <DrawerHeader onCloseClicked={handleClickClose}>
            Edit Organisation
          </DrawerHeader>
          <DrawerContent>
            <div css={spacing.bottom.medium}>
              <Input disabled={loading} label="Organisation name" name="name" />
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
