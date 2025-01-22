declare namespace globalThis {
  type NodeSettings = {
    filters: import('@modules/grpc').UINodeFilterCriteria;
    sort: import('@modules/grpc/library/blockjoy/v1/node').NodeSort[];
  };

  type HostSettings = {
    filters: import('@modules/grpc').UIHostFilterCriteria;
    sort: import('@modules/grpc/library/blockjoy/v1/node').HostSort[];
  };

  type SearchSortOrder =
    import('@modules/grpc/library/blockjoy/common/v1/search').SortOrder;

  type AdminListColumn =
    import('@modules/admin/types/AdminListColumn').AdminListColumn;

  type ApiKeysSort = {
    field: keyof import('@modules/grpc/library/blockjoy/v1/api_key').ListApiKey;
    order: SearchSortOrder;
  };
}

type UserSettings = {
  layout?: string;
  nodes?: string;
  hosts?: string;
  organization?: string;
  admin?: string;
  billing?: string;
  apiKeys?: string;
};

type UserSettingsUI = {
  layout?: LayoutSettings;
  nodes?: NodeSettings;
  hosts?: HostSettings;
  organization?: OrganizationSettings;
  admin?: AdminSettings;
  billing?: BillingSettings;
  apiKeys?: ApiKeysSettings;
};

type LayoutBasicSettings = {
  'sidebar.isOpen': boolean;
  'nodes.view': View;
  'nodes.filters.isOpen': boolean;
  'nodes.table.tagsPerView': number;
  'nodes.table.columns': TableColumn[];
  'hosts.view': View;
  'hosts.filters.isOpen': boolean;
  'admin.fullWidth': boolean;
  'admin.sidebarWidth': number;
};

type LayoutMobileSettings = {
  'mobile.nodes.view': View;
  'mobile.hosts.view': View;
};

type LayoutSettings = LayoutBasicSettings & LayoutMobileSettings;

type DefaultOrganization = {
  orgId: string;
  name: string;
};

type OrganizationSettings = {
  default?: DefaultOrganization | null;
};

type AdminSettingsSort = {
  field: number;
  order: SortOrder;
};

type AdminSettingsItem = {
  sort?: AdminSettingsSort;
  columns?: AdminListColumn[];
};

type AdminSettings = {
  nodes?: AdminSettingsItem;
  hosts?: AdminSettingsItem;
  protocols?: AdminSettingsItem;
  orgs?: AdminSettingsItem;
  users?: AdminSettingsItem;
};

type BillingSettings = {
  bypassBilling: boolean;
};

type ApiKeysSettings = {
  sort: ApiKeysSort;
};
