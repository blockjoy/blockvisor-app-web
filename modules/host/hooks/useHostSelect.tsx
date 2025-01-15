import { useRecoilState } from 'recoil';
import {
  HostServiceListHostsResponse,
  HostSortField,
} from '@modules/grpc/library/blockjoy/v1/host';
import { hostClient } from '@modules/grpc';
import { hostAtoms } from '@modules/host';
import { SortOrder } from '@modules/grpc/library/blockjoy/common/v1/search';

export const useHostSelect = () => {
  const [hosts, setHosts] = useRecoilState(hostAtoms.allHosts);
  const [isLoading, setIsLoading] = useRecoilState(hostAtoms.isLoadingAllHosts);

  const getHosts = async (orgId?: string) => {
    try {
      setIsLoading('loading');
      const response: HostServiceListHostsResponse = await hostClient.listHosts(
        orgId,
        undefined,
        {
          currentPage: 0,
          itemsPerPage: 1000,
        },
        [
          {
            field: HostSortField.HOST_SORT_FIELD_NETWORK_NAME,
            order: SortOrder.SORT_ORDER_ASCENDING,
          },
        ],
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
