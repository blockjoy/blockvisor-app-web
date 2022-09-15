import { CreateNodeParams, useNode } from '@modules/app/hooks/useNode';
import { layoutState } from '@modules/layout/store/layoutAtoms';
import { Button, Select } from '@shared/components';
import { FC, useEffect, useState } from 'react';
import { FormProvider, SubmitHandler, useForm } from 'react-hook-form';
import { useRecoilValue } from 'recoil';
import { spacing } from 'styles/utils.spacing.styles';
import { width } from 'styles/utils.width.styles';
import { Drawer, DrawerAction, DrawerContent, DrawerHeader } from '..';
import { NodeTypePicker } from '../shared/NodeTypePicker';

type NodeAddForm = {
  nodeType: string;
  host: string;
};

export const NodeAdd: FC = () => {
  const { loadHosts, createNode, nodes } = useNode();
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
    if (nodes?.length) {
      form.setValue('host', nodes[0]?.value);
      form.setValue('nodeType', '1');
    }
  }, [nodes?.length]);

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
                options={nodes || []}
              />
            </div>
          </DrawerContent>
          <DrawerAction>
            <Button
              size="small"
              type="submit"
              loading={false}
              customCss={[width.full]}
            >
              Finish
            </Button>
          </DrawerAction>
        </form>
      </FormProvider>
    </Drawer>
  );
};
