import { useNodeWizard } from '@modules/node';
import {
  Button,
  FileUpload,
  Input,
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
import { MouseEventHandler, useRef, useState } from 'react';

type AddNodeForm = {
  blockchain: string;
  nodeType: string;
  managedNodes: boolean;
  noOfValidators: number;
  mevboost: boolean;
  validatorKeys: File[];
};
export function AddNode() {
  const { selectedBlockchain } = useNodeWizard();
  const { closeModal } = useModal();
  const form = useForm<AddNodeForm>({
    defaultValues: {
      blockchain: selectedBlockchain?.name ?? '',
      noOfValidators: 1,
      mevboost: false,
      managedNodes: false,
      validatorKeys: [],
    },
  });
  const { handleSubmit, setValue, getValues, watch } = form;

  const toggleNode = () => {
    const value = getValues('managedNodes');
    setValue('managedNodes', !value);
  };

  const toggleMevboost = () => {
    const value = getValues('mevboost');
    setValue('mevboost', !value);
  };

  const handleRemove: MouseEventHandler<HTMLButtonElement> = (e) => {
    e.preventDefault();
    e.stopPropagation();
    const { itemUrl } = e.currentTarget.dataset;
    const validatorKeys = getValues('validatorKeys');
    const newKeys = validatorKeys.filter((key) => key.name !== itemUrl);
    setValue('validatorKeys', newKeys);
  };

  const onSubmit = handleSubmit(
    async ({ mevboost, managedNodes, noOfValidators, validatorKeys }) => {
      console.log('form', {
        mevboost,
        managedNodes,
        noOfValidators,
        validatorKeys,
      });
    },
  );

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
          <h1 css={[typo.medium]}>Add Node</h1>
          <IconClose css={[styles.close]} onClick={closeModal} />
        </div>
        <form css={[styles.content]} onSubmit={onSubmit}>
          <ul css={[reset.list]}>
            <li css={[styles.spacing]}>
              <Select
                name="blockchain"
                inputStyle="outline"
                inputSize="large"
                options={[
                  { label: 'val1', value: 'val1' },
                  { label: 'val2', value: 'val2' },
                ]}
              />
            </li>
            <li css={[styles.spacing]}>
              <label
                css={[spacing.bottom.mediumSmall, typo.button, display.block]}
              >
                Node type
              </label>
              <NodeTypePicker
                supportedNodeTypes={[1, 2]}
                activeNodeType={1}
                onChange={() => console.log('bla')}
              />
            </li>
            <li css={[styles.spacing]}>
              <p css={[typ.body2, spacing.bottom.mediumSmall]}>Host Details</p>
              <p css={[typ.body3, colors.text4, spacing.bottom.medium]}>
                Set the number of validator nodes to run, and where will the
                validator(s) run.
              </p>

              <div css={[flex.display.flex]}>
                <Toggle
                  active={watch('managedNodes')}
                  name="managedNodes"
                  onClick={toggleNode}
                />{' '}
                <div>
                  <label css={[typ.body2]} htmlFor="mevboost">
                    Let BlockJoy Manage these nodes
                  </label>
                  <p css={[typ.body3, colors.text3, styles.description]}>
                    Enable this option to use BlockVisor as a host.
                  </p>
                </div>
              </div>
            </li>
            <li css={[styles.spacing, display.flex, flex.align.center]}>
              <div css={[styles.noOfValidators]}>
                <Input
                  label="No of Validators"
                  name="noOfValidators"
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
              <div css={[styles.hostSelect]}>
                <label
                  css={[
                    typo.button,
                    colors.text3,
                    display.block,
                    spacing.bottom.micro,
                  ]}
                  htmlFor="Host"
                >
                  Host
                </label>
                <Select
                  name="Host"
                  inputStyle="outline"
                  inputSize="large"
                  options={[]}
                />
              </div>
            </li>
            <li css={[styles.spacing]}>
              <label
                css={[spacing.bottom.mediumSmall, typo.button, display.block]}
              >
                Beacon Node
              </label>
              <p css={[typo.small, colors.text4, spacing.bottom.mediumSmall]}>
                Choose a beacon node cluster for your ETH validators.
              </p>
              <Select
                name="beaconNode"
                inputStyle="outline"
                inputSize="large"
                options={[]}
              />
            </li>
            <li css={[styles.spacing]}>
              <label
                css={[spacing.bottom.mediumSmall, typo.button, display.block]}
              >
                Validator
              </label>
              <p css={[typo.small, colors.text4, spacing.bottom.mediumSmall]}>
                Upload your validator keys
              </p>
              <Controller
                name="validatorKeys"
                rules={{
                  required: 'Field Required',
                }}
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
            <li css={[styles.spacing, flex.display.flex]}>
              <Toggle
                name="mevboost"
                onClick={toggleMevboost}
                active={watch('mevboost')}
              />
              <div>
                <label css={[typ.body2]} htmlFor="mevboost">
                  Mevboost
                </label>
                <p css={[typ.body3, colors.text3, styles.description]}>
                  This is an option to enable Mevboost that does something
                  mevboosting
                </p>
              </div>
            </li>
            <li css={[styles.buttonWrapper]}>
              <Button size="small" style="primary" type="submit">
                Create Node
              </Button>
            </li>
          </ul>
        </form>
      </FormProvider>
    </div>
  );
}
