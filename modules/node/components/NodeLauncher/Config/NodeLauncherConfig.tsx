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
  NodeVariantSelect,
  NodeLauncherPropertyGroup,
} from '@modules/node';
import { authSelectors } from '@modules/auth';
import { styles } from './NodeLauncherConfig.styles';
import { ImageProperty } from '@modules/grpc/library/blockjoy/v1/image';
import { UiType } from '@modules/grpc/library/blockjoy/common/v1/protocol';

type NodeLauncherConfigProps = {
  onNodeConfigPropertyChanged: (name: string, value: string | boolean) => void;
  onNodePropertyChanged: <K extends keyof NodeLauncherState>(
    name: K,
    value: NodeLauncherState[K],
  ) => void;
  onVersionChanged: (version: ProtocolVersion | null) => void;
  onVariantChanged: (variant: string) => void;
};

export const NodeLauncherConfig = ({
  onNodeConfigPropertyChanged,
  onNodePropertyChanged,
  onVersionChanged,
  onVariantChanged,
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

        <FormLabel>Variant</FormLabel>
        <NodeVariantSelect onChange={onVariantChanged} />

        <FormLabel hint="Add IP addresses that are allowed/denied">
          Firewall Rules
        </FormLabel>
        <FirewallDropdown
          isDisabled={!isSuperUser}
          onPropertyChanged={onNodePropertyChanged}
          allowedIps={nodeLauncher?.allowIps}
          deniedIps={nodeLauncher?.denyIps}
        />

        {properties?.map((propertyGroup: NodeLauncherPropertyGroup) => {
          const isRequired =
            propertyGroup.uiType === UiType.UI_TYPE_TEXT ||
            propertyGroup.uiType === UiType.UI_TYPE_PASSWORD;

          return (
            <Fragment key={propertyGroup.name}>
              <FormLabel isRequired={isRequired}>
                {propertyGroup.name}
              </FormLabel>
              {renderControls(propertyGroup, onNodeConfigPropertyChanged)}
            </Fragment>
          );
        })}
      </div>
    </NodeLauncherPanel>
  );
};
