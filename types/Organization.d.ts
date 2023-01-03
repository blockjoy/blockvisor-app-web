type ClientOrganization = {
  createdAt?: {
    nanos: number;
    seconds: number;
  };

  id?: string;
  memberCount?: number;
  name?: string;
  personal?: boolean;
  updatedAt?: {
    nanos: number;
    seconds: number;
  };
};

type ClientOrganizationMember = {
  createdAt?: {
    nanos: number;
    seconds: number;
  };

  id?: string;
  email?: string;
  firstName?: string;
  lastName?: string;
  updatedAt?: {
    nanos: number;
    seconds: number;
  };
};
