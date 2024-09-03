import { Fragment } from 'react';
import { useRecoilValue } from 'recoil';
import { NodeProperty } from '@modules/grpc/library/blockjoy/v1/node';
import { renderControls } from '@modules/node/utils/renderNodeLauncherConfigControls';
import { BlockchainVersion } from '@modules/grpc/library/blockjoy/v1/blockchain';
import { NetworkConfig } from '@modules/grpc/library/blockjoy/common/v1/blockchain';
import { FormLabel, FormHeader } from '@shared/components';
import {
  NodeLauncherPanel,
  NodeVersionSelect,
  nodeLauncherAtoms,
  nodeLauncherSelectors,
  NodeTypeSelect,
  NodeNetworkSelect,
} from '@modules/node';
import { authSelectors } from '@modules/auth';
import { styles } from './NodeLauncherConfig.styles';

type NodeLauncherConfigProps = {
  onFileUploaded: (e: any) => void;
  onNodeConfigPropertyChanged: (name: string, value: string | boolean) => void;
  onVersionChanged: (version: BlockchainVersion | null) => void;
  onNetworkChanged: (network: NetworkConfig) => void;
};

export const NodeLauncherConfig = ({
  onFileUploaded,
  onNodeConfigPropertyChanged,
  onVersionChanged,
  onNetworkChanged,
}: NodeLauncherConfigProps) => {
  const nodeLauncher = useRecoilValue(nodeLauncherAtoms.nodeLauncher);
  const networks = useRecoilValue(nodeLauncherSelectors.networks);
  const isSuperUser = useRecoilValue(authSelectors.isSuperUser);

  const { properties, keyFiles } = nodeLauncher;

  return (
    <NodeLauncherPanel>
      <div css={styles.wrapper}>
        <FormHeader>Configure</FormHeader>

        <FormLabel>Node Type</FormLabel>
        <NodeTypeSelect />

        <FormLabel>Version</FormLabel>
        <NodeVersionSelect onVersionChanged={onVersionChanged} />

        {(networks.length || isSuperUser) && (
          <>
            <FormLabel>Network</FormLabel>
            <NodeNetworkSelect onNetworkChanged={onNetworkChanged} />
          </>
        )}

        {/* TODO: Add back in when firewall implemented */}
        {/* <FormLabel hint="Add IP addresses that are allowed/denied">
          Firewall Rules
        </FormLabel>
        <FirewallDropdown
          isDisabled={!isSuperUser}
          onPropertyChanged={onNodePropertyChanged}
          allowedIps={nodeLauncher?.allowIps}
          deniedIps={nodeLauncher?.denyIps}
        /> */}

        {Boolean(networks?.length) &&
          properties?.map((property: NodeProperty) => {
            return (
              <Fragment key={property.name}>
                <FormLabel isRequired={property.required}>
                  {property.displayName}
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
    </NodeLauncherPanel>
  );
};
