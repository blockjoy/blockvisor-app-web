import { layoutState } from '@modules/layout/store';
import { useRecoilValue } from 'recoil';

import { Button, Select } from '@shared/components';
import { FC, FormEventHandler, useState } from 'react';
import { FormProvider, SubmitHandler, useForm } from 'react-hook-form';
import { spacing } from 'styles/utils.spacing.styles';
import { Drawer, DrawerAction, DrawerContent, DrawerHeader } from '..';
import { styles } from './nodeAdd.styles';

type NodeAddForm = {
  type: 'Node/api' | 'other';
  blockchain: 'Bitcoin' | 'other';
  host: 'BlockJoy Host' | 'other';
};

export const NodeAdd: FC = () => {
  const form = useForm<NodeAddForm>();
  const { isNodeAddOpen } = useRecoilValue(layoutState);

  const [loading, setLoading] = useState(false);

  const onSubmit: SubmitHandler<NodeAddForm> = ({}) => {
    setLoading(true);
    setTimeout(() => {
      setLoading(false);
    }, 1000);
  };

  return (
    <Drawer isOpen={isNodeAddOpen}>
      <FormProvider {...form}>
        <form onSubmit={form.handleSubmit(onSubmit)}>
          <DrawerHeader>Add Node</DrawerHeader>
          <DrawerContent>
            <div css={spacing.bottom.medium}>
              <Select
                label="Type"
                inputSize="small"
                inputStyle="default"
                name="nodeType"
                options={[{ label: 'test', value: 'test' }]}
              />
            </div>
            <div css={spacing.bottom.medium}>
              <Select
                label="Blockchain"
                inputSize="small"
                inputStyle="default"
                name="blockchain"
                options={[{ label: 'test', value: 'test' }]}
              />
            </div>
            <div css={spacing.bottom.medium}>
              <Select
                label="Host"
                inputSize="small"
                inputStyle="default"
                name="host"
                options={[{ label: 'test', value: 'test' }]}
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
    </Drawer>
  );
};
