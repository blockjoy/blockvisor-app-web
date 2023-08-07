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

export const nodeTypeProps = {
  number: 'number',
  text: 'string',
  boolean: 'boolean',
  fileUpload: 'file-upload',
  hostSelector: 'host-selector',
  nodeSelector: 'node-selector',
};

export const hostFiltersDefaults: {
  memory: [number, number];
  cpu: [number, number];
  space: [number, number];
} = {
  memory: [2 * Math.pow(1024, 3), 512 * Math.pow(1024, 3)],
  cpu: [1, 64],
  space: [250 * Math.pow(1024, 3), 10 * Math.pow(1024, 4)],
};

export const hostFiltersSteps = {
  memory: 2 * Math.pow(1024, 3),
  cpu: 1,
  space: 250 * Math.pow(1024, 3),
};

export const hostFiltersCustomValues = {
  space: [
    250 * Math.pow(1024, 3),
    500 * Math.pow(1024, 3),
    750 * Math.pow(1024, 3),
    1 * Math.pow(1024, 4),
    2 * Math.pow(1024, 4),
    3 * Math.pow(1024, 4),
    4 * Math.pow(1024, 4),
    5 * Math.pow(1024, 4),
    6 * Math.pow(1024, 4),
    7 * Math.pow(1024, 4),
    8 * Math.pow(1024, 4),
    9 * Math.pow(1024, 4),
    10 * Math.pow(1024, 4),
  ],
};

export const blockchainPortList = [
  {
    name: 'celo',
    port: 9154,
  },
];
