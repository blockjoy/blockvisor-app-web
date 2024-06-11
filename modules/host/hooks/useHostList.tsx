import { useRecoilState, useRecoilValue } from 'recoil';
import { useRouter } from 'next/router';
import { ROUTES } from '@shared/constants/routes';
import { HostServiceListResponse } from '@modules/grpc/library/blockjoy/v1/host';
import { hostClient } from '@modules/grpc/clients/hostClient';
import {
  hostAtoms,
  getInitialQueryParams,
  InitialQueryParams,
  hostSelectors,
} from 'modules/host';
import { useDefaultOrganization } from '@modules/organization';

export const useHostList = () => {
  const router = useRouter();

  const orgId = useDefaultOrganization()?.defaultOrganization?.id!;

  const [isLoading, setIsLoading] = useRecoilState(hostAtoms.isLoading);
  const [hostList, setHostList] = useRecoilState(hostAtoms.hostList);
  const [hostCount, setHostCount] = useRecoilState(hostAtoms.hostCount);

  const initialFilters = useRecoilValue(hostSelectors.filters);
  const initialKeyword = useRecoilValue(hostAtoms.filtersSearchQuery);

  const handleHostClick = (id: string) => {
    router.push(ROUTES.HOST(id));
  };

  const removeFromHostList = (id: string) => {
    const newList = hostList.filter((h) => h.id !== id);

    if (newList.length !== hostList.length) {
      setHostList(newList);
    }

    setHostCount(hostCount - 1);
  };

  const loadHosts = async (queryParams?: InitialQueryParams) => {
    if (!queryParams) {
      const savedQueryParams = getInitialQueryParams(
        initialFilters,
        initialKeyword,
      );
      queryParams = savedQueryParams;
    }

    const loadingState =
      queryParams.pagination.currentPage === 0 ? 'initializing' : 'loading';

    setIsLoading(loadingState);

    try {
      const response: HostServiceListResponse = await hostClient.listHosts(
        orgId!,
        queryParams.filter,
        queryParams.pagination,
      );

      const { hostCount } = response;

      let hosts = response.hosts;

      setHostCount(hostCount);

      if (queryParams.pagination.currentPage !== 0) {
        hosts = [...hostList!, ...hosts];
      }

      setHostList(hosts);
      setIsLoading('finished');
    } catch (err) {
      setIsLoading('finished');
    }
  };

  return {
    hostList,
    hostCount,
    isLoading,

    handleHostClick,
    loadHosts,
    setHostList,
    removeFromHostList,
  };
};
