export enum OrgRole {
  UndefinedOrgRole,
  Owner,
  Member,
  Admin,
};

export enum Permissions {
  READ_ORGANIZATION,
  DELETE_ORGANIZATION,
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
    Permissions.DELETE_ORGANIZATION
  ],
  [OrgRole.Member]: [
    Permissions.READ_ORGANIZATION
  ],
  [OrgRole.Admin]: [
    Permissions.READ_ORGANIZATION,
    Permissions.DELETE_ORGANIZATION
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
