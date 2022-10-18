type User = {
  accessToken?: string;
  verified?: boolean;
  id?: string;
  firstName?: string;
  lastName?: string;
  email?: string;
  defaultOrganization?: {
    name?: string;
    id?: string;
  };
};
