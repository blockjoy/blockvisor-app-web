import { useRecoilState, useRecoilValue } from 'recoil';
import { HostServiceListResponse } from '@modules/grpc/library/blockjoy/v1/host';
import { hostClient } from '@modules/grpc';
import { organizationAtoms } from '@modules/organization';
import { hostAtoms } from '@modules/host';

export const useHostSelect = () => {
  const defaultOrganization = useRecoilValue(
    organizationAtoms.defaultOrganization,
  );
  const [hosts, setHosts] = useRecoilState(hostAtoms.allHosts);
  const [isLoading, setIsLoading] = useRecoilState(hostAtoms.isLoadingAllHosts);

  const getHosts = async () => {
    try {
      setIsLoading('loading');
      const response: HostServiceListResponse = await hostClient.listHosts(
        defaultOrganization?.id!,
        undefined,
        {
          currentPage: 0,
          itemsPerPage: 1000,
        },
      );

      setHosts(response?.hosts);
    } catch (err) {
      console.error('Error occurred while fetching hosts', err);
    } finally {
      setIsLoading('finished');
    }
  };

  return {
    hosts,
    isLoading,

    getHosts,
  };
};
