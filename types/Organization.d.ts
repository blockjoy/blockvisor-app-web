interface IDeleteOrganizationHook {
  loading: boolean;
  deleteOrganization: (id: string) => void;
  removeOrganization: (id: string) => void;
  setLoadingState: SetterOrUpdater<LoadingState>;
}

interface IUpdateOrganizationHook {
  updateOrganization: (id: string, name: string) => Promise<void>;
  modifyOrganization: (organization: Org) => void;
}

interface IUpdateMembersHook {
  updateMembersList: (organization: Org) => Promise<void>;
}
