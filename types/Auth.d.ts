import { UserRole } from '@modules/grpc/library/blockjoy/v1/user';

type User = {
  accessToken?: string;
  id?: string;
  firstName?: string;
  lastName?: string;
  email?: string;
  role?: UserRole;
};
