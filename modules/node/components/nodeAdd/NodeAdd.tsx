import { layoutState } from '@modules/layout/store/layoutAtoms';
import { useRecoilState } from 'recoil';
import { Button, Select, Input, InputLabel } from '@shared/components';
import { FC, useState, useEffect } from 'react';
import {
  Controller,
  FormProvider,
  SubmitHandler,
  useForm,
} from 'react-hook-form';
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
import Slider from 'rc-slider';
import 'rc-slider/assets/index.css';

type NodeAddForm = {
  nodeType: number;
  host: string;
  blockchain: string;
  ip?: string;
  batchCreate: number;
};

type NodeTypeConfigProperty = {
  name: string;
  label: string;
  default: any;
  type: string | 'string' | 'boolean' | 'number';
};

type NodeTypeConfig = {
  id: number;
  properties: NodeTypeConfigProperty[];
};

const mockNodeTypeConfig: NodeTypeConfig[] = [
  {
    id: 5,
    properties: [
      { name: 'ip', label: 'IP Address', default: '', type: 'string' },
      { name: 'batch', label: 'Batch Create', default: 100, type: 'number' },
    ],
  },
];

export const NodeAdd: FC = () => {
  const { createNode, loadLookups, isLoading, blockchainList, hostList } =
    useNodeAdd();

  const form = useForm<NodeAddForm>();

  const [config, setConfig] = useState<NodeTypeConfig>();

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

  const handleNodeTypeChanged = (nodeType: number) => {
    console.log('nodeType', nodeType);

    const activeConfig = mockNodeTypeConfig.find((c) => c.id === nodeType);

    setConfig(activeConfig);

    console.log('config', config);
  };

  useEffect(() => {
    setHasMounted(true);
    loadLookups();
  }, []);

  useEffect(() => {
    if (blockchainList?.length) {
      const nodeTypes = blockchainList[0].supportedNodeTypes;
      setSupportedNodeTypes(nodeTypes);

      form.setValue('blockchain', blockchainList[0]?.value);
      form.setValue('nodeType', nodeTypes[0]);

      console.log('form', form.getValues());
    }
  }, [blockchainList?.length]);

  useEffect(() => {
    if (hostList?.length) {
      form.setValue('host', hostList[0]?.value);
      form.setValue('batchCreate', 50);
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
                      setConfig(undefined);

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
              onChange={handleNodeTypeChanged}
            />

            {config?.properties.map((property) => (
              <div css={spacing.bottom.medium}>
                {property.type === 'string' && (
                  <Input
                    name="ip"
                    inputSize="small"
                    placeholder="Enter IP Address"
                    label={property.label}
                  />
                )}
                {property.type === 'number' && (
                  <>
                    <div>
                      <InputLabel labelSize="small">
                        {property.label}
                      </InputLabel>
                    </div>
                    <Controller
                      control={form.control}
                      name="batchCreate"
                      defaultValue={50}
                      render={({ field: { value, onChange } }) => (
                        <div css={styles.slider}>
                          <div css={styles.sliderValue}>{value}</div>
                          <Slider
                            onChange={onChange}
                            min={50}
                            max={1000}
                            step={50}
                            value={value}
                          />
                        </div>
                      )}
                    />
                  </>
                )}
              </div>
            ))}

            <div css={spacing.bottom.micro}>
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
