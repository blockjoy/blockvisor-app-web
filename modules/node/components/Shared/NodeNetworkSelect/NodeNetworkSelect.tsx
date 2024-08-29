import { useRecoilValue } from 'recoil';
import { NetworkConfig } from '@modules/grpc/library/blockjoy/common/v1/blockchain';
import { nodeLauncherAtoms, nodeLauncherSelectors } from '@modules/node';
import { PillPicker } from '@shared/components';
import { colors } from 'styles/utils.colors.styles';
import { spacing } from 'styles/utils.spacing.styles';
import { typo } from 'styles/utils.typography.styles';

type ExtendedNetworkConfig = NetworkConfig & { id: string };

type NodeNetworkSelectProps = {
  onNetworkChanged: (value: NetworkConfig) => void;
};

export const NodeNetworkSelect = ({
  onNetworkChanged,
}: NodeNetworkSelectProps) => {
  const networks = useRecoilValue(nodeLauncherSelectors.networks);
  const selectedNetwork = useRecoilValue(nodeLauncherAtoms.selectedNetwork);
  const selectedVersion = useRecoilValue(nodeLauncherAtoms.selectedVersion);

  const extendedNetworks: ExtendedNetworkConfig[] = networks?.map((n) => ({
    ...n,
    id: n.name,
  }));

  const extendedSelectedNetwork: ExtendedNetworkConfig | null = selectedNetwork
    ? {
        ...selectedNetwork,
        id: selectedNetwork.name,
      }
    : null;

  const handleNetworkChanged = (item: ExtendedNetworkConfig) => {
    const { id, ...updatedNetwork } = item;
    onNetworkChanged(updatedNetwork);
  };

  if (!networks.length)
    return (
      <div css={[spacing.bottom.medium, colors.warning, typo.small]}>
        {selectedVersion
          ? 'Missing Network Configuration'
          : 'Version List Empty'}
      </div>
    );

  return (
    selectedVersion && (
      <PillPicker
        name="network"
        items={extendedNetworks}
        selectedItem={extendedSelectedNetwork!}
        onChange={handleNetworkChanged}
      />
    )
  );
};
