import { GrpcNodeObject } from '@modules/client/grpc_client';

const mockedNodesResponse = [
  {
    blockHeight: 0,
    blockchainId: 'b766f36a-4bdb-42a1-8cc1-edcfb343eb45',
    blockchainName: 'Ethereum',
    createdAt: {
      nanos: 240922000,
      seconds: 1673558135,
    },
    created_at_datetime: new Date(),
    hostId: '796aeb8f-1d92-447d-a27e-b9da33cd65a2',
    hostName: '192-69-220-2.slc.cloud.blockjoy.com',
    id: '5303423e-557b-4088-b24f-5835bd1b4889',
    ip: '192.69.220.6',
    ipGateway: '192.69.220.1',
    name: 'enormously_organic_magpie',
    network: 'goerli',
    orgId: 'ed0fa3a5-bac8-4d71-aca4-63d0afd1189c',
    selfUpdate: false,
    stakingStatus: 0,
    status: 0,
    syncStatus: 0,
    type: 3,
    updated_at_datetime: new Date(),
    updatedAt: {
      nanos: 240922000,
      seconds: 1673558135,
    },
    propertiesList: [
      {
        description: '',
        disabled: true,
        label: '',
        name: 'self-hosted',
        required: true,
        uiType: 'switch',
        value: 'false',
      },
    ],
    version: '3.4.0-build.1',
  },
];

export { mockedNodesResponse };
