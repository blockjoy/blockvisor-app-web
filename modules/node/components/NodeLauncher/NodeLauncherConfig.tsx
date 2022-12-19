import { NodeTypeConfigLabel } from '@shared/components';
import { FC } from 'react';
import { FileUpload } from './formComponents/FileUpload/FileUpload';
import { Textbox } from './formComponents/Textbox/Textbox';
import { Switch } from './formComponents/Switch/Switch';
import { LockedSwitch } from './formComponents/LockedSwitch/LockedSwitch';
import { colors } from 'styles/utils.colors.styles';
import { display } from 'styles/utils.display.styles';
import { flex } from 'styles/utils.flex.styles';
import { spacing } from 'styles/utils.spacing.styles';
import { typo } from 'styles/utils.typography.styles';
import { styles } from './NodeLauncherConfig.styles';

type Props = {
  nodeTypeProperties?: NodeTypeConfig[];
  onFileUploaded: (e: any) => void;
  onPropertyChanged: (e: any) => void;
};

export const NodeLauncherConfig: FC<Props> = ({
  nodeTypeProperties,
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
          console.log('property', property);

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

              {property.ui_type === 'key-upload' && (
                <div>
                  <FileUpload
                    currentFiles={property.value}
                    multiple={true}
                    onChange={onFileUploaded}
                    name={property.name}
                    remove={() => console.log('shit')}
                    placeholder="Upload validator keys"
                  />
                </div>
              )}
              {property.ui_type === 'string' && (
                <div>
                  <Textbox
                    name={property.name}
                    onPropertyChanged={onPropertyChanged}
                  />
                </div>
              )}
              {property.ui_type === 'switch' && (
                <div>
                  <Switch
                    disabled={!!property.disabled}
                    tooltip="You will be able to edit this setting soon"
                    name={property.name}
                    onPropertyChanged={onPropertyChanged}
                  />
                </div>
              )}
            </>
          );
        })}
      </div>
    </div>
  );
};
