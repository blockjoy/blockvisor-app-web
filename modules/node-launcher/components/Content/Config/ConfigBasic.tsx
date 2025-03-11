import { useEffect, useState } from 'react';
import { useRecoilState, useRecoilValue } from 'recoil';
import {
  nodeLauncherAtoms,
  nodeLauncherSelectors,
} from '@modules/node-launcher';
import { spacing } from 'styles/utils.spacing.styles';
import { styles } from './Config.styles';
import {
  createVariantKey,
  getAvailableVariantOptions,
  parseVariant,
} from '@modules/node-launcher/utils/variant';
import { RegionSelect } from './Select/RegionSelect/RegionSelect';
import {
  NODE_LAUNCHER_NODE_NETWROKS,
  NODE_LAUNCHER_NODE_TYPES,
} from '@modules/node-launcher/constants/nodeLauncher';
import { ConfigItem } from './ConfigItem/ConfigItem';
import { ConfigItemContent } from './ConfigItem/ConfigItemContent/ConfigItemContent';
import IconNodeNetwork from '@public/assets/icons/app/NodeNetwork.svg';
import IconNodeType from '@public/assets/icons/app/NodeType.svg';
import IconNodeClient from '@public/assets/icons/app/NodeClient.svg';
import IconLocation from '@public/assets/icons/common/Location.svg';

export const ConfigBasic = () => {
  const variants = useRecoilValue(nodeLauncherAtoms.variants);
  const clients = useRecoilValue(nodeLauncherSelectors.clients);
  const networks = useRecoilValue(nodeLauncherSelectors.networks);
  const nodeTypes = useRecoilValue(nodeLauncherSelectors.nodeTypes);
  const [selectedVariant, setSelectedVariant] = useRecoilState(
    nodeLauncherAtoms.selectedVariant,
  );
  const selectedProtocol = useRecoilValue(nodeLauncherAtoms.selectedProtocol);

  const defaultVariant = parseVariant(selectedVariant ?? '');

  const [selectedClient, setSelectedClient] = useState<string | null>(
    defaultVariant.client,
  );
  const [selectedNetwork, setSelectedNetwork] = useState<string | null>(
    defaultVariant.network,
  );
  const [selectedNodeType, setSelectedNodeType] = useState<string | null>(
    defaultVariant.nodeType,
  );

  const [availableClients, setAvailableClients] = useState<string[]>([]);
  const [availableNodeTypes, setAvailableNodeTypes] = useState<string[]>([]);
  const [availableNetworks, setAvailableNetworks] = useState<string[]>([]);

  useEffect(() => {
    const _availableClients = getAvailableVariantOptions(
      'client',
      variants,
      selectedClient,
      selectedNetwork,
      selectedNodeType,
    );

    setAvailableClients(_availableClients);

    const _availableNodeTypes = getAvailableVariantOptions(
      'nodeType',
      variants,
      selectedClient,
      selectedNetwork,
      selectedNodeType,
    );

    setAvailableNodeTypes(_availableNodeTypes);

    const _availableNetworks = getAvailableVariantOptions(
      'network',
      variants,
      selectedClient,
      selectedNetwork,
      selectedNodeType,
    );

    setAvailableNetworks(_availableNetworks);

    const nextVariant = createVariantKey(
      selectedClient,
      selectedNetwork,
      selectedNodeType,
    );

    setSelectedVariant(nextVariant);
  }, [selectedClient, selectedNetwork, selectedNodeType]);

  const handleNodeType = (newNodeType: string) =>
    setSelectedNodeType(newNodeType);
  const handleClient = (newClient: string) => setSelectedClient(newClient);
  const handleNetwork = (newNetwork: string) => setSelectedNetwork(newNetwork);

  return (
    <>
      <ConfigItem
        title="Node Network"
        Icon={IconNodeNetwork}
        additionalStyles={[styles.grid(3), spacing.bottom.mediumLarge]}
      >
        {networks.map((network) => {
          const isAvailable = availableNetworks.includes(network);
          const content = NODE_LAUNCHER_NODE_NETWROKS.find(
            (type) => type.key === network?.toLowerCase(),
          );
          const description = content?.description?.replace(
            '%{protocol}',
            selectedProtocol?.name ?? '',
          );

          return (
            <ConfigItemContent
              key={network}
              handleClick={() => handleNetwork(network)}
              isActive={selectedNetwork == network}
              isDisabled={!isAvailable}
            >
              <h4>{network}</h4>
              {content && <p>{description}</p>}
            </ConfigItemContent>
          );
        })}
      </ConfigItem>

      <ConfigItem
        title="Node Type"
        Icon={IconNodeType}
        additionalStyles={[styles.grid(2), spacing.bottom.mediumLarge]}
      >
        {nodeTypes.map((nodeType) => {
          const isAvailable = availableNodeTypes.includes(nodeType);
          const content = NODE_LAUNCHER_NODE_TYPES.find(
            (type) => type.key === nodeType?.toLowerCase(),
          );

          return (
            <ConfigItemContent
              key={nodeType}
              handleClick={() => handleNodeType(nodeType)}
              isActive={selectedNodeType === nodeType}
              isDisabled={!isAvailable}
            >
              <h4>{content?.title ?? nodeType}</h4>
              {content && <p>{content.description}</p>}
            </ConfigItemContent>
          );
        })}
      </ConfigItem>

      <ConfigItem
        title="Node Client"
        Icon={IconNodeClient}
        additionalStyles={[styles.grid(3), spacing.bottom.mediumLarge]}
      >
        {clients.map((client) => {
          const isAvailable = availableClients.includes(client);

          return (
            <ConfigItemContent
              key={client}
              handleClick={() => handleClient(client)}
              isActive={selectedClient === client}
              isDisabled={!isAvailable}
            >
              <h4>{client}</h4>
            </ConfigItemContent>
          );
        })}
      </ConfigItem>
      <ConfigItem
        title="Region"
        Icon={IconLocation}
        additionalStyles={[spacing.bottom.mediumLarge]}
      >
        <RegionSelect />
      </ConfigItem>
    </>
  );
};
