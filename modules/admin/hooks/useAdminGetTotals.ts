import {
  nodeClient,
  userClient,
  hostClient,
  organizationClient,
} from '@modules/grpc';

export const useAdminGetTotals = () => {
  const getTotalUsers = async () => {
    const response = await userClient.listUsers('', {
      current_page: 0,
      items_per_page: 0,
    });
    return response.userCount;
  };

  const getTotalNodes = async () => {
    const response = await nodeClient.listNodes(undefined, undefined, {
      current_page: 0,
      items_per_page: 0,
    });
    return response.nodeCount;
  };

  const getTotalHosts = async () => {
    const response = await hostClient.listHosts(undefined, undefined, {
      current_page: 0,
      items_per_page: 0,
    });
    return response.hostCount;
  };

  const getTotalOrgs = async () => {
    const response = await organizationClient.getOrganizations(
      {
        current_page: 0,
        items_per_page: 0,
      },
      '',
      true,
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
