import { useRecoilState } from 'recoil';
import { nodeWizardAtoms } from '../store/nodeWizard';

export function useNodeWizard() {
  const [currentStep, setCurrentStep] = useRecoilState(
    nodeWizardAtoms.currentStep,
  );
  const [selectedBlockchain, setSelectedBlockchain] = useRecoilState(
    nodeWizardAtoms.selectedBlockchain,
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
    selectedBlockchain,
    selectBlockchain,
    isFirstStep,
    isSecondStep,
    isThirdStep,
  };
}
