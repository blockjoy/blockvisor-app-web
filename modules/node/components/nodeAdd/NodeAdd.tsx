import { layoutState } from '@modules/layout/store/layoutAtoms';
import { useRecoilState } from 'recoil';
import { Button, Select } from '@shared/components';
import { FC, useState, useEffect } from 'react';
import { FormProvider, SubmitHandler, useForm } from 'react-hook-form';
import { spacing } from 'styles/utils.spacing.styles';
import {
  Drawer,
  DrawerAction,
  DrawerContent,
  DrawerHeader,
} from '@modules/layout/components/drawer';
import { styles } from './nodeAdd.styles';
import { NodeTypePicker } from '@shared/components';
import { useNodeAdd } from '@modules/node/hooks/useNodeAdd';

type NodeAddForm = {
  nodeType: string;
  host: string;
  blockchain: string;
};

export const NodeAdd: FC = () => {
  const { createNode, loadLookups, isLoading, blockchainList, hostList } =
    useNodeAdd();

  const form = useForm<NodeAddForm>();

  const [layout] = useRecoilState(layoutState);

  const onSubmit: SubmitHandler<NodeAddForm> = ({
    host,
    nodeType,
    blockchain,
  }) => {
    const params: CreateNodeParams = {
      host,
      nodeType,
      blockchain,
    };

    createNode(params);
  };

  const [hasMounted, setHasMounted] = useState(false);

  const [supportedNodeTypes, setSupportedNodeTypes] = useState<any>();

  useEffect(() => {
    setHasMounted(true);
    loadLookups();
  }, []);

  useEffect(() => {
    if (blockchainList?.length) {
      const nodeTypes = blockchainList[0].supportedNodeTypes;
      setSupportedNodeTypes(nodeTypes);
      form.setValue('nodeType', nodeTypes[0]);
    }
  }, [blockchainList?.length]);

  useEffect(() => {
    if (hostList?.length) {
      form.setValue('host', hostList[0]?.value);
      form.setValue('blockchain', blockchainList[0]?.value);
      form.setValue('nodeType', '1');
    }
  }, [hostList?.length]);

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
              <div css={[spacing.bottom.medium]}>
                <Select
                  label="Blockchain"
                  inputSize="small"
                  inputStyle="default"
                  name="blockchain"
                  options={blockchainList}
                  validationOptions={{
                    onChange: (e: any) => {
                      console.log('e', e.target.selectedIndex);

                      const supportedNodeTypes =
                        blockchainList[e.target.selectedIndex]
                          .supportedNodeTypes;

                      setSupportedNodeTypes(supportedNodeTypes);

                      console.log('supportedNodeTypes', supportedNodeTypes);
                    },
                  }}
                />
              </div>
            </div>
            <NodeTypePicker
              name="nodeType"
              label="Node Type"
              supportedNodeTypes={supportedNodeTypes}
            />

            <div css={spacing.bottom.large}>
              <Select
                label="Host"
                inputSize="small"
                inputStyle="default"
                name="host"
                options={hostList}
              />
            </div>
          </DrawerContent>
          <DrawerAction>
            <Button
              size="small"
              type="submit"
              loading={isLoading}
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
