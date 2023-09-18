type Permission =
  | 'api-key-create'
  | 'api-key-delete'
  | 'api-key-list'
  | 'api-key-regenerate'
  | 'api-key-update'
  | 'auth-confirm'
  | 'auth-list-permissions'
  | 'auth-refresh'
  | 'auth-reset-password'
  | 'auth-update-password'
  | 'auth-update-ui-password'
  | 'babel-notify'
  | 'blockchain-get'
  | 'blockchain-list'
  | 'blockjoy-admin'
  | 'bundle-delete'
  | 'bundle-list-bundle-versions'
  | 'bundle-retrieve'
  | 'command-ack'
  | 'command-create'
  | 'command-get'
  | 'command-pending'
  | 'command-update'
  | 'cookbook-list-babel-versions'
  | 'cookbook-net-configurations'
  | 'cookbook-requirements'
  | 'cookbook-retrieve-image'
  | 'cookbook-retrieve-kernel'
  | 'cookbook-retrieve-plugin'
  | 'discovery-services'
  | 'host-billing-get'
  | 'host-create'
  | 'host-delete'
  | 'host-get'
  | 'host-list'
  | 'host-provision-create'
  | 'host-provision-get'
  | 'host-regions'
  | 'host-restart'
  | 'host-start'
  | 'host-stop'
  | 'host-update'
  | 'invitation-accept'
  | 'invitation-create'
  | 'invitation-decline'
  | 'invitation-list'
  | 'invitation-revoke'
  | 'key-file-create'
  | 'key-file-list'
  | 'manifest-retrieve-download'
  | 'metrics-host'
  | 'metrics-node'
  | 'mqtt-acl'
  | 'node-admin-create-all'
  | 'node-admin-delete-all'
  | 'node-admin-list-all'
  | 'node-admin-restart-all'
  | 'node-admin-start-all'
  | 'node-admin-stop-all'
  | 'node-admin-update-config-all'
  | 'node-admin-update-status-all'
  | 'node-create'
  | 'node-delete'
  | 'node-get'
  | 'node-list'
  | 'node-restart'
  | 'node-start'
  | 'node-stop'
  | 'node-update-config'
  | 'node-update-status'
  | 'org-admin-list-all'
  | 'org-create'
  | 'org-delete'
  | 'org-get'
  | 'org-list'
  | 'org-provision-get-token'
  | 'org-provision-reset-token'
  | 'org-remove-member'
  | 'org-remove-self'
  | 'org-update'
  | 'subscription-create'
  | 'subscription-delete'
  | 'subscription-get'
  | 'subscription-list'
  | 'user-admin-filter-all'
  | 'user-admin-update-all'
  | 'user-billing-delete'
  | 'user-billing-get'
  | 'user-billing-update'
  | 'user-create'
  | 'user-delete'
  | 'user-filter'
  | 'user-get'
  | 'user-update';
