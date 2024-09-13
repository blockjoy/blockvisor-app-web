import { useRecoilValue } from 'recoil';
import { NodeType } from '@modules/grpc/library/blockjoy/common/v1/node';
import {
  getNodeTypes,
  nodeLauncherSelectors,
  blockchainAtoms,
} from '@modules/node';
import { PillPicker } from '@shared/components';

type NodeClientProps = {
  onProtocolSelected: (blockchainId: string, nodeType: NodeType) => void;
};

export const NodeClient = ({ onProtocolSelected }: NodeClientProps) => {
  const clients = useRecoilValue(nodeLauncherSelectors.clients);
  const selectedClient = useRecoilValue(
    nodeLauncherSelectors.selectedBlockchainClient,
  );
  const blockchains = useRecoilValue(blockchainAtoms.blockchains);

  const handleChanged = (client: BlockchainClient) => {
    const activeBlockchain = blockchains.find(
      (blockchain) => blockchain.id === client.id,
    );
    const nodeTypes = getNodeTypes(activeBlockchain!);

    onProtocolSelected(activeBlockchain?.id!, nodeTypes?.[0]?.nodeType);
  };

  return (
    <PillPicker
      name="nodeType"
      items={clients}
      selectedItem={selectedClient!}
      onChange={handleChanged}
    />
  );
};
