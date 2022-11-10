import { useRecoilState } from 'recoil';
import { nodeWizardAtoms } from '../store/nodeWizard';

export function useNodeWizard() {
  const [currentStep, setCurrentStep] = useRecoilState(
    nodeWizardAtoms.currentStep,
  );
  const [selectedBlockChain, setSelectedBlockchain] = useRecoilState(
    nodeWizardAtoms.selectedBlockchain,
  );

  const selectBlockchain = (blockchain: string) => {
    setSelectedBlockchain(blockchain);
    setCurrentStep('2');
  };

  const isFirstStep = () => currentStep === '1';
  const isSecondStep = () => currentStep === '2';
  const isThirdStep = () => currentStep === '3';

  return {
    currentStep,
    selectedBlockChain,
    selectBlockchain,
    isFirstStep,
    isSecondStep,
    isThirdStep,
  };
}
