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

const selectedNodeType = atom<number | null>({
  key: 'nodeWizard.nodeType',
  default: 2,
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

const selectedNodeTypeProperties = selector({
  key: 'nodeWizard.selectedNodeTypeProperties',
  get: ({ get }) => {
    const nodeType = get(selectedNodeType);
    const blockchainsWithNodeTypes = get(selectedBlockchainSupportedNodeTypes);

    return blockchainsWithNodeTypes?.find((n: any) => n.id === nodeType)
      .properties;
  },
});

export const nodeWizardSelectors = {
  selectedBlockchainWithNodeTypes,
  selectedBlockchainSupportedNodeTypes,
  selectedNodeTypeProperties,
};

export const nodeWizardAtoms = {
  currentStep,
  selectedBlockchain,
  selectedNodeType,
};
