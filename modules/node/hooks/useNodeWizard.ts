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

  const [, setSelectedNodeType] = useRecoilState(
    nodeWizardAtoms.selectedNodeType,
  );

  const selectedNodeTypeProperties = useRecoilValue(
    nodeWizardSelectors.selectedNodeTypeProperties,
  );

  const supportedNodeTypes = useRecoilValue(
    nodeWizardSelectors.selectedBlockchainSupportedNodeTypes,
  );

  const selectBlockchain = (name: string, id: string) => {
    setSelectedBlockchain(name);
    setCurrentStep('2');
  };

  const updateSelected = (name?: string) => {
    if (name) {
      setSelectedBlockchain(name);
    }
  };

  const selectNodeType = (id: number) => {
    setSelectedNodeType(id);
  };

  const resetWizard = () => {
    setCurrentStep('1');
  };

  const isFirstStep = () => currentStep === '1';
  const isSecondStep = () => currentStep === '2';
  const isThirdStep = () => currentStep === '3';

  return {
    currentStep,
    selectedBlockchain: selectedWithNodeTypes,
    supportedNodeTypes,
    nodeTypeProperties: selectedNodeTypeProperties,
    selectNodeType,
    resetWizard,
    selectBlockchain,
    updateSelected,
    isFirstStep,
    isSecondStep,
    isThirdStep,
  };
}
