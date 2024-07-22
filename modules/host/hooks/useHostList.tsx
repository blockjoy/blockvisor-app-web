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
  const [hostListLoadingState, setHostListLoadingState] = useRecoilState(
    hostAtoms.hostListLoadingState,
  );
  const [hostList, setHostList] = useRecoilState(hostAtoms.hostList);
  const [hostCount, setHostCount] = useRecoilState(hostAtoms.hostCount);

  const loadHosts = async () => {
    if (hostListLoadingState !== 'initializing')
      setHostListLoadingState('loading');

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
      } else {
        window.scrollTo({
          top: 0,
          behavior: 'instant' as ScrollBehavior,
        });
      }

      setHostList(hosts);
    } catch (err) {
      setHostList([]);
      setHostCount(0);
    } finally {
      setHostListLoadingState('finished');
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
    hostListLoadingState,

    loadHosts,
    setHostList,
    handleHostClick,
    removeFromHostList,
  };
};
