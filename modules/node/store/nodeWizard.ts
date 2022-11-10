import { atom } from 'recoil';

const currentStep = atom<'1' | '2' | '3'>({
  key: 'nodeWizard.currentStep',
  default: '1',
});

const selectedBlockchain = atom<string | null>({
  key: 'nodeWizard.selectedBlockchain',
  default: null,
});

export const nodeWizardAtoms = {
  currentStep,
  selectedBlockchain,
};
