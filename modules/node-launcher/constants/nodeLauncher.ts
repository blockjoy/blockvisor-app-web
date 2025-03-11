import { NodeLauncherError } from '../types/NodeLauncher';

export const NODE_LAUNCHER_STEPS = [
  {
    key: 'protocol',
    title: 'Select protocol',
    desc: 'Select provider you want to run node on',
  },
  {
    key: 'config',
    title: 'Config',
    desc: 'Config your node',
  },
  {
    key: 'Summary',
    title: 'Summary',
    desc: 'All set, deploy your node',
  },
];

export const NODE_LAUNCHER_NODE_TYPES = [
  {
    key: 'archive',
    title: 'Archive Node',
    description:
      'Archive Nodes store the complete history of blocks and transactions and additionally keep all historical states. This type of node allows to query account balances and smart contract states at any given height since genesis.',
  },
  {
    key: 'full',
    title: 'Full Node',
    description:
      'Full Nodes store the complete history of blocks and transactions. This type of node maintains the most recent network state and therefore cannot be used to query historical states.',
  },
];

export const NODE_LAUNCHER_NODE_NETWROKS = [
  {
    key: 'mainnet',
    title: 'Mainnet',
    description: '%{protocol} main network',
  },
  {
    key: 'testnet',
    title: 'Testnet',
    description: 'Test network for %{protocol}. Great for development.',
  },
  {
    key: 'sepolia',
    title: 'Sepolia',
    description: 'Test network for %{protocol}. Great for development.',
  },
];

export const NODE_LAUNCHER_NODE_CLIENTS = [
  {
    key: 'reth',
    title: 'Reth',
    description:
      'The live blockchain network for executing real transactions with full security and reliability.',
  },
  {
    key: 'geth',
    title: 'Geth',
    description:
      'A sandbox environment designed for safe testing and development, mimicking mainnet conditions without financial risks.',
  },
  {
    key: 'op-reth',
    title: 'OP Reth',
    description:
      'The live blockchain network for executing real transactions with full security and reliability.',
  },
  {
    key: 'op-geth',
    title: 'OP Geth',
    description:
      'A sandbox environment designed for safe testing and development, mimicking mainnet conditions without financial risks.',
  },
  {
    key: 'erigon',
    title: 'Erigon',
    description:
      'A modern Ethereum test network offering a stable platform to experiment with new features and protocol updates.',
  },
  {
    key: 'bor',
    title: 'Bor',
    description:
      'A modern Ethereum test network offering a stable platform to experiment with new features and protocol updates.',
  },
  {
    key: 'nitro',
    title: 'Nitro',
    description:
      'A modern Ethereum test network offering a stable platform to experiment with new features and protocol updates.',
  },
];

export const NODE_LAUNCHER_ERRORS: Record<keyof NodeLauncherError, boolean> = {
  BILLING_NO_PAYMENT_METHOD: false,
};

export const NODE_LAUNCHER_ERROR_MESSAGES = {
  BILLING_NO_PAYMENT_METHOD:
    'Payment details: Please add a valid payment method.',
};
