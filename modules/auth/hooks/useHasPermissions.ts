import { OrgRole } from '@modules/grpc/library/blockjoy/v1/org';
import { UserRole } from '@modules/grpc/library/blockjoy/v1/user';

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
}

export const USER_ROLES: {
  [UserRole.USER_ROLE_UNSPECIFICED]: string;
  [UserRole.USER_ROLE_UNPRIVILEGED]: string;
  [UserRole.USER_ROLE_BLOCKJOY_ADMIN]: string;
  [UserRole.UNRECOGNIZED]: string;
} = {
  [UserRole.USER_ROLE_UNSPECIFICED]: 'Undefined',
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
    Permissions.READ_ORGANIZATION,

    Permissions.READ_MEMBER,

    Permissions.READ_NODE,
  ],
  [OrgRole.ORG_ROLE_OWNER]: [
    Permissions.READ_ORGANIZATION,
    Permissions.CREATE_ORGANIZATION,
    Permissions.UPDATE_ORGANIZATION,
    Permissions.DELETE_ORGANIZATION,

    Permissions.READ_MEMBER,
    Permissions.CREATE_MEMBER,
    Permissions.UPDATE_MEMBER,
    Permissions.DELETE_MEMBER,

    Permissions.READ_NODE,
  ],
  [OrgRole.ORG_ROLE_ADMIN]: [
    Permissions.READ_ORGANIZATION,
    Permissions.CREATE_ORGANIZATION,
    Permissions.UPDATE_ORGANIZATION,
    Permissions.DELETE_ORGANIZATION,

    Permissions.READ_MEMBER,
    Permissions.CREATE_MEMBER,
    Permissions.UPDATE_MEMBER,
    Permissions.DELETE_MEMBER,

    Permissions.READ_NODE,
  ],
};

export function useHasPermissions(
  usrRole: UserRole,
  orgRole: OrgRole,
  permissions: Permissions | Permissions[],
) {
  if (
    (typeof usrRole === 'undefined' && typeof orgRole === 'undefined') ||
    typeof permissions === 'undefined'
  )
    return false;

  if (usrRole === UserRole.USER_ROLE_BLOCKJOY_ADMIN) return true;

  if (typeof permissions === 'number') {
    return ORG_PERMISSIONS[orgRole]?.includes?.(permissions);
  } else if (Array.isArray(permissions)) {
    return ORG_PERMISSIONS[orgRole]?.some((permissions: Permissions) =>
      Boolean(ORG_PERMISSIONS[orgRole]?.includes?.(permissions)),
    );
  } else {
    return false;
  }
}
