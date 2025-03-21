// type DefaultOrganization = {
//   orgId: string;
//   name: string;
// };

interface IDeleteOrganizationHook {
  deleteOrganization: (
    id: string,
    onSuccess: VoidFunction,
    onError: VoidFunction,
  ) => void;
}

interface IUpdateOrganizationHook {
  updateOrganization: (id: string, name: string) => Promise<void>;
  modifyOrganization: (organization: Org) => void;
}

interface IUpdateMembersHook {
  updateMembersList: (organization: Org) => Promise<void>;
}
