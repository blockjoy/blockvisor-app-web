import { Fragment } from 'react';
import { useRecoilValue } from 'recoil';
import { NodeProperty } from '@modules/grpc/library/blockjoy/v1/node';
import { renderControls } from '@modules/node/utils/renderNodeLauncherConfigControls';
import { BlockchainVersion } from '@modules/grpc/library/blockjoy/v1/blockchain';
import { NetworkConfig } from '@modules/grpc/library/blockjoy/common/v1/blockchain';
import { NodeType } from '@modules/grpc/library/blockjoy/common/v1/node';
import { FormLabel, FormHeader } from '@shared/components';
import {
  NodeLauncherPanel,
  NodeVersionSelect,
  nodeLauncherAtoms,
  nodeLauncherSelectors,
  NodeTypeSelect,
  NodeNetworkSelect,
  NodeClient,
} from '@modules/node';
import { authSelectors } from '@modules/auth';
import { styles } from './NodeLauncherConfig.styles';

type NodeLauncherConfigProps = {
  onFileUploaded: (e: any) => void;
  onNodeConfigPropertyChanged: (name: string, value: string | boolean) => void;
  onVersionChanged: (version: BlockchainVersion | null) => void;
  onNetworkChanged: (network: NetworkConfig) => void;
  onProtocolSelected: (blockchainId: string, nodeType: NodeType) => void;
};

export const NodeLauncherConfig = ({
  onFileUploaded,
  onNodeConfigPropertyChanged,
  onVersionChanged,
  onNetworkChanged,
  onProtocolSelected,
}: NodeLauncherConfigProps) => {
  const nodeLauncher = useRecoilValue(nodeLauncherAtoms.nodeLauncher);
  const networks = useRecoilValue(nodeLauncherSelectors.networks);
  const selectedVersion = useRecoilValue(nodeLauncherAtoms.selectedVersion);
  const isSuperUser = useRecoilValue(authSelectors.isSuperUser);
  const clients = useRecoilValue(nodeLauncherSelectors.clients);

  const { properties, keyFiles } = nodeLauncher;

  return (
    <NodeLauncherPanel>
      <div css={styles.wrapper}>
        <FormHeader>Configure</FormHeader>

        {clients.length &&
          !(clients.length === 1 && clients[0].name === 'Default') && (
            <>
              <FormLabel>Client</FormLabel>
              <NodeClient onProtocolSelected={onProtocolSelected} />
            </>
          )}

        <FormLabel>Node Type</FormLabel>
        <NodeTypeSelect />

        <FormLabel>Version</FormLabel>
        <NodeVersionSelect onVersionChanged={onVersionChanged} />

        {(networks.length || isSuperUser) && selectedVersion && (
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
