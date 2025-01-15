import {
  nodeClient,
  userClient,
  hostClient,
  organizationClient,
  protocolClient,
} from '@modules/grpc';

export const useAdminGetTotals = () => {
  const getTotalUsers = async () => {
    const response = await userClient.listUsers('', {
      currentPage: 0,
      itemsPerPage: 10000,
    });
    return response.total;
  };

  const getTotalNodes = async () => {
    try {
      const response = await nodeClient.listNodes(undefined, undefined, {
        currentPage: 0,
        itemsPerPage: 10000,
      });
      return response.total;
    } catch (err) {
      return 0;
    }
  };

  const getTotalHosts = async () => {
    const response = await hostClient.listHosts(undefined, undefined, {
      currentPage: 0,
      itemsPerPage: 10000,
    });
    return response.total;
  };

  const getTotalOrgs = async () => {
    const response = await organizationClient.listOrganizations(
      {
        currentPage: 0,
        itemsPerPage: 10000,
      },
      [],
      '',
      true,
      false,
    );
    return response.total;
  };

  const getTotalProtocols = async () => {
    const response = await protocolClient.listProtocols();
    return response.total;
  };

  return {
    getTotalUsers,
    getTotalNodes,
    getTotalHosts,
    getTotalOrgs,
    getTotalProtocols,
  };
};
