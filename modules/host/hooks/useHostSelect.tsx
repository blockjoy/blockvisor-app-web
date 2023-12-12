import { useState } from 'react';
import {
  Host,
  HostServiceListResponse,
} from '@modules/grpc/library/blockjoy/v1/host';
import { hostClient } from '@modules/grpc';
import { useDefaultOrganization } from '@modules/organization';

export const useHostSelect = () => {
  const [hosts, setHosts] = useState<Host[]>([]);
  const [isLoading, setIsLoading] = useState(false);
  const { defaultOrganization } = useDefaultOrganization();

  const getHosts = async () => {
    try {
      setIsLoading(true);
      const response: HostServiceListResponse = await hostClient.listHosts(
        defaultOrganization?.id!,
        undefined,
        {
          current_page: 0,
          items_per_page: 1000,
        },
      );

      setHosts(response?.hosts);
    } catch (err) {
      console.error('Error occurred while fetching hosts', err);
    } finally {
      setIsLoading(false);
    }
  };

  return {
    hosts,
    isLoading,

    getHosts,
  };
};
