import { NodeTypeConfigLabel, Alert, PillPicker } from '@shared/components';
import { FC } from 'react';
import { FileUpload } from './formComponents/FileUpload/FileUpload';
import { Textbox } from './formComponents/Textbox/Textbox';
import { Switch } from './formComponents/Switch/Switch';
import { colors } from 'styles/utils.colors.styles';
import { display } from 'styles/utils.display.styles';
import { spacing } from 'styles/utils.spacing.styles';
import { typo } from 'styles/utils.typography.styles';
import { styles } from './NodeLauncherConfig.styles';
import { NodeLauncherConfigWrapper } from './NodeLauncherConfigWrapper';

type Props = {
  isConfigValid: boolean;
  nodeTypeProperties?: NodeTypeConfig[];
  nodeFiles?: NodeFiles[];
  networkList: string[];
  nodeNetwork: string;
  onFileUploaded: (e: any) => void;
  onPropertyChanged: (e: any) => void;
  onNetworkChanged: (network: string) => void;
};

const renderControls = (
  property: any,
  nodeFiles: NodeFiles[],
  onFileUploaded: (e: any) => void,
  onPropertyChanged: (e: any) => void,
) => {
  switch (property.ui_type) {
    case 'key-upload':
      return (
        <FileUpload
          currentFiles={nodeFiles?.find((f) => f.name === property.name)?.files}
          multiple={true}
          onChange={onFileUploaded}
          name={property.name}
          remove={() => console.log('shit')}
          placeholder="Upload validator keys"
        />
      );
    case 'voting_key_pwd':
      return (
        <Textbox
          type="password"
          isRequired={property?.required && !property.value}
          name={property.name}
          onPropertyChanged={onPropertyChanged}
        />
      );
    case 'wallet_address':
      return (
        <Textbox
          type="text"
          isRequired={property?.required && !property.value}
          name={property.name}
          onPropertyChanged={onPropertyChanged}
        />
      );
    case 'switch':
      return (
        <Switch
          disabled={!!property.disabled}
          tooltip="Self hosting will be available after BETA."
          name={property.name}
          onPropertyChanged={onPropertyChanged}
        />
      );
  }
};

export const NodeLauncherConfig: FC<Props> = ({
  isConfigValid,
  nodeTypeProperties,
  nodeFiles,
  nodeNetwork,
  networkList,
  onFileUploaded,
  onPropertyChanged,
  onNetworkChanged,
}) => {
  // const handleRemove: MouseEventHandler<HTMLButtonElement> = (e) => {
  //   e.preventDefault();
  //   e.stopPropagation();
  //   const { itemUrl } = e.currentTarget.dataset;
  //   const validatorKeys = getValues('validatorKeys');
  //   const newKeys = validatorKeys?.filter((key) => key.name !== itemUrl);
  //   setValue('validatorKeys', newKeys);
  // };

  return (
    <NodeLauncherConfigWrapper>
      <div css={styles.wrapper}>
        <h2 css={styles.h2}>Configure</h2>
        <div css={styles.alertWrapper}>
          <Alert isSuccess={isConfigValid}>
            {isConfigValid
              ? 'All systems GO!'
              : 'Node requires configuration information.'}
          </Alert>
        </div>
        <div css={styles.nodeTypeProperties}>
          <label
            css={[
              spacing.bottom.mediumSmall,
              typo.button,
              display.block,
              colors.text2,
            ]}
          >
            Network
          </label>
          {Boolean(networkList?.length) ? (
            <PillPicker
              items={networkList}
              selectedItem={nodeNetwork}
              onChange={onNetworkChanged}
            />
          ) : (
            <div css={[spacing.bottom.medium, colors.warning, typo.small]}>
              Missing Network Configuration
            </div>
          )}
          {Boolean(networkList?.length) &&
            nodeTypeProperties?.map((property: NodeTypeConfig) => {
              return (
                <>
                  <label
                    css={[
                      spacing.bottom.mediumSmall,
                      typo.button,
                      display.block,
                      colors.text2,
                    ]}
                  >
                    <NodeTypeConfigLabel>{property.name}</NodeTypeConfigLabel>
                    {property.required && !property.disabled && (
                      <span css={styles.requiredAsterix}>*</span>
                    )}
                  </label>
                  {renderControls(
                    property,
                    nodeFiles!,
                    onFileUploaded,
                    onPropertyChanged,
                  )}
                </>
              );
            })}
        </div>
      </div>
    </NodeLauncherConfigWrapper>
  );
};
