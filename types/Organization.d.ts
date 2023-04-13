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

interface IKickOrganizationHook {
  loading: LoadingState;
  kickOrganization: (organization: ClientOrganization) => Promise<void>;
}

type ClientOrganization = {
  createdAt?: {
    nanos: number;
    seconds: number;
  };
  membersList?: OrgUser.AsObject[];
  id?: string;
  currentUser?: OrgUser.AsObject;
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
