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
  { name: 'keystore-file', value: 'Key Upload' },
  { name: 'keystore-file-1', value: 'Key Upload 1' },
  { name: 'keystore-file-2', value: 'Key Upload 2' },
  { name: 'keystore-file-3', value: 'Key Upload 3' },
  { name: 'voting-pwd', value: 'Voting Password' },
  { name: 'fee-recipient', value: 'Fee Recipient' },
  { name: 'mev-boost', value: 'MEV Boost' },
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
export const blockchainList = [
  { value: 'a307e884-9621-47e6-a18c-326a484f3aed', label: 'Algorand' },
  { value: '90405525-a6c8-43bf-888e-351d888de079', label: 'Cosmos' },
  { value: 'c27e539f-f098-40d2-8971-3d30fa41bc0d', label: 'Ethereum' },
  { value: '1fdbf4c3-ff16-489a-8d3d-87c8620b963c', label: 'Helium' },
  { value: '0f2b5687-d896-4908-ac47-0629a4ffe9da', label: 'Lightning' },
  { value: '3124d59b-d7e0-4028-8f76-aa69842a9397', label: 'Pocket' },
  { value: 'e02fcdf0-a325-40b3-8ac5-0e4ff15ccb85', label: 'Ethereum PoS' },
];

export const nodeStatusList = [
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
