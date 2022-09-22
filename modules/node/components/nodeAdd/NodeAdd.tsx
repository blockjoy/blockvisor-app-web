import { layoutState } from '@modules/layout/store/layoutAtoms';
import { useRecoilState } from 'recoil';
import {
  Button,
  Select,
  Input,
  InputLabel,
  Checkbox,
} from '@shared/components';
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
import { FormSlider } from './forms/FormSlider';

type NodeAddForm = {
  nodeType: number;
  host: string;
  blockchain: string;
  ip?: string;
  batchCreate: number;
  selfManaged: boolean;
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
      {
        name: 'selfManaged',
        label: 'Self Managed',
        default: '',
        type: 'boolean',
      },
      { name: 'batch', label: 'Batch Create', default: 100, type: 'number' },
    ],
  },
];

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

  const [supportedNodeTypes, setSupportedNodeTypes] = useState<number[]>([]);
  const [activeNodeType, setActiveNodeType] = useState<NodeTypeConfig>();

  const handleNodeTypeChanged = (nodeType: number) => {
    console.log('nodeType', nodeType);

    const activeNodeType = blockchainList[0].supportedNodeTypes.find(
      (t: any) => t.id === nodeType,
    );

    setActiveNodeType(activeNodeType);
  };

  const handleBlockchainChanged = (e: any) => {
    console.log('e', e.target.selectedIndex);

    const supportedNodeTypes = blockchainList[
      e.target.selectedIndex
    ].supportedNodeTypes.map((t: any) => t.id);

    setSupportedNodeTypes(supportedNodeTypes);

    console.log('supportedNodeTypes', supportedNodeTypes);
  };

  useEffect(() => {
    setHasMounted(true);
    loadLookups();
  }, []);

  useEffect(() => {
    if (blockchainList?.length) {
      console.log(`first blockchain node types: ${JSON.stringify(blockchainList[0])}`);
      setSupportedNodeTypes(
        blockchainList[0].supportedNodeTypes.map((t: any) => t.id),
      );
      setActiveNodeType(blockchainList[0].supportedNodeTypes);

      form.setValue('blockchain', blockchainList[0]?.value);
      form.setValue('nodeType', blockchainList[0].supportedNodeTypes[0]?.id);

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
                    onChange: handleBlockchainChanged,
                  }}
                />
              </div>
            </div>
            <NodeTypePicker
              name="nodeType"
              label="Node Type"
              supportedNodeTypes={supportedNodeTypes?.map((t: any) => t?.id)}
              onChange={handleNodeTypeChanged}
            />

            {activeNodeType?.properties?.map((property) => (
              <div key={property.name} css={spacing.bottom.medium}>
                {property.type === 'string' && (
                  <Input
                    name="ip"
                    inputSize="small"
                    placeholder="Enter IP Address"
                    label={property.label}
                  />
                )}
                {property.type === 'boolean' && (
                  <>
                    <InputLabel name="selfManaged" labelSize="small">
                      {property.label}
                    </InputLabel>
                    <Checkbox name="ip" label={property.label} />
                  </>
                )}
                {property.type === 'number' && (
                  <FormSlider label="Batch Create" name="batchCreate" />
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
