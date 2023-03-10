const mockedBlockchainsResponse = [
  {
    createdAt: {
      nanos: 240922000,
      seconds: 1673558135,
    },
    supportedNodesTypes: '',
    created_at_datetime: new Date(),
    description: '',
    id: 'd1af76a2-57d9-43d7-a1fa-fa0af079bd4c',
    name: 'Algorand',
    networksList: [
      {
        name: 'testnet',
        netType: 0,
        url: '',
      },
    ],
    projectUrl: '',
    repoUrl: '',
    status: 3,
    supported_node_types: [
      {
        id: 10,
        properties: [
          {
            default: 'false',
            disabled: true,
            name: 'self-hosted',
            required: true,
            ui_type: 'switch',
          },
        ],
        version: '3.14.2',
      },
    ],
    updatedAt: {
      nanos: 240922000,
      seconds: 1673558135,
    },
    updated_at_datetime: new Date(),
    supportsBroadcast: true,
    supportsEtl: true,
    supportsNode: true,
    supportsStaking: true,
    version: '',
  },
];

export { mockedBlockchainsResponse };
