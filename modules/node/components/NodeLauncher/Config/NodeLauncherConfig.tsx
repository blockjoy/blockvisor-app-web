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

type Props = {
  isConfigValid: boolean | null;
  nodeTypeProperties?: NodeProperty[];
  nodeFiles?: NodeFiles[];
  networkList: string[];
  versionList: string[];
  nodeLauncherState: NodeLauncherState;
  onFileUploaded: (e: any) => void;
  onNodeConfigPropertyChanged: (e: any) => void;
  onNodePropertyChanged: (name: string, value: any) => void;
};

export const NodeLauncherConfig: FC<Props> = ({
  isConfigValid,
  networkList,
  versionList,
  nodeLauncherState,
  onFileUploaded,
  onNodePropertyChanged,
  onNodeConfigPropertyChanged,
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

        {versionList.length > 1 && (
          <>
            <FormLabel>Version</FormLabel>
            <Select
              buttonText={<p>{nodeLauncherState.nodeTypeVersion}</p>}
              items={versionList?.map((r) => ({
                name: r,
                onClick: () => onNodePropertyChanged('nodeTypeVersion', r),
              }))}
            />
          </>
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

        {Boolean(networkList?.length) &&
          properties?.map((property: NodeProperty) => {
            return (
              <Fragment key={property.name}>
                <FormLabel>
                  {property.displayName || 'Luuuuuuuuuuuuuuuuk'}
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
