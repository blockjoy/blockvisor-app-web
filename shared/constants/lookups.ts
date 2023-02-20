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
  { id: 1, name: 'Provisioning', uuid: 'provisioning', isOnline: true },
  { id: 2, name: 'Broadcasting', uuid: 'broadcasting', isOnline: true },
  { id: 3, name: 'Cancelled', uuid: 'cancelled', isOnline: true },
  { id: 4, name: 'Delegating', uuid: 'delegating', isOnline: true },
  { id: 5, name: 'Delinquent', uuid: 'delinquent', isOnline: true },
  { id: 6, name: 'Disabled', uuid: 'disabled', isOnline: false },
  { id: 7, name: 'Earning', uuid: 'earning', isOnline: true },
  { id: 8, name: 'Electing', uuid: 'electing', isOnline: true },
  { id: 9, name: 'Elected', uuid: 'elected', isOnline: true },
  { id: 10, name: 'Exporting', uuid: 'exporting', isOnline: true },
  { id: 11, name: 'Ingesting', uuid: 'ingesting', isOnline: true },
  { id: 12, name: 'Mining', uuid: 'mining', isOnline: true },
  { id: 13, name: 'Minting', uuid: 'minting', isOnline: true },
  { id: 14, name: 'Processing', uuid: 'processing', isOnline: true },
  { id: 14, name: 'Relaying', uuid: 'relaying', isOnline: true },
  { id: 15, name: 'Removed', uuid: 'removed', isOnline: false },
  { id: 16, name: 'Removing', uuid: 'removing', isOnline: false },
  { id: 0, name: 'Undefined', uuid: 'undefined', isOnline: false },
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
