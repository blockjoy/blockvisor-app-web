import { nodeAtoms } from '@modules/node/store/nodeAtoms';
import { Portal } from '@shared/components';
import { Modal } from '@shared/components/Modal/Modal';
import { useRecoilValue } from 'recoil';
import { BlockchainSelector } from '../BlockchainSelector/BlockChainSelector';

export function NodeWizard() {
  const isActive = useRecoilValue(nodeAtoms.nodeWizardActive);
  return (
    <Portal wrapperId="node-wizard">
      <Modal isOpen={isActive}>
        <BlockchainSelector />
      </Modal>
    </Portal>
  );
}
