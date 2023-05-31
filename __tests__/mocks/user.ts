import { OrgUser } from '@modules/grpc/library/blockjoy/v1/org';

export const mockedOrgUser: OrgUser[] = [
  {
    email: 'test@test.com',
    name: 'Test test',
    orgId: '548ef160-79b2-4ec2-8b53-4e8bb91a0de3',
    role: -1,
    userId: 'b6d64e6e-ed22-4ac7-8e4b-f0570f885f6c',
  },
  {
    email: 'user@test.com',
    name: 'User user',
    orgId: '148ef160-79b2-4ec2-8b53-4e8bb91a0de3',
    role: 1,
    userId: 'c6d64e6e-ed22-4ac7-8e4b-f0570f885f6c',
  },
];
