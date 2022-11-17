import { AddNode } from '@modules/node';
import { useNodeWizard } from '@modules/node/hooks/useNodeWizard';
import { nodeAtoms } from '@modules/node/store/nodeAtoms';
import { Modal } from '@shared/components/Modal/Modal';
import { useRecoilValue } from 'recoil';
import { BlockchainSelector } from '../BlockchainSelector/BlockChainSelector';

export function NodeWizard() {
  const { isFirstStep, isSecondStep } = useNodeWizard();
  const isActive = useRecoilValue(nodeAtoms.nodeWizardActive);

  return (
    <Modal portalId="node-wizard" isOpen={isActive}>
      {isFirstStep() ? <BlockchainSelector /> : null}
      {isSecondStep() ? <AddNode /> : null}
    </Modal>
  );
}
