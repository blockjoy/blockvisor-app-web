import { NodeTypeConfigLabel } from '@shared/components';
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
  nodeTypeProperties?: NodeTypeConfig[];
  nodeFiles?: NodeFiles[];
  onFileUploaded: (e: any) => void;
  onPropertyChanged: (e: any) => void;
};

export const renderControls = (
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
    case 'wallet_address':
      return (
        <Textbox name={property.name} onPropertyChanged={onPropertyChanged} />
      );
    case 'switch':
      return (
        <Switch
          disabled={!!property.disabled}
          tooltip="You will be able to edit this setting soon"
          name={property.name}
          onPropertyChanged={onPropertyChanged}
        />
      );
  }
};

export const NodeLauncherConfig: FC<Props> = ({
  nodeTypeProperties,
  nodeFiles,
  onFileUploaded,
  onPropertyChanged,
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
        <div
          css={[
            styles.alert,
            nodeTypeProperties?.length === 0
              ? styles.alertSuccess
              : styles.alertDanger,
          ]}
        >
          Node requires configuration information.
        </div>
        <div css={styles.nodeTypeProperties}>
          {nodeTypeProperties?.map((property: NodeTypeConfig) => {
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
