import { Host } from '@modules/grpc/library/blockjoy/v1/host';

export const mockedHosts: Host[] = [
  {
    id: '548ef160-79b2-4ec2-8b53-4e8bb91a0de3',
    name: 'Test',
    version: '1.0.0',
    cpuCount: 1,
    memSizeBytes: 1000,
    diskSizeBytes: 100000,
    os: 'Linux',
    osVersion: '12.0.0',
    ip: '192.1.4.12',
    status: 0,
    createdAt: new Date(),
    orgId: '5303423e-557b-4088-b24f-5835bd1b4889',
  },
];
