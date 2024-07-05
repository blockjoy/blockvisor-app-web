declare namespace globalThis {
  type NodeSettings = {
    filters: import('@modules/grpc').UINodeFilterCriteria;
    sort: import('@modules/grpc/library/blockjoy/v1/node').NodeSort[];
  };

  type HostSettings = {
    filters: import('@modules/grpc').UIHostFilterCriteria;
    sort: import('@modules/grpc/library/blockjoy/v1/node').HostSort[];
  };
}

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

type LayoutBasicSettings = {
  'sidebar.isOpen': boolean;
  'nodes.view': View;
  'nodes.filters.isOpen': boolean;
  'hosts.view': View;
  'hosts.filters.isOpen': boolean;
  'admin.fullWidth': boolean;
};

type LayoutMobileSettings = {
  'mobile.nodes.view': View;
  'mobile.hosts.view': View;
};

type LayoutSettings = LayoutBasicSettings & LayoutMobileSettings;

type DefaultOrganization = {
  id: string;
  name: string;
};

type OrganizationSettings = {
  default?: DefaultOrganization | null;
};
