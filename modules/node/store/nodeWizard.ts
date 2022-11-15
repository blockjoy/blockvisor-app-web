import { atom, selector } from 'recoil';
import { blockchainSelectors } from './blockchains';

const currentStep = atom<'1' | '2' | '3'>({
  key: 'nodeWizard.currentStep',
  default: '1',
});

const selectedBlockchain = atom<string | null>({
  key: 'nodeWizard.selectedBlockchain',
  default: null,
});

const selectedBlockchainWithNodeTypes = selector({
  key: 'nodeWizard.selectedBlockchainWithNodeTypes',
  get: ({ get }) => {
    const selected = get(selectedBlockchain);
    const blockchainsWithNodeTypes = get(
      blockchainSelectors.blockchainsWithNodeTypes,
    );

    return blockchainsWithNodeTypes.find((block) => block.name === selected);
  },
});

const selectedBlockchainSupportedNodeTypes = selector({
  key: 'nodeWizard.selectedBlockchainSupportedNodeTypes',
  get: ({ get }) => {
    const selected = get(selectedBlockchain);
    const blockchainsWithNodeTypes = get(
      blockchainSelectors.blockchainsWithNodeTypes,
    );

    return blockchainsWithNodeTypes.find((block) => block.name === selected)
      ?.supported_node_types;
  },
});

export const nodeWizardSelectors = {
  selectedBlockchainWithNodeTypes,
  selectedBlockchainSupportedNodeTypes,
};
export const nodeWizardAtoms = {
  currentStep,
  selectedBlockchain,
};
