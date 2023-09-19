import { FirewallDropdown } from '@modules/node';
import { FC, Fragment } from 'react';
import {
  FormLabel,
  FormHeader,
  PillPicker,
  SvgIcon,
  Select,
} from '@shared/components';
import { colors } from 'styles/utils.colors.styles';
import { spacing } from 'styles/utils.spacing.styles';
import { typo } from 'styles/utils.typography.styles';
import { styles } from './NodeLauncherConfig.styles';
import IconInfo from '@public/assets/icons/common/Info.svg';
import { NodeLauncherConfigWrapper } from './NodeLauncherConfigWrapper';
import { NodeProperty } from '@modules/grpc/library/blockjoy/v1/node';
import { NodeLauncherState } from '../NodeLauncher';
import { renderControls } from '@modules/node/utils/renderNodeLauncherConfigControls';
import {
  BlockchainNetwork,
  BlockchainVersion,
} from '@modules/grpc/library/blockjoy/v1/blockchain';

type Props = {
  nodeTypeProperties?: NodeProperty[];
  nodeFiles?: NodeFiles[];
  networks?: BlockchainNetwork[];
  versions: BlockchainVersion[];
  selectedVersion?: BlockchainVersion;
  nodeLauncherState: NodeLauncherState;
  onFileUploaded: (e: any) => void;
  onNodeConfigPropertyChanged: (e: any) => void;
  onNodePropertyChanged: (name: string, value: any) => void;
  onVersionChanged: (version: BlockchainVersion) => void;
};

export const NodeLauncherConfig: FC<Props> = ({
  networks,
  versions,
  selectedVersion,
  nodeLauncherState,
  onFileUploaded,
  onNodePropertyChanged,
  onNodeConfigPropertyChanged,
  onVersionChanged,
}) => {
  const { network, properties, keyFiles } = nodeLauncherState;

  return (
    <NodeLauncherConfigWrapper>
      <div css={styles.wrapper}>
        <FormHeader>Configure</FormHeader>

        <FormLabel>Network</FormLabel>

        {selectedVersion && Boolean(networks?.length) && (
          <PillPicker
            name="network"
            items={networks!.map((n) => n.name)}
            selectedItem={network!}
            onChange={onNodePropertyChanged}
            tabIndexStart={3}
          />
        )}

        {selectedVersion && !networks?.length && (
          <div css={[spacing.bottom.medium, colors.warning, typo.small]}>
            Missing Network Configuration
          </div>
        )}

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

        {versions.length > 1 && (
          <>
            <FormLabel>Version</FormLabel>
            <Select
              buttonText={<p>{selectedVersion?.version}</p>}
              items={versions.map((version) => ({
                name: version.version,
                onClick: () => onVersionChanged(version),
              }))}
            />
          </>
        )}

        {Boolean(networks?.length) &&
          properties?.map((property: NodeProperty) => {
            return (
              <Fragment key={property.name}>
                <FormLabel>
                  {property.displayName}
                  {property.required && (
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
