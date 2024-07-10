import { useRecoilState, useRecoilValue } from 'recoil';
import { useRouter } from 'next/router';
import { ROUTES } from '@shared/constants/routes';
import { HostServiceListResponse } from '@modules/grpc/library/blockjoy/v1/host';
import { hostClient } from '@modules/grpc/clients/hostClient';
import { hostAtoms, hostSelectors } from 'modules/host';
import { organizationSelectors } from '@modules/organization';

export const useHostList = () => {
  const router = useRouter();

  const defaultOrganization = useRecoilValue(
    organizationSelectors.defaultOrganization,
  );
  const queryParams = useRecoilValue(hostSelectors.queryParams);
  const [isLoading, setIsLoading] = useRecoilState(hostAtoms.isLoading);
  const [hostList, setHostList] = useRecoilState(hostAtoms.hostList);
  const [hostCount, setHostCount] = useRecoilState(hostAtoms.hostCount);

  const loadHosts = async () => {
    const loadingState =
      queryParams.pagination.currentPage === 0 ? 'initializing' : 'loading';

    if (!hostList?.length) setIsLoading(loadingState);

    try {
      const response: HostServiceListResponse = await hostClient.listHosts(
        defaultOrganization?.id!,
        queryParams.filter,
        queryParams.pagination,
        queryParams.sort,
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

  return {
    hostList,
    hostCount,
    isLoading,

    loadHosts,
    setHostList,
    handleHostClick,
    removeFromHostList,
  };
};
