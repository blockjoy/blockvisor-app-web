import { useNodeView } from '@modules/node/hooks/useNodeView';
import { Button, FileUpload, PageSection, Toggle } from '@shared/components';
import { MouseEventHandler } from 'react';
import { Controller, FormProvider, useForm } from 'react-hook-form';
import { colors } from 'styles/utils.colors.styles';
import { display } from 'styles/utils.display.styles';
import { flex } from 'styles/utils.flex.styles';
import { spacing } from 'styles/utils.spacing.styles';
import { typo } from 'styles/utils.typography.styles';
import { styles } from './NodeViewConfig.styles';

type AddNodeForm = {
  [key: string]: any;
  mevBoost?: boolean;
  validatorKeys?: File[];
};

export const NodeViewConfig = () => {
  const form = useForm<AddNodeForm>({
    defaultValues: {
      validatorKeys: [],
      mevBoost: true,
    },
  });
  const { handleSubmit, setValue, getValues, watch } = form;
  const { node } = useNodeView();

  const onSubmit = handleSubmit((data) => {
    const { nodeType, blockchain, validatorKeys, mevBoost, ...rest } = data;
    const params: UpdateNodeParams = {
      nodeId: node?.id!,
      validatorKeys,
      mevBoost,
      ...rest,
    };

    // update node
  });

  const toggle = (name: string) => {
    const value = getValues(name);
    setValue(name, !value);
  };

  const handleRemove: MouseEventHandler<HTMLButtonElement> = (e) => {
    e.preventDefault();
    e.stopPropagation();
    const { itemUrl } = e.currentTarget.dataset;
    const validatorKeys = getValues('validatorKeys');
    const newKeys = validatorKeys?.filter((key) => key.name !== itemUrl);
    setValue('validatorKeys', newKeys);
  };

  console.log('node', node);

  // mocked node type config

  return (
    <>
      <PageSection>
        <h2 css={[typo.large, spacing.bottom.large]}>Configuration</h2>
        <div css={styles.alert}>
          We need to collect some extra details to get your node up and running.
        </div>

        <FormProvider {...form}>
          <form css={styles.form} onSubmit={onSubmit}>
            {node?.nodeTypeConfig?.map((property: NodeTypeConfig) => (
              <>
                {property.type === 'boolean' && (
                  <>
                    <label
                      css={[
                        spacing.bottom.mediumSmall,
                        typo.button,
                        display.block,
                        colors.text3,
                      ]}
                    >
                      {property.label}
                    </label>
                    <div css={[flex.display.flex]}>
                      <Toggle
                        name={property.name}
                        onClick={() => console.log('toggled')}
                        active={watch(property.name)}
                      />
                      <div>
                        <label css={[typo.small]} htmlFor={property.name}>
                          On
                        </label>
                      </div>
                    </div>
                  </>
                )}
                {property.type === 'file-upload' && (
                  <>
                    <label
                      css={[
                        spacing.bottom.mediumSmall,
                        typo.button,
                        display.block,
                        colors.text3,
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
                  </>
                )}
              </>
            ))}
          </form>
        </FormProvider>
        <Button size="small">Save Configuration</Button>
      </PageSection>
    </>
  );
};
