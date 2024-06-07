type DefaultOrganization = {
  id: string;
  name: string;
};

type OrganizationSettings = {
  default?: DefaultOrganization | null;
};
