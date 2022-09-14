import { layoutState } from '@modules/layout/store';
import { useRecoilValue } from 'recoil';
import { Button, Select } from '@shared/components';
import { FC, useState, useEffect } from 'react';
import { FormProvider, SubmitHandler, useForm } from 'react-hook-form';
import { spacing } from 'styles/utils.spacing.styles';
import { Drawer, DrawerAction, DrawerContent, DrawerHeader } from '..';
import { styles } from './nodeAdd.styles';
import { NodeTypePicker } from '../shared/NodeTypePicker';
import { CreateNodeParams, useNodeAdd } from '@modules/layout/hooks/useNodeAdd';

type NodeAddForm = {
  nodeType: string;
  host: string;
};

export const NodeAdd: FC = () => {
  const { loadHosts, createNode } = useNodeAdd();
  const form = useForm<NodeAddForm>();
  const layout = useRecoilValue(layoutState);

  const onSubmit: SubmitHandler<NodeAddForm> = ({ host, nodeType }) => {
    const params: CreateNodeParams = {
      host,
      nodeType,
    };

    createNode(params);
  };

  const [hasMounted, setHasMounted] = useState(false);

  useEffect(() => {
    setHasMounted(true);
    loadHosts();
  }, []);

  useEffect(() => {
    if (nodeAddHostsList?.length) {
      form.setValue('host', nodeAddHostsList[0]?.value);
      form.setValue('nodeType', '1');
    }
  }, [nodeAddHostsList?.length]);

  if (!hasMounted) {
    return null;
  }

  return (
    <Drawer isOpen={layout === 'nodes'}>
      <FormProvider {...form}>
        <form onSubmit={form.handleSubmit(onSubmit)}>
          <DrawerHeader>Add Node</DrawerHeader>
          <DrawerContent>
            <div css={spacing.bottom.medium}>
              <NodeTypePicker name="nodeType" label="Node Type" />
              <Select
                label="Host"
                inputSize="small"
                inputStyle="default"
                name="host"
                options={nodeAddHostsList}
              />
            </div>
          </DrawerContent>
          <DrawerAction>
            <Button
              size="small"
              type="submit"
              loading={nodeAddCreating}
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
