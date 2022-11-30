import { useGetBlockchains, useNodeAdd, useNodeWizard } from '@modules/node';
import {
  Button,
  FileUpload,
  Input,
  MultiSelect,
  NodeTypePicker,
  Select,
  Toggle,
  useModal,
} from '@shared/index';
import { Controller, FormProvider, useForm } from 'react-hook-form';
import { reset } from 'styles/utils.reset.styles';
import { styles } from './AddNode.styles';
import { typo as typ } from 'styles/typo.styles';
import { colors } from 'styles/utils.colors.styles';
import { typo } from 'styles/utils.typography.styles';
import { flex } from 'styles/utils.flex.styles';
import { spacing } from 'styles/utils.spacing.styles';
import { display } from 'styles/utils.display.styles';
import IconClose from '@public/assets/icons/close-12.svg';
import { MouseEventHandler, useEffect } from 'react';
import { useRouter } from 'next/router';
import { nodeTypeProps } from '@shared/constants/lookups';

type AddNodeForm = {
  [key: string]: any;
  blockchain?: {
    label: string;
    value: string;
  };
  nodeType?: number;
  validatorKeys: File[];
};

type Blockchain = {
  id: string;
  name: string;
};

export function AddNode() {
  const router = useRouter();
  const { blockchains } = useGetBlockchains();
  const {
    selectedBlockchain,
    supportedNodeTypes,
    updateSelected,
    resetWizard,
    selectNodeType,
    nodeTypeProperties,
  } = useNodeWizard();
  const { createNode, hostList, loadLookups, isLoading } = useNodeAdd();
  const { closeModal } = useModal();
  const form = useForm<AddNodeForm>({
    defaultValues: {
      blockchain: {
        label: selectedBlockchain?.name,
        value: selectedBlockchain?.id,
      },
      nodeType: 2,
      validatorKeys: [],
    },
  });
  const { handleSubmit, setValue, getValues, watch } = form;

  const selectedNodeType = watch('nodeType');

  useEffect(() => {
    loadLookups();
  }, []);

  useEffect(() => {
    if (hostList.length) {
      setValue('host', hostList[0]);
    }
  }, [isLoading]);

  // useEffect(() => {
  //   const sub = watch((value, { name }) => {
  //     if (name === 'blockchain') {
  //       updateSelected(value.blockchain?.label);
  //     }
  //   });

  //   return () => sub.unsubscribe();
  // }, [watch]);

  const toggle = (name: string) => {
    const value = getValues(name);
    setValue(name, !value);
  };

  const handleRemove: MouseEventHandler<HTMLButtonElement> = (e) => {
    e.preventDefault();
    e.stopPropagation();
    const { itemUrl } = e.currentTarget.dataset;
    const validatorKeys = getValues('validatorKeys');
    const newKeys = validatorKeys.filter((key) => key.name !== itemUrl);
    setValue('validatorKeys', newKeys);
  };

  const handleCloseModal = () => {
    closeModal();
    form.reset();
    resetWizard();
  };

  const handleSelectNodeType = (arg: number) => {
    setValue('nodeType', arg);
    selectNodeType(arg);
  };

  const onSubmit = handleSubmit((data) => {
    const { nodeType, blockchain, validatorKeys, host, ...rest } = data;
    const params: CreateNodeParams = {
      nodeType: nodeType ?? 0,
      blockchain: blockchain?.value ?? '',
      validatorKeys: validatorKeys,
      host: host?.value ?? data['ip'],
      ...rest,
    };

    createNode(params, (nodeId: string) => {
      handleCloseModal();
      router.push(`/nodes/${nodeId}`);
    });
  });

  const blockchainOptions = blockchains.map((b) => ({
    label: b.name ?? '',
    value: b.id ?? '',
  }));

  const nodeTypes = supportedNodeTypes?.map((type: any) => type.id);

  return (
    <div>
      <FormProvider {...form}>
        <div
          css={[
            styles.header,
            flex.display.flex,
            flex.align.center,
            flex.justify.between,
          ]}
        >
          <h2 css={[typo.small]}>New Node</h2>
          <button css={[styles.closeButton]} onClick={handleCloseModal}>
            <IconClose />
          </button>
        </div>
        <form css={[styles.content]} onSubmit={onSubmit}>
          <ul css={[reset.list]}>
            {/* <li css={[styles.spacing]}>
              <MultiSelect
                label="Blockchain"
                isMulti={false}
                name="blockchain"
                options={blockchainOptions}
              />
            </li> */}
            <li css={[styles.spacing]}>
              <label
                css={[
                  spacing.bottom.mediumSmall,
                  typo.smaller,
                  colors.text3,
                  display.block,
                ]}
              >
                Node type
              </label>
              <NodeTypePicker
                supportedNodeTypes={nodeTypes}
                activeNodeType={selectedNodeType || 2}
                onChange={handleSelectNodeType}
              />
            </li>
            {nodeTypeProperties?.map((property: any) => {
              if (property.type === nodeTypeProps.boolean) {
                return (
                  <li key={property.name} css={[styles.spacing]}>
                    <div css={[flex.display.flex]}>
                      <Toggle
                        active={watch(property.name)}
                        name={property.name}
                        onClick={() => toggle(property.name)}
                      />{' '}
                      <div>
                        <label css={[typ.body2]} htmlFor={property.name}>
                          {property.label}
                        </label>
                      </div>
                    </div>
                  </li>
                );
              }

              if (property.type === nodeTypeProps.number) {
                return (
                  <li key={property.name} css={[styles.spacing]}>
                    <div>
                      <Input
                        label={property.label}
                        name={property.name}
                        inputSize="large"
                        inputStyles={[styles.validatorsInput]}
                        labelStyles={[
                          typo.button,
                          colors.text3,
                          display.block,
                          spacing.bottom.micro,
                        ]}
                      />
                    </div>
                  </li>
                );
              }

              if (property.type === nodeTypeProps.text) {
                return (
                  <li key={property.name} css={[styles.spacing]}>
                    <div>
                      <Input
                        label={property.label}
                        name={property.name}
                        inputSize="large"
                        inputStyles={[styles.validatorsInput]}
                        labelStyles={[
                          typo.button,
                          colors.text3,
                          display.block,
                          spacing.bottom.micro,
                        ]}
                      />
                    </div>
                  </li>
                );
              }

              if (property.type === nodeTypeProps.hostSelector) {
                return (
                  <li key={property.name} css={[styles.spacing]}>
                    <div css={[styles.hostSelect]}>
                      <label
                        css={[
                          typo.button,
                          colors.text3,
                          display.block,
                          spacing.bottom.micro,
                        ]}
                        htmlFor={property.name}
                      >
                        {property.label}
                      </label>
                      <MultiSelect
                        isMulti={false}
                        name={property.name}
                        options={hostList}
                        placeholder=""
                      />
                    </div>
                  </li>
                );
              }

              if (property.type === nodeTypeProps.fileUpload) {
                return (
                  <li key={property.name} css={[styles.spacing]}>
                    <label
                      css={[
                        spacing.bottom.mediumSmall,
                        typo.button,
                        display.block,
                      ]}
                    >
                      {property.label}
                    </label>
                    <p
                      css={[
                        typo.small,
                        colors.text4,
                        spacing.bottom.mediumSmall,
                      ]}
                    >
                      Upload your validator keys
                    </p>
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
                  </li>
                );
              }

              if (property.type === nodeTypeProps.nodeSelector) {
                return (
                  <li key={property.name} css={[styles.spacing]}>
                    <label
                      css={[
                        spacing.bottom.mediumSmall,
                        typo.button,
                        display.block,
                      ]}
                    >
                      {property.label}
                    </label>
                    <p
                      css={[
                        typo.small,
                        colors.text4,
                        spacing.bottom.mediumSmall,
                      ]}
                    >
                      Choose a beacon node cluster for your ETH validators.
                    </p>
                    <Select
                      name={property.name}
                      inputStyle="outline"
                      inputSize="large"
                      options={[]}
                    />
                  </li>
                );
              }
            })}

            <li css={[styles.buttonWrapper]}>
              <Button
                display="block"
                size="small"
                style="primary"
                type="submit"
              >
                Create Node
              </Button>
            </li>
          </ul>
        </form>
      </FormProvider>
    </div>
  );
}
