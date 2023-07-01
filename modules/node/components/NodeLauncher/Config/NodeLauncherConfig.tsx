import { HostSelect, PillPicker, SvgIcon } from '@shared/components';
import { NodeTypeConfigLabel, FirewallDropdown } from '@modules/node';
import { FC, Fragment } from 'react';
import {
  FileUpload,
  Textbox,
  Switch,
  FormLabel,
  FormHeader,
} from '@shared/components';
import { colors } from 'styles/utils.colors.styles';
import { spacing } from 'styles/utils.spacing.styles';
import { typo } from 'styles/utils.typography.styles';
import { styles } from './NodeLauncherConfig.styles';
import IconInfo from '@public/assets/icons/common/Info.svg';
import { NodeLauncherConfigWrapper } from './NodeLauncherConfigWrapper';
import { NodeProperty, UiType } from '@modules/grpc/library/blockjoy/v1/node';
import { NodeLauncherState } from '../NodeLauncher';
import { Host } from '@modules/grpc/library/blockjoy/v1/host';

type Props = {
  isConfigValid: boolean | null;
  nodeTypeProperties?: NodeProperty[];
  nodeFiles?: NodeFiles[];
  networkList: string[];
  nodeLauncherState: NodeLauncherState;
  selectedHost: Host | null;
  onFileUploaded: (e: any) => void;
  onNodeConfigPropertyChanged: (e: any) => void;
  onNodePropertyChanged: (name: string, value: any) => void;
  onHostChanged: (host: Host | null) => void;
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
    case UiType.UI_TYPE_PASSWORD:
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
  networkList,
  nodeLauncherState,
  selectedHost,
  onFileUploaded,
  onNodePropertyChanged,
  onNodeConfigPropertyChanged,
  onHostChanged,
}) => {
  const { network, properties, keyFiles } = nodeLauncherState;

  return (
    <NodeLauncherConfigWrapper>
      <div css={styles.wrapper}>
        <FormHeader>Configure</FormHeader>
        {isConfigValid !== null && !!networkList?.length && (
          <>
            <FormLabel>Network</FormLabel>
            <PillPicker
              name="network"
              items={networkList}
              selectedItem={network}
              onChange={onNodePropertyChanged}
              tabIndexStart={3}
            />
          </>
        )}

        {isConfigValid !== null && !networkList?.length && (
          <div css={[spacing.bottom.medium, colors.warning, typo.small]}>
            Missing Network Configuration
          </div>
        )}

        <FormLabel>Host</FormLabel>
        <HostSelect selectedHost={selectedHost} onChange={onHostChanged} />

        <FormLabel>
          Firewall Rules{' '}
          <SvgIcon
            isDefaultColor
            tooltip="Add IP addresses that are allowed/denied"
          >
            <IconInfo />
          </SvgIcon>
        </FormLabel>

        <FirewallDropdown
          onPropertyChanged={onNodePropertyChanged}
          allowedIps={nodeLauncherState.allowIps}
          deniedIps={nodeLauncherState.denyIps}
        />

        {Boolean(networkList?.length) &&
          properties?.map((property: NodeProperty) => {
            return (
              <Fragment key={property.name}>
                <FormLabel>
                  <NodeTypeConfigLabel>{property.name}</NodeTypeConfigLabel>
                  {property.required && !property.disabled && (
                    <span css={styles.requiredAsterix}>*</span>
                  )}
                </FormLabel>
                {renderControls(
                  property,
                  keyFiles!,
                  onFileUploaded,
                  onNodeConfigPropertyChanged,
                )}
              </Fragment>
            );
          })}
      </div>
    </NodeLauncherConfigWrapper>
  );
};
