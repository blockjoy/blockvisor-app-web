// import { OrgRole } from '@modules/grpc/library/blockjoy/v1/org';
// import { UserRole } from '@modules/grpc/library/blockjoy/v1/user';

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
}

// export const USER_ROLES: {
//   [UserRole.USER_ROLE_UNSPECIFIED]: string;
//   [UserRole.USER_ROLE_UNPRIVILEGED]: string;
//   [UserRole.USER_ROLE_BLOCKJOY_ADMIN]: string;
//   [UserRole.UNRECOGNIZED]: string;
// } = {
//   [UserRole.USER_ROLE_UNSPECIFIED]: 'Undefined',
//   [UserRole.USER_ROLE_UNPRIVILEGED]: 'User',
//   [UserRole.USER_ROLE_BLOCKJOY_ADMIN]: 'Super User',
//   [UserRole.UNRECOGNIZED]: 'Unknown',
// };

// export const ORG_ROLES: {
//   [OrgRole.ORG_ROLE_UNSPECIFIED]: string;
//   [OrgRole.ORG_ROLE_MEMBER]: string;
//   [OrgRole.ORG_ROLE_OWNER]: string;
//   [OrgRole.ORG_ROLE_ADMIN]: string;
// } = {
//   [OrgRole.ORG_ROLE_UNSPECIFIED]: 'Undefined',
//   [OrgRole.ORG_ROLE_MEMBER]: 'Member',
//   [OrgRole.ORG_ROLE_OWNER]: 'Owner',
//   [OrgRole.ORG_ROLE_ADMIN]: 'Admin',
// };

// export const ORG_PERMISSIONS: {
//   [OrgRole.ORG_ROLE_UNSPECIFIED]: Permissions[];
//   [OrgRole.ORG_ROLE_MEMBER]: Permissions[];
//   [OrgRole.ORG_ROLE_OWNER]: Permissions[];
//   [OrgRole.ORG_ROLE_ADMIN]: Permissions[];
// } = {
//   [OrgRole.ORG_ROLE_UNSPECIFIED]: [],
//   [OrgRole.ORG_ROLE_MEMBER]: [
//     Permissions.READ_ORGANIZATION,

//     Permissions.READ_MEMBER,

//     Permissions.READ_NODE,
//     Permissions.READ_HOST,
//   ],
//   [OrgRole.ORG_ROLE_OWNER]: [
//     Permissions.READ_ORGANIZATION,
//     Permissions.CREATE_ORGANIZATION,
//     Permissions.UPDATE_ORGANIZATION,
//     Permissions.DELETE_ORGANIZATION,

//     Permissions.READ_MEMBER,
//     Permissions.CREATE_MEMBER,
//     Permissions.UPDATE_MEMBER,
//     Permissions.DELETE_MEMBER,

//     Permissions.READ_NODE,
//     Permissions.READ_HOST,
//   ],
//   [OrgRole.ORG_ROLE_ADMIN]: [
//     Permissions.READ_ORGANIZATION,
//     Permissions.CREATE_ORGANIZATION,
//     Permissions.UPDATE_ORGANIZATION,
//     Permissions.DELETE_ORGANIZATION,

//     Permissions.READ_MEMBER,
//     Permissions.CREATE_MEMBER,
//     Permissions.UPDATE_MEMBER,
//     Permissions.DELETE_MEMBER,

//     Permissions.READ_NODE,
//     Permissions.READ_HOST,
//   ],
// };

export function useHasPermissions() {
  return true;
  // if (usrRole) return false;

  // if (usrRole === UserRole.USER_ROLE_BLOCKJOY_ADMIN) return true;

  // if (!!!orgRole || !!!permissions) return false;

  // if (typeof permissions === 'number') {
  //   return ORG_PERMISSIONS[orgRole]?.includes?.(permissions);
  // } else if (Array.isArray(permissions)) {
  //   return ORG_PERMISSIONS[orgRole]?.some((permissions: Permissions) =>
  //     Boolean(ORG_PERMISSIONS[orgRole]?.includes?.(permissions)),
  //   );
  // } else {
  //   return false;
}
