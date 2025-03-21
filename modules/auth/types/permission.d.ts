type Permission =
  | 'api-key-create'
  | 'api-key-list'
  | 'api-key-update'
  | 'api-key-regenerate'
  | 'api-key-delete'
  | 'auth-confirm'
  | 'auth-list-permissions'
  | 'auth-refresh'
  | 'auth-reset-password'
  | 'auth-update-password'
  | 'auth-update-ui-password'
  | 'auth-admin-list-permissions'
  | 'babel-notify'
  | 'billing-exempt'
  | 'blockchain-get'
  | 'blockchain-get-image'
  | 'blockchain-get-plugin'
  | 'blockchain-get-requirements'
  | 'blockchain-list'
  | 'blockchain-list-image-versions'
  | 'blockchain-admin-add-node-type'
  | 'blockchain-admin-add-version'
  | 'blockchain-admin-get'
  | 'blockchain-admin-list'
  | 'blockchain-archive-get-download'
  | 'blockchain-archive-get-upload'
  | 'blockchain-archive-put-download'
  | 'bundle-retrieve'
  | 'bundle-list-bundle-versions'
  | 'bundle-delete'
  | 'command-admin-list'
  | 'command-ack'
  | 'command-create'
  | 'command-get'
  | 'command-list'
  | 'command-pending'
  | 'command-update'
  | 'crypt-get-secret'
  | 'crypt-put-secret'
  | 'discovery-services'
  | 'host-create'
  | 'host-get'
  | 'host-list'
  | 'host-update'
  | 'host-delete'
  | 'host-start'
  | 'host-stop'
  | 'host-restart'
  | 'host-regions'
  | 'host-admin-get'
  | 'host-admin-list'
  | 'host-billing-get'
  | 'host-provision-get'
  | 'host-provision-create'
  | 'invitation-create'
  | 'invitation-list'
  | 'invitation-accept'
  | 'invitation-decline'
  | 'invitation-revoke'
  | 'kernel-retrieve'
  | 'key-file-create'
  | 'key-file-list'
  | 'metrics-node'
  | 'metrics-host'
  | 'mqtt-acl'
  | 'mqtt-admin-acl'
  | 'node-create'
  | 'node-delete'
  | 'node-get'
  | 'node-list'
  | 'node-restart'
  | 'node-report'
  | 'node-start'
  | 'node-stop'
  | 'node-update-config'
  | 'node-update-status'
  | 'node-admin-create'
  | 'node-admin-delete'
  | 'node-admin-get'
  | 'node-admin-list'
  | 'node-admin-restart'
  | 'node-admin-start'
  | 'node-admin-stop'
  | 'node-admin-update-config'
  | 'node-admin-update-status'
  | 'org-admin-delete'
  | 'org-admin-get'
  | 'org-admin-list'
  | 'org-admin-update'
  | 'org-create'
  | 'org-get'
  | 'org-list'
  | 'org-update'
  | 'org-delete'
  | 'org-remove-member'
  | 'org-remove-self'
  | 'org-provision-get-token'
  | 'org-provision-reset-token'
  | 'org-address-delete'
  | 'org-address-get'
  | 'org-address-set'
  | 'org-billing-get-billing-details'
  | 'org-billing-init-card'
  | 'org-billing-list-payment-methods'
  | 'subscription-create'
  | 'subscription-get'
  | 'subscription-list'
  | 'subscription-update'
  | 'subscription-delete'
  | 'user-create'
  | 'user-filter'
  | 'user-get'
  | 'user-update'
  | 'user-delete'
  | 'user-admin-filter'
  | 'user-admin-get'
  | 'user-admin-update'
  | 'user-billing-get'
  | 'user-billing-update'
  | 'user-billing-delete'
  | 'user-billing-init-card'
  | 'user-settings-get';
