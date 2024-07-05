type UserSettings = {
  layout?: string;
  nodes?: string;
  hosts?: string;
  organization?: string;
};

type UserSettingsUI = {
  layout?: LayoutSettings;
  nodes?: NodeSettings;
  hosts?: HostSettings;
  organization?: OrganizationSettings;
};

type LayoutSettings = {
  'sidebar.isOpen': boolean;
  'nodes.view': View;
  'nodes.filters.isOpen': boolean;
  'hosts.view': View;
  'hosts.filters.isOpen': boolean;
  'admin.fullWidth': boolean;
};

type NodeSettings = {
  filters: UINodeFilterCriteria;
};

type HostSettings = {
  filters: UIHostFilterCriteria;
  default: Host | null;
};

type DefaultOrganization = {
  id: string;
  name: string;
};

type OrganizationSettings = {
  default?: DefaultOrganization | null;
};
