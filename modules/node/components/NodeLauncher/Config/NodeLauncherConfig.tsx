import { Fragment } from 'react';
import { useRecoilValue } from 'recoil';
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
import { renderControls } from '@modules/node/utils/renderNodeLauncherConfigControls';
import { BlockchainVersion } from '@modules/grpc/library/blockjoy/v1/blockchain';
import {
  FirewallDropdown,
  nodeLauncherAtoms,
  nodeLauncherSelectors,
} from '@modules/node';

type NodeLauncherConfigProps = {
  nodeTypeProperties?: NodeProperty[];
  nodeFiles?: NodeFiles[];
  onFileUploaded: (e: any) => void;
  onNodeConfigPropertyChanged: (e: any) => void;
  onNodePropertyChanged: (name: string, value: any) => void;
  onVersionChanged: (version: BlockchainVersion) => void;
};

export const NodeLauncherConfig = ({
  onFileUploaded,
  onNodePropertyChanged,
  onNodeConfigPropertyChanged,
  onVersionChanged,
}: NodeLauncherConfigProps) => {
  const nodeLauncher = useRecoilValue(nodeLauncherAtoms.nodeLauncher);
  const networks = useRecoilValue(nodeLauncherSelectors.networks);
  const versions = useRecoilValue(nodeLauncherSelectors.versions);
  const selectedVersion = useRecoilValue(nodeLauncherAtoms.selectedVersion);

  const { network, properties, keyFiles } = nodeLauncher;

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
          allowedIps={nodeLauncher?.allowIps}
          deniedIps={nodeLauncher?.denyIps}
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
