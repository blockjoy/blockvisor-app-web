import { layoutState } from '@modules/layout/store/layoutAtoms';
import { useRecoilState } from 'recoil';
import { Button, Select, Input, FileUpload } from '@shared/components';
import { useRouter } from 'next/router';
import { FC, useState, useEffect, MouseEventHandler } from 'react';
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
import { FormSlider } from './forms/FormSlider';
import { FormCheckbox } from './forms/FormCheckbox';

type NodeAddForm = {
  nodeType: number;
  host: string;
  blockchain: string;
  ip?: string;
  batchCreate: number;
  selfManaged: boolean;
  validatorKeys: File[];
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

export const NodeAdd: FC = () => {
  const router = useRouter();

  const { createNode, loadLookups, isLoading, blockchainList, hostList } =
    useNodeAdd();

  const form = useForm<NodeAddForm>({
    defaultValues: {
      validatorKeys: [],
    },
  });
  const { getValues, setValue } = form;

  const [layout] = useRecoilState(layoutState);

  const handleRemove: MouseEventHandler<HTMLButtonElement> = (e) => {
    e.preventDefault();
    e.stopPropagation();
    const { itemUrl } = e.currentTarget.dataset;
    const validatorKeys = getValues('validatorKeys');
    const newKeys = validatorKeys.filter((key) => key.name !== itemUrl);
    setValue('validatorKeys', newKeys);
  };

  const onSubmit: SubmitHandler<NodeAddForm> = ({
    host,
    nodeType,
    blockchain,
    validatorKeys,
  }) => {
    const params: CreateNodeParams = {
      host,
      nodeType,
      blockchain,
      keys: validatorKeys,
    };

    createNode(params, (nodeId: string) => {
      form.setValue('blockchain', blockchainList[0]?.value);
      form.setValue('nodeType', blockchainList[0].supportedNodeTypes[0]?.id);
      form.setValue('host', hostList[0]?.value);
      setActiveNodeType(blockchainList[0].supportedNodeTypes[0]);
      setSupportedNodeTypes(
        blockchainList[0].supportedNodeTypes.map((t: any) => t.id),
      );
      router.push(`/nodes/${nodeId}`);
    });
  };

  const [hasMounted, setHasMounted] = useState(false);

  const [supportedNodeTypes, setSupportedNodeTypes] = useState<number[]>([]);
  const [activeNodeType, setActiveNodeType] = useState<NodeTypeConfig>();

  const handleNodeTypeChanged = (nodeType: number) => {
    const activeBlockchain = blockchainList.find(
      (b) => b.value === form.getValues().blockchain,
    );

    const activeNodeType = activeBlockchain.supportedNodeTypes.find(
      (t: any) => t.id === nodeType,
    );

    setActiveNodeType(activeNodeType);
    form.setValue('nodeType', nodeType);
  };

  const handleBlockchainChanged = (e: any) => {
    const supportedNodeTypes =
      blockchainList[e.target.selectedIndex].supportedNodeTypes;

    setSupportedNodeTypes(supportedNodeTypes.map((t: any) => t.id));
    setActiveNodeType(supportedNodeTypes[0]);
  };

  useEffect(() => {
    setHasMounted(true);
    loadLookups();
  }, []);

  useEffect(() => {
    if (blockchainList?.length) {
      setSupportedNodeTypes(
        blockchainList[0].supportedNodeTypes.map((t: any) => t.id),
      );
      setActiveNodeType(blockchainList[0].supportedNodeTypes[0]);
      form.setValue('blockchain', blockchainList[0]?.value);
      form.setValue('nodeType', blockchainList[0].supportedNodeTypes[0]?.id);
      form.setValue('selfManaged', true);
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
              activeNodeType={activeNodeType?.id || 0}
              supportedNodeTypes={supportedNodeTypes}
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
                  <div css={spacing.bottom.medium}>
                    <FormCheckbox label="Self managed?" name="selfManaged" />
                  </div>
                )}
                {property.type === 'number' && (
                  <div css={spacing.bottom.medium}>
                    <FormSlider label="Batch Create" name="batchCreate" />
                  </div>
                )}
                {property.type === 'multifileupload' ? (
                  <div css={spacing.bottom.medium}>
                    <Controller
                      name="validatorKeys"
                      render={({ field: { onChange, name } }) => (
                        <FileUpload
                          multiple={true}
                          onChange={(e) => onChange(e)}
                          name={name}
                          remove={handleRemove}
                          placeholder="Upload validator keys"
                        />
                      )}
                    />
                  </div>
                ) : null}
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
