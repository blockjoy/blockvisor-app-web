import { layoutState } from '@modules/layout/store';
import { useRecoilValue } from 'recoil';

import { Select } from '@shared/components';
import { FC } from 'react';
import { FormProvider, useForm } from 'react-hook-form';
import { spacing } from 'styles/utils.spacing.styles';
import { Drawer, DrawerAction, DrawerContent, DrawerHeader } from '..';

type NodeAddForm = {
  type: 'Node/api' | 'other';
  blockchain: 'Bitcoin' | 'other';
  host: 'BlockJoy Host' | 'other';
};

export const NodeAdd: FC = () => {
  const form = useForm<NodeAddForm>();
  const { isNodeAddOpen } = useRecoilValue(layoutState);

  function onSubmit() {
    return true;
  }

  return (
    <Drawer isOpen={isNodeAddOpen}>
      <DrawerHeader>Add Node</DrawerHeader>
      <DrawerContent>
        <FormProvider {...form}>
          <form onSubmit={onSubmit}>
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
          </form>
        </FormProvider>
        <DrawerAction>action here</DrawerAction>
      </DrawerContent>
    </Drawer>
  );
};
