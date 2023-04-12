interface IDeleteOrganizationHook {
  loading: boolean;
  deleteOrganization: (id: string) => void;
  removeOrganization: (id: string) => void;
  setLoadingState: SetterOrUpdater<LoadingState>;
}

interface IUpdateOrganizationHook {
  updateOrganization: (id: string, name: string) => Promise<void>;
  modifyOrganization: (organization: ClientOrganization) => void;
}

type ClientDefaultOrganization = {
  name?: string;
  id?: string;
};

type ClientOrganizationUser = {
  orgId: string;
  role: number;
  userId: string;
};

type ClientOrganization = {
  createdAt?: {
    nanos: number;
    seconds: number;
  };
  members?: User.AsObject[];
  id?: string;
  currentUser?: ClientOrganizationUser;
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
  createdAtString?: string;

  id?: string;
  email?: string;
  firstName?: string;
  lastName?: string;
  updatedAt?: {
    nanos: number;
    seconds: number;
  };
};

type ClientOrganizationInvitation = {
  acceptedAt?: {
    nanos: number;
    seconds: number;
  };
  createdAt?: {
    nanos: number;
    seconds: number;
  };
  createdAtString?: string;

  declinedAt?: {
    nanos: number;
    seconds: number;
  };

  createdById?: string;
  createdByUserName?: string;

  createdForOrgId?: string;
  createdForOrgName?: string;

  id?: string;
  inviteeEmail?: string;
};
