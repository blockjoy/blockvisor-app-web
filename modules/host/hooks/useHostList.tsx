import { useRecoilState, useRecoilValue } from 'recoil';
import { hostAtoms } from '../store/hostAtoms';
import { useRouter } from 'next/router';
import { ROUTES } from '@shared/constants/routes';
import { hostClient } from '@modules/grpc/clients/hostClient';
import { InitialQueryParams } from '../ui/HostUIHelpers';
import { getInitialQueryParams } from '../ui/HostUIContext';
import { useDefaultOrganization } from '@modules/organization';
import { HostServiceListResponse } from '@modules/grpc/library/blockjoy/v1/host';
import { hostSelectors } from '../store/hostSelectors';

export const useHostList = () => {
  const router = useRouter();

  const orgId = useDefaultOrganization()?.defaultOrganization?.id!;

  const [defaultHost, setDefaultHost] = useRecoilState(hostAtoms.defaultHost);

  const [isLoading, setIsLoading] = useRecoilState(hostAtoms.isLoading);
  const [hostList, setHostList] = useRecoilState(hostAtoms.hostList);
  const [hostCount, setHostCount] = useRecoilState(hostAtoms.hostCount);
  const hostListSorted = useRecoilValue(hostSelectors.hostListSorted);

  const handleHostClick = (id: string) => {
    router.push(ROUTES.HOST(id));
  };

  const removeFromHostList = (id: string) => {
    const newList = hostListSorted.filter((h) => h.id !== id);

    if (newList.length !== hostListSorted.length) {
      setHostList(newList);
    }

    setHostCount(hostCount - 1);
  };

  const loadHosts = async (queryParams?: InitialQueryParams) => {
    if (!queryParams) {
      const savedQueryParams = getInitialQueryParams();
      queryParams = savedQueryParams;
    }

    const loadingState =
      queryParams.pagination.current_page === 0 ? 'initializing' : 'loading';

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

      if (!defaultHost && Boolean(hosts.length)) setDefaultHost(hosts[0]);

      if (queryParams.pagination.current_page !== 0) {
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
    hostListSorted,
    hostCount,
    isLoading,

    handleHostClick,
    loadHosts,
    setHostList,
    removeFromHostList,
  };
};
