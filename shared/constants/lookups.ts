export const nodeTypeList = [
  { id: 4, name: 'API' },
  { id: 8, name: 'Beacon' },
  { id: 2, name: 'ETL' },
  { id: 7, name: 'Execution' },
  { id: 11, name: 'Full Node' },
  { id: 12, name: 'Light Node' },
  { id: 9, name: 'MEV Boost' },
  { id: 1, name: 'Miner' },
  { id: 10, name: 'Node' },
  { id: 5, name: 'Oracle' },
  { id: 6, name: 'Relay' },
  { id: 3, name: 'Validator' },
];

export const nodeTypeConfigLabels = [
  { name: 'keystore-file', value: 'Validator Key Upload' },
  { name: 'keystore-file-1', value: 'Key Upload 1' },
  { name: 'keystore-file-2', value: 'Key Upload 2' },
  { name: 'keystore-file-3', value: 'Key Upload 3' },
  { name: 'voting-pwd', value: 'Voting Password' },
  { name: 'fee-recipient', value: 'Fee Recipient' },
  { name: 'mev-boost', value: 'MEV Boost' },
  { name: 'self-hosted', value: 'Self Hosted' },
];

/*
Unknown = 0,
    Miner = 1,
    Etl = 2,
    Validator = 3,
    Api = 4,
    Oracle = 5,
    Relay = 6,
    Execution = 7,
    Beacon = 8,
    MevBoost = 9,
    Node = 10,
    FullNode = 11,
    LightNode = 12,
 */

export const blockchainsDisabled = [
  'Algorand',
  'Aptos',
  'Avalanche',
  'Cardano',
  'Cosmos',
  'Lightning',
  'Near',
  'Pocket',
  'Polygon',
  'Solana',
];

export const nodeStatusList = [
  { id: 1, name: 'Provisioning', isOnline: true },
  { id: 2, name: 'Broadcasting', isOnline: true },
  { id: 3, name: 'Cancelled', isOnline: true },
  { id: 4, name: 'Delegating', isOnline: true },
  { id: 5, name: 'Delinquent', isOnline: true },
  { id: 6, name: 'Disabled', isOnline: false },
  { id: 7, name: 'Earning', isOnline: true },
  { id: 8, name: 'Electing', isOnline: true },
  { id: 9, name: 'Elected', isOnline: true },
  { id: 10, name: 'Exporting', isOnline: true },
  { id: 11, name: 'Ingesting', isOnline: true },
  { id: 12, name: 'Mining', isOnline: true },
  { id: 13, name: 'Minting', isOnline: true },
  { id: 14, name: 'Processing', isOnline: true },
  { id: 14, name: 'Relaying', isOnline: true },
  { id: 15, name: 'Removed', isOnline: false },
  { id: 16, name: 'Removing', isOnline: false },
  { id: 0, name: 'Undefined', isOnline: false },
];

export const hostStatusList = [
  { id: 0, name: 'Undefined' },
  { id: 1, name: 'Creating' },
  { id: 2, name: 'Running' },
  { id: 3, name: 'Starting' },
  { id: 4, name: 'Stopping' },
  { id: 5, name: 'Stopped' },
  { id: 6, name: 'Upgrading' },
  { id: 7, name: 'Upgraded' },
  { id: 8, name: 'Deleting' },
  { id: 9, name: 'Deleted' },
  { id: 10, name: 'Installing' },
  { id: 11, name: 'Snaphotting' },
];

export const nodeTypeProps = {
  number: 'number',
  text: 'string',
  boolean: 'boolean',
  fileUpload: 'file-upload',
  hostSelector: 'host-selector',
  nodeSelector: 'node-selector',
};
