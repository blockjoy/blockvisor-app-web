import {
  nodeClient,
  userClient,
  hostClient,
  organizationClient,
} from '@modules/grpc';

export const useAdminGetTotals = () => {
  const getTotalUsers = async () => {
    const response = await userClient.listUsers('', {
      currentPage: 0,
      itemsPerPage: 0,
    });
    return response.userCount;
  };

  const getTotalNodes = async () => {
    const response = await nodeClient.listNodes(undefined, undefined, {
      currentPage: 0,
      itemsPerPage: 0,
    });
    return response.nodeCount;
  };

  const getTotalHosts = async () => {
    const response = await hostClient.listHosts(undefined, undefined, {
      currentPage: 0,
      itemsPerPage: 0,
    });
    return response.hostCount;
  };

  const getTotalOrgs = async () => {
    const response = await organizationClient.listOrganizations(
      {
        currentPage: 0,
        itemsPerPage: 0,
      },
      [],
      '',
      true,
      false,
    );
    return response.orgCount;
  };

  return {
    getTotalUsers,
    getTotalNodes,
    getTotalHosts,
    getTotalOrgs,
  };
};
