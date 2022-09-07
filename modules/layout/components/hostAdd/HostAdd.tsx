import { layoutState } from '@modules/layout/store';
import { Button, Input } from '@shared/components';
import { useState } from 'react';
import { FormProvider, SubmitHandler, useForm } from 'react-hook-form';
import { useRecoilValue } from 'recoil';
import { colors } from 'styles/utils.colors.styles';
import { spacing } from 'styles/utils.spacing.styles';
import { typo } from 'styles/utils.typography.styles';
import { Drawer, DrawerAction, DrawerContent, DrawerHeader } from '..';
import { styles } from './hostAdd.styles';

type HostAddForm = {
  name: string;
  location: string;
};

export default () => {
  const form = useForm<HostAddForm>();

  const { isHostsAddOpen } = useRecoilValue(layoutState);

  const [loading, setLoading] = useState(false);
  const [step, setStep] = useState<1 | 2>(1);

  const onSubmit: SubmitHandler<HostAddForm> = ({}) => {
    setLoading(true);
    setTimeout(() => {
      setLoading(false);
      setStep(2);
    }, 1000);
  };

  return (
    <Drawer isOpen={isHostsAddOpen}>
      {step === 1 && (
        <FormProvider {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)}>
            <DrawerHeader>Add Host</DrawerHeader>
            <DrawerContent>
              <div css={spacing.bottom.medium}>
                <Input
                  label="Name"
                  placeholder="e.g. RedLizard"
                  name="confirmPassword"
                  type="text"
                  validationOptions={{
                    required: 'This is a mandatory field',
                  }}
                />
              </div>
              <div css={spacing.bottom.medium}>
                <Input
                  label="Location"
                  placeholder="e.g. London, UK"
                  name="confirmPassword"
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
                customCss={[styles.action]}
              >
                Finish
              </Button>
            </DrawerAction>
          </form>
        </FormProvider>
      )}
      {step === 2 && (
        <>
          <DrawerHeader>Add Host</DrawerHeader>
          <DrawerContent>
            <div>
              <h2 css={typo.base}>
                Great news, your host is ready to be provisioned.
              </h2>
              <p
                css={[
                  typo.small,
                  colors.text3,
                  spacing.top.small,
                  spacing.bottom.large,
                ]}
              >
                Please follow the steps below to complete the creation process.
              </p>

              <section css={styles.step}>
                <h3 css={styles.title}>Step 1: Download BlockJoy</h3>
                <p css={styles.stepDescription}>
                  If you don’t have it already, you can download BlockJoy from
                  this link.
                </p>
                <Button size="small" style="outline">
                  Download
                </Button>
              </section>

              <section css={styles.step}>
                <h3 css={styles.title}>Step 2: Set up your keys</h3>
                <p css={styles.stepDescription}>
                  Your key can be found below, please store it in a safe place
                  as necessary.
                </p>

                <span>EQ2WBtEt50</span>
              </section>

              <section css={styles.step}>
                <h3 css={styles.title}>Step 3: Manage your host</h3>
                <p css={styles.stepDescription}>
                  Once your key has been set up in BlockJoy, you will be able to
                  view your provisioned host via the Hosts tab.
                </p>
                <Button size="small" style="outline">
                  View Hosts
                </Button>
              </section>
            </div>
          </DrawerContent>
        </>
      )}
    </Drawer>
  );
};
