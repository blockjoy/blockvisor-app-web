import { Blockchain } from '@modules/grpc/library/blockchain';

const mockedBlockchainsResponse: Blockchain[] = [
  {
    createdAt: new Date(),
    description: '',
    id: 'd1af76a2-57d9-43d7-a1fa-fa0af079bd4c',
    name: 'Algorand',
    networks: [
      {
        name: 'testnet',
        netType: 0,
        url: '',
      },
    ],
    projectUrl: '',
    repoUrl: '',
    status: 3,
    updatedAt: new Date(),
    version: '3.14.2',
    nodesTypes: [
      {
        nodeType: 10,
        version: '3.14.2',
        properties: [
          {
            default: 'false',
            disabled: true,
            name: 'self-hosted',
            required: true,
            uiType: 1,
          },
        ],
      },
    ],
  },
];

export { mockedBlockchainsResponse };
