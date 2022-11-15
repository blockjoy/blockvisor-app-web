import { useRecoilState, useRecoilValue } from 'recoil';
import { nodeWizardAtoms, nodeWizardSelectors } from '../store/nodeWizard';

export function useNodeWizard() {
  const [currentStep, setCurrentStep] = useRecoilState(
    nodeWizardAtoms.currentStep,
  );
  const [, setSelectedBlockchain] = useRecoilState(
    nodeWizardAtoms.selectedBlockchain,
  );

  const selectedWithNodeTypes = useRecoilValue(
    nodeWizardSelectors.selectedBlockchainWithNodeTypes,
  );

  const supportedNodeTypes = useRecoilValue(
    nodeWizardSelectors.selectedBlockchainSupportedNodeTypes,
  );

  const selectBlockchain = (name: string, id: string) => {
    setSelectedBlockchain({ name, id });
    setCurrentStep('2');
  };

  const isFirstStep = () => currentStep === '1';
  const isSecondStep = () => currentStep === '2';
  const isThirdStep = () => currentStep === '3';

  return {
    currentStep,
    selectedBlockchain: selectedWithNodeTypes,
    supportedNodeTypes,
    selectBlockchain,
    isFirstStep,
    isSecondStep,
    isThirdStep,
  };
}
