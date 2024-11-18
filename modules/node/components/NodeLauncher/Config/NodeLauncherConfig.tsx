import { Fragment } from 'react';
import { useRecoilValue } from 'recoil';
import { renderControls } from '@modules/node/utils/renderNodeLauncherConfigControls';
import { ProtocolVersion } from '@modules/grpc/library/blockjoy/v1/protocol';
import { FormLabel, FormHeader } from '@shared/components';
import {
  NodeLauncherPanel,
  NodeVersionSelect,
  nodeLauncherAtoms,
  FirewallDropdown,
  NodeLauncherState,
} from '@modules/node';
import { authSelectors } from '@modules/auth';
import { styles } from './NodeLauncherConfig.styles';
import { ImageProperty } from '@modules/grpc/library/blockjoy/v1/image';

type NodeLauncherConfigProps = {
  onNodeConfigPropertyChanged: (name: string, value: string | boolean) => void;
  onNodePropertyChanged: <K extends keyof NodeLauncherState>(
    name: K,
    value: NodeLauncherState[K],
  ) => void;
  onVersionChanged: (version: ProtocolVersion | null) => void;
};

export const NodeLauncherConfig = ({
  onNodeConfigPropertyChanged,
  onNodePropertyChanged,
  onVersionChanged,
}: NodeLauncherConfigProps) => {
  const nodeLauncher = useRecoilValue(nodeLauncherAtoms.nodeLauncher);
  const isSuperUser = useRecoilValue(authSelectors.isSuperUser);

  const { properties } = nodeLauncher;

  return (
    <NodeLauncherPanel>
      <div css={styles.wrapper}>
        <FormHeader>Configure</FormHeader>

        <FormLabel>Version</FormLabel>
        <NodeVersionSelect onVersionChanged={onVersionChanged} />

        <FormLabel hint="Add IP addresses that are allowed/denied">
          Firewall Rules
        </FormLabel>
        <FirewallDropdown
          isDisabled={!isSuperUser}
          onPropertyChanged={onNodePropertyChanged}
          allowedIps={nodeLauncher?.allowIps}
          deniedIps={nodeLauncher?.denyIps}
        />

        {/* TODO: implement image properties
        
        {properties?.map((property: ImageProperty) => {
          return (
            <Fragment key={property.imagePropertyId}>
              <FormLabel>{property.key}</FormLabel>
              {renderControls(property, onNodeConfigPropertyChanged)}
            </Fragment>
          );
        })} */}
      </div>
    </NodeLauncherPanel>
  );
};
