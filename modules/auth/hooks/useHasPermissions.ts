export enum OrgRole {
  UndefinedOrgRole,
  Owner,
  Member,
  Admin,
};

export enum Permissions {
  READ_ORGANIZATION,
  CREATE_ORGANIZATION,
  UPDATE_ORGANIZATION,
  DELETE_ORGANIZATION,

  READ_MEMBER,
  CREATE_MEMBER,
  UPDATE_MEMBER,
  DELETE_MEMBER,
};

export const PERMISSIONS: {
  [OrgRole.UndefinedOrgRole]: Permissions[],
  [OrgRole.Owner]: Permissions[],
  [OrgRole.Member]: Permissions[],
  [OrgRole.Admin]: Permissions[],
} = {
  [OrgRole.UndefinedOrgRole]: [],
  [OrgRole.Owner]: [
    Permissions.READ_ORGANIZATION,
    Permissions.CREATE_ORGANIZATION,
    Permissions.UPDATE_ORGANIZATION,
    Permissions.DELETE_ORGANIZATION,

    Permissions.READ_MEMBER,
    Permissions.CREATE_MEMBER,
    Permissions.UPDATE_MEMBER,
    Permissions.DELETE_MEMBER,
  ],
  [OrgRole.Member]: [
    Permissions.READ_ORGANIZATION,

    Permissions.READ_MEMBER,
  ],
  [OrgRole.Admin]: [
    Permissions.READ_ORGANIZATION,
    Permissions.CREATE_ORGANIZATION,
    Permissions.UPDATE_ORGANIZATION,

    Permissions.READ_MEMBER,
    Permissions.CREATE_MEMBER,
    Permissions.UPDATE_MEMBER,
  ],
};

export function useHasPermissions(orgRole: OrgRole, permissions: Permissions | Permissions[]) {
  if (typeof orgRole === 'undefined' || typeof permissions === 'undefined') {
    return false;
  }

  if (typeof permissions === "number") {
    return PERMISSIONS[orgRole].includes?.(permissions);
  } else if (Array.isArray(permissions)) {
    return PERMISSIONS[orgRole].some((permissions: Permissions) =>
      Boolean(PERMISSIONS[orgRole].includes?.(permissions))
    );
  } else {
    return false;
  }
};
