import { Org } from '@modules/grpc/library/organization';

const mockeOrganizationsResponse: Org[] = [
  {
    updatedAt: new Date(),
    id: '548ef160-79b2-4ec2-8b53-4e8bb91a0de3',
    memberCount: 1,
    name: 'leyoji4937@v3dev.com',
    personal: true,
    createdAt: new Date(),
    members: [
      {
        userId: 'b6d64e6e-ed22-4ac7-8e4b-f0570f885f6c',
        orgId: '548ef160-79b2-4ec2-8b53-4e8bb91a0de3',
        role: 1,
        name: 'Comimet',
        email: 'comimet108@tohup.com',
      },
    ],
  },
  {
    createdAt: new Date(),
    id: '7d511520-9fce-4786-acf6-1d220febba01',
    memberCount: 1,
    name: 'test',
    personal: false,
    updatedAt: new Date(),
    members: [
      {
        userId: 'b6d64e6e-ed22-4ac7-8e4b-f0570f885f6c',
        orgId: '548ef160-79b2-4ec2-8b53-4e8bb91a0de3',
        role: 1,
        name: 'Comimet',
        email: 'comimet108@tohup.com',
      },
    ],
  },
];

export { mockeOrganizationsResponse };
