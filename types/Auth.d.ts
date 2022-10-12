type User = {
  accessToken: string;
  verified?: boolean;
  defaultOrganization?: {
    name?: string;
    id?: string;
  };
};
