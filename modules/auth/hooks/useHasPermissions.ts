import { OrgRole as OrgRole } from '@modules/grpc/library/blockjoy/v1/org';

export enum Permissions {
  READ_ORGANIZATION,
  CREATE_ORGANIZATION,
  UPDATE_ORGANIZATION,
  DELETE_ORGANIZATION,

  READ_MEMBER,
  CREATE_MEMBER,
  UPDATE_MEMBER,
  DELETE_MEMBER,
}

export const USER_ROLES: {
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

export const PERMISSIONS: {
  [OrgRole.ORG_ROLE_UNSPECIFIED]: Permissions[];
  [OrgRole.ORG_ROLE_MEMBER]: Permissions[];
  [OrgRole.ORG_ROLE_OWNER]: Permissions[];
  [OrgRole.ORG_ROLE_ADMIN]: Permissions[];
} = {
  [OrgRole.ORG_ROLE_UNSPECIFIED]: [],
  [OrgRole.ORG_ROLE_MEMBER]: [
    Permissions.READ_ORGANIZATION,
    Permissions.READ_MEMBER,
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
  ],
  [OrgRole.ORG_ROLE_ADMIN]: [
    Permissions.READ_ORGANIZATION,
    Permissions.CREATE_ORGANIZATION,
    Permissions.UPDATE_ORGANIZATION,

    Permissions.READ_MEMBER,
    Permissions.CREATE_MEMBER,
    Permissions.UPDATE_MEMBER,
  ],
};

export function useHasPermissions(
  orgRole: OrgRole,
  permissions: Permissions | Permissions[],
) {
  if (typeof orgRole === 'undefined' || typeof permissions === 'undefined') {
    return false;
  }

  if (typeof permissions === 'number') {
    return PERMISSIONS[orgRole].includes?.(permissions);
  } else if (Array.isArray(permissions)) {
    return PERMISSIONS[orgRole].some((permissions: Permissions) =>
      Boolean(PERMISSIONS[orgRole].includes?.(permissions)),
    );
  } else {
    return false;
  }
}
