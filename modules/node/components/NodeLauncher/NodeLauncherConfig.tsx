import {
  NodeTypeConfigLabel,
  Alert,
  PillPicker,
  Skeleton,
  Switch,
} from '@shared/components';
import { FC, Fragment } from 'react';
import { FileUpload } from './formComponents/FileUpload/FileUpload';
import { Textbox } from './formComponents/Textbox/Textbox';
import { colors } from 'styles/utils.colors.styles';
import { display } from 'styles/utils.display.styles';
import { spacing } from 'styles/utils.spacing.styles';
import { typo } from 'styles/utils.typography.styles';
import { styles } from './NodeLauncherConfig.styles';
import { NodeLauncherConfigWrapper } from './NodeLauncherConfigWrapper';
import { NodeProperty, UiType } from '@modules/grpc/library/blockjoy/v1/node';

type Props = {
  isConfigValid: boolean | null;
  nodeTypeProperties?: NodeProperty[];
  nodeFiles?: NodeFiles[];
  networkList: string[];
  nodeNetwork: string;
  onFileUploaded: (e: any) => void;
  onPropertyChanged: (e: any) => void;
  onNetworkChanged: (network: string) => void;
};

const renderControls = (
  property: NodeProperty,
  nodeFiles: NodeFiles[],
  onFileUploaded: (e: any) => void,
  onPropertyChanged: (e: any) => void,
) => {
  switch (property.uiType) {
    case UiType.UI_TYPE_FILE_UPLOAD:
      return (
        <FileUpload
          tabIndex={5}
          currentFiles={nodeFiles?.find((f) => f.name === property.name)?.files}
          multiple={true}
          onChange={onFileUploaded}
          name={property.name}
          placeholder="Upload validator keys"
        />
      );
    case UiType.UI_TYPE_TEXT:
      return (
        <Textbox
          tabIndex={5}
          type="password"
          isRequired={property?.required && !property.value}
          name={property.name}
          onPropertyChanged={onPropertyChanged}
        />
      );
    case UiType.UI_TYPE_TEXT:
      return (
        <Textbox
          tabIndex={5}
          type="text"
          isRequired={property?.required && !property.value}
          name={property.name}
          onPropertyChanged={onPropertyChanged}
        />
      );
    case UiType.UI_TYPE_SWITCH:
      return (
        <Switch
          tabIndex={!!property.disabled ? -1 : 5}
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
          <Alert isSuccess={isConfigValid!}>
            {isConfigValid === null ? (
              <Skeleton />
            ) : isConfigValid === true ? (
              'All systems GO!'
            ) : (
              'Node requires configuration information.'
            )}
          </Alert>
        </div>
        <div css={styles.nodeTypeProperties}>
          {isConfigValid !== null && (
            <>
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
              <PillPicker
                items={networkList}
                selectedItem={nodeNetwork}
                onChange={onNetworkChanged}
                tabIndexStart={3}
              />
            </>
          )}

          {isConfigValid !== null && !networkList?.length && (
            <div css={[spacing.bottom.medium, colors.warning, typo.small]}>
              Missing Network Configuration
            </div>
          )}

          {Boolean(networkList?.length) &&
            nodeTypeProperties?.map((property: NodeProperty) => {
              return (
                <Fragment key={property.name}>
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
                </Fragment>
              );
            })}
        </div>
      </div>
    </NodeLauncherConfigWrapper>
  );
};
