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
import { FormProvider, useForm } from 'react-hook-form';
import { reset } from 'styles/utils.reset.styles';
import { styles } from './AddNode.styles';
import { typo as typ } from 'styles/typo.styles';
import { colors } from 'styles/utils.colors.styles';
import { typo } from 'styles/utils.typography.styles';
import { flex } from 'styles/utils.flex.styles';
import { spacing } from 'styles/utils.spacing.styles';
import { display } from 'styles/utils.display.styles';
import IconClose from '@public/assets/icons/close-12.svg';

type AddNodeForm = {
  blockchain: string;
  nodeType: string;
  managedNodes: boolean;
  noOfValidators: number;
};
export function AddNode() {
  const { selectedBlockchain } = useNodeWizard();
  const { closeModal } = useModal();
  const form = useForm<AddNodeForm>({
    defaultValues: {
      blockchain: selectedBlockchain ?? '',
      noOfValidators: 1,
    },
  });

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
        <form css={[styles.content]}>
          <ul css={[reset.list]}>
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
                <Toggle name="managedNodes" onClick={() => console.log()} />{' '}
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
                  inputSize="medium"
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
                inputSize="medium"
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
              <FileUpload files={[]} placeholder="Upload validator keys" />
            </li>
            <li css={[styles.spacing, flex.display.flex]}>
              <Toggle name="mevboost" onClick={() => console.log()} />{' '}
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
