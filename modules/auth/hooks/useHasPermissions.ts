import { OrgRole } from '@modules/grpc/library/blockjoy/v1/org';
import { UserRole } from '@modules/grpc/library/blockjoy/v1/user';

export enum PermissionsCreateResource {
  NO_PERMISSION = 'NO_PERMISSION',
  NO_SUBSCRIPTION = 'NO_SUBSCRIPTION',
  NO_PAYMENT_METHOD = 'NO_PAYMENT_METHOD',
  GRANTED = 'GRANTED',
}

export enum Permissions {
  READ_ORGANIZATION,
  CREATE_ORGANIZATION,
  UPDATE_ORGANIZATION,
  DELETE_ORGANIZATION,

  READ_MEMBER,
  CREATE_MEMBER,
  UPDATE_MEMBER,
  DELETE_MEMBER,

  READ_NODE,
  CREATE_NODE,
  UPDATE_NODE,
  DELETE_NODE,

  READ_HOST,
  CREATE_HOST,
  UPDATE_HOST,
  DELETE_HOST,
<<<<<<< HEAD
=======

>>>>>>> df91c2f2 (feat: sc-1581 node creation permissions; sc-1099 add/remove items from subscription; sc-1116 subscription customer upon node creationg)
  READ_BILLING,
  CREATE_BILLING,
  UPDATE_BILLING,
  DELETE_BILLING,

  READ_SUBSCRIPTION,
  CREATE_SUBSCRIPTION,
  UPDATE_SUBSCRIPTION,
  DELETE_SUBSCRIPTION,

  READ_PAYMENT,
  CREATE_PAYMENT,
  UPDATE_PAYMENT,
  DELETE_PAYMENT,
}

export const USER_ROLES: {
  [UserRole.USER_ROLE_UNSPECIFIED]: string;
  [UserRole.USER_ROLE_UNPRIVILEGED]: string;
  [UserRole.USER_ROLE_BLOCKJOY_ADMIN]: string;
  [UserRole.UNRECOGNIZED]: string;
} = {
  [UserRole.USER_ROLE_UNSPECIFIED]: 'Undefined',
  [UserRole.USER_ROLE_UNPRIVILEGED]: 'User',
  [UserRole.USER_ROLE_BLOCKJOY_ADMIN]: 'Super User',
  [UserRole.UNRECOGNIZED]: 'Unknown',
};

export const ORG_ROLES: {
  [OrgRole.ORG_ROLE_UNSPECIFIED]: string;
  [OrgRole.ORG_ROLE_MEMBER]: string;
  [OrgRole.ORG_ROLE_OWNER]: string;
  [OrgRole.ORG_ROLE_ADMIN]: string;
} = {
  [OrgRole.ORG_ROLE_UNSPECIFIED]: 'Undefined',
  [OrgRole.ORG_ROLE_MEMBER]: 'Member',
  [OrgRole.ORG_ROLE_OWNER]: 'Owner',
  [OrgRole.ORG_ROLE_ADMIN]: 'Admin',
};

export const ORG_PERMISSIONS: {
  [OrgRole.ORG_ROLE_UNSPECIFIED]: Permissions[];
  [OrgRole.ORG_ROLE_MEMBER]: Permissions[];
  [OrgRole.ORG_ROLE_OWNER]: Permissions[];
  [OrgRole.ORG_ROLE_ADMIN]: Permissions[];
} = {
  [OrgRole.ORG_ROLE_UNSPECIFIED]: [],
  [OrgRole.ORG_ROLE_MEMBER]: [
    // ORGANIZATION
    Permissions.READ_ORGANIZATION,
<<<<<<< HEAD

    Permissions.READ_MEMBER,

    Permissions.READ_NODE,
    Permissions.READ_HOST,
=======
    Permissions.CREATE_ORGANIZATION,
    Permissions.UPDATE_ORGANIZATION,

    Permissions.READ_MEMBER,

    // NODE
    Permissions.READ_NODE,
    Permissions.CREATE_NODE,
    Permissions.UPDATE_NODE,

    // HOST
    Permissions.READ_HOST,
    Permissions.CREATE_HOST,
    Permissions.UPDATE_HOST,

    // BILLING
    Permissions.READ_BILLING,

    Permissions.READ_SUBSCRIPTION,

    Permissions.READ_PAYMENT,
>>>>>>> df91c2f2 (feat: sc-1581 node creation permissions; sc-1099 add/remove items from subscription; sc-1116 subscription customer upon node creationg)
  ],
  [OrgRole.ORG_ROLE_OWNER]: [
    // ORGANIZATION
    Permissions.READ_ORGANIZATION,
    Permissions.CREATE_ORGANIZATION,
    Permissions.UPDATE_ORGANIZATION,
    Permissions.DELETE_ORGANIZATION,

    Permissions.READ_MEMBER,
    Permissions.CREATE_MEMBER,
    Permissions.UPDATE_MEMBER,
    Permissions.DELETE_MEMBER,

<<<<<<< HEAD
    Permissions.READ_NODE,
    Permissions.READ_HOST,
=======
    // NODE
    Permissions.READ_NODE,
    Permissions.CREATE_NODE,
    Permissions.UPDATE_NODE,
    Permissions.DELETE_NODE,

    // HOST
    Permissions.READ_HOST,
    Permissions.CREATE_HOST,
    Permissions.UPDATE_HOST,
    Permissions.DELETE_HOST,

    // BILLING
>>>>>>> df91c2f2 (feat: sc-1581 node creation permissions; sc-1099 add/remove items from subscription; sc-1116 subscription customer upon node creationg)
    Permissions.READ_BILLING,
    Permissions.CREATE_BILLING,
    Permissions.UPDATE_BILLING,
    Permissions.DELETE_BILLING,

    Permissions.READ_SUBSCRIPTION,
    Permissions.CREATE_SUBSCRIPTION,
    Permissions.UPDATE_SUBSCRIPTION,
    Permissions.DELETE_SUBSCRIPTION,

    Permissions.READ_PAYMENT,
    Permissions.CREATE_PAYMENT,
    Permissions.UPDATE_PAYMENT,
    Permissions.DELETE_PAYMENT,
  ],
  [OrgRole.ORG_ROLE_ADMIN]: [
    // ORGANIZATION
    Permissions.READ_ORGANIZATION,
    Permissions.CREATE_ORGANIZATION,
    Permissions.UPDATE_ORGANIZATION,

    Permissions.READ_MEMBER,
    Permissions.CREATE_MEMBER,
    Permissions.UPDATE_MEMBER,
<<<<<<< HEAD
<<<<<<< HEAD
    Permissions.DELETE_MEMBER,
<<<<<<< HEAD

    Permissions.READ_NODE,
    Permissions.READ_HOST,
=======
=======
=======
>>>>>>> df91c2f2 (feat: sc-1581 node creation permissions; sc-1099 add/remove items from subscription; sc-1116 subscription customer upon node creationg)

    // NODE
    Permissions.READ_NODE,
    Permissions.CREATE_NODE,
    Permissions.UPDATE_NODE,

    // HOST
    Permissions.READ_HOST,
    Permissions.CREATE_HOST,
    Permissions.UPDATE_HOST,

    // BILLING
    Permissions.READ_BILLING,
<<<<<<< HEAD
>>>>>>> 3d14770e (feat: sc-1581 implemented basic billing permissions; fixed bugs in the ui)
>>>>>>> bb7f9190 (feat: sc-1581 implemented basic billing permissions; fixed bugs in the ui)
  ],
};

export function useHasPermissions(
  usrRole: UserRole,
  orgRole: OrgRole | null,
  permissions: Permissions | Permissions[],
) {
  if (!!!usrRole) return false;

  if (usrRole === UserRole.USER_ROLE_BLOCKJOY_ADMIN) return true;

  if (!!!orgRole || !!!permissions) return false;
=======
    Permissions.CREATE_BILLING,
    Permissions.UPDATE_BILLING,

    Permissions.READ_SUBSCRIPTION,
    Permissions.CREATE_SUBSCRIPTION,
    Permissions.UPDATE_SUBSCRIPTION,

    Permissions.READ_PAYMENT,
  ],
};

export const useHasPermissions = (
  orgRole: OrgRole,
  permissions: Permissions | Permissions[],
): boolean => {
  if (typeof orgRole === 'undefined' || typeof permissions === 'undefined') {
    return false;
  }
>>>>>>> df91c2f2 (feat: sc-1581 node creation permissions; sc-1099 add/remove items from subscription; sc-1116 subscription customer upon node creationg)

  if (typeof permissions === 'number') {
    return ORG_PERMISSIONS[orgRole]?.includes?.(permissions);
  } else if (Array.isArray(permissions)) {
    return ORG_PERMISSIONS[orgRole]?.some((permissions: Permissions) =>
      Boolean(ORG_PERMISSIONS[orgRole]?.includes?.(permissions)),
    );
  } else {
    return false;
  }
};

export const useHasPermissionsToCreateResource = (
  orgRole: OrgRole,
  hasPaymentMethod: boolean,
  hasSubscription: boolean,
): PermissionsCreateResource => {
  if (!orgRole) return PermissionsCreateResource.NO_PERMISSION;

  const hasPermissionToCreateNode = PERMISSIONS[orgRole]?.includes?.(
    Permissions.CREATE_NODE,
  );

  const hasPermissionToCreateHost = PERMISSIONS[orgRole]?.includes?.(
    Permissions.CREATE_HOST,
  );

  const hasPermissionToCreateResource =
    hasPermissionToCreateNode && hasPermissionToCreateHost;

  if (!hasPermissionToCreateResource) {
    return PermissionsCreateResource.NO_PERMISSION;
  }

  if (orgRole === OrgRole.ORG_ROLE_MEMBER && !hasSubscription) {
    return PermissionsCreateResource.NO_SUBSCRIPTION;
  }

  if (orgRole === OrgRole.ORG_ROLE_ADMIN && !hasSubscription) {
    return PermissionsCreateResource.NO_PAYMENT_METHOD;
  }

  return PermissionsCreateResource.GRANTED;
};

export const ERROR_MESSAGES = {
  NODE: {
    [PermissionsCreateResource.NO_PERMISSION]:
      'Cannot launch node due to insufficient permissions.',
    [PermissionsCreateResource.NO_SUBSCRIPTION]:
      'Cannot launch node. Contact organization owner to upgrade subscription.',
    [PermissionsCreateResource.NO_PAYMENT_METHOD]:
      'Cannot launch node. Contact organization owner to add payment method.',
  },
  HOST: {
    [PermissionsCreateResource.NO_PERMISSION]:
      'Cannot launch host due to insufficient permissions.',
    [PermissionsCreateResource.NO_SUBSCRIPTION]:
      'Cannot launch host. Contact organization owner to upgrade subscription.',
    [PermissionsCreateResource.NO_PAYMENT_METHOD]:
      'Cannot launch host. Contact organization owner to add payment method.',
  },
};
