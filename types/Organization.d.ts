interface IDeleteOrganizationHook {
  deleteOrganization: (id: string, callback: VoidFunction) => void;
  removeOrganization: (id: string) => void;
}

interface IUpdateOrganizationHook {
  updateOrganization: (id: string, name: string) => Promise<void>;
  modifyOrganization: (organization: Org) => void;
}

interface IUpdateMembersHook {
  updateMembersList: (organization: Org) => Promise<void>;
}
