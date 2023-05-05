import { Invitation } from '@modules/grpc/library/blockjoy/v1/invitation';

const mockedInvitations: Invitation[] = [
  {
    id: '548ef160-79b2-4ec2-8b53-4e8bb91a0de3',
    createdBy: 'b6d64e6e-ed22-4ac7-8e4b-f0570f885f6c',
    createdByName: 'Tom',
    orgId: '548ef160-79b2-4ec2-8b53-4e8bb91a0de3',
    inviteeEmail: 'tom@gmail.com',
    orgName: "Toms's Organization",
    createdAt: new Date(),
    status: 1,
  },
];

export { mockedInvitations };
