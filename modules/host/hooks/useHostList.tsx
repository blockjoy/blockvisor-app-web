import { useRecoilState, useRecoilValue } from 'recoil';
import { useRouter } from 'next/router';
import { ROUTES } from '@shared/constants/routes';
import { HostServiceListHostsResponse } from '@modules/grpc/library/blockjoy/v1/host';
import { hostClient } from '@modules/grpc/clients/hostClient';
import { hostAtoms, hostSelectors } from 'modules/host';
import {
  organizationAtoms,
  organizationSelectors,
} from '@modules/organization';

export const useHostList = () => {
  const router = useRouter();

  const defaultOrganization = useRecoilValue(
    organizationSelectors.defaultOrganization,
  );
  const allOrganizations = useRecoilValue(organizationAtoms.allOrganizations);
  const queryParams = useRecoilValue(hostSelectors.queryParams);
  const [hostListLoadingState, setHostListLoadingState] = useRecoilState(
    hostAtoms.hostListLoadingState,
  );
  const [hostList, setHostList] = useRecoilState(hostAtoms.hostList);
  const [hostCount, setHostCount] = useRecoilState(hostAtoms.hostCount);
  const [hostListGlobal, setHostListGlobal] = useRecoilState(
    hostAtoms.hostListGlobal,
  );
  const [hostListGlobalLoadingState, setHostListGlobalLoadingState] =
    useRecoilState(hostAtoms.hostListGlobalLoadingState);

  const loadHosts = async () => {
    if (hostListLoadingState !== 'initializing')
      setHostListLoadingState('loading');

    try {
      const response: HostServiceListHostsResponse = await hostClient.listHosts(
        defaultOrganization?.orgId!,
        queryParams.filter,
        queryParams.pagination,
        queryParams.sort,
      );

      const { total } = response;

      let hosts = response.hosts;

      setHostCount(total);

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

  const loadGlobalHosts = async () => {
    try {
      setHostListGlobalLoadingState('initializing');

      const orgIds = allOrganizations.map((org) => org.orgId);

      const response = await hostClient.listHosts(
        undefined,
        { orgIds },
        {
          currentPage: 0,
          itemsPerPage: 1000,
        },
      );

      setHostListGlobal(response.hosts);
    } catch (error: any) {
      console.log('Error caught while fetching all hosts: ', error);
      setHostListGlobal([]);
    } finally {
      setHostListGlobalLoadingState('finished');
    }
  };

  const handleHostClick = (id: string) => {
    router.push(ROUTES.HOST(id));
  };

  const removeFromHostList = (id: string) => {
    const newList = hostList.filter((h) => h.hostId !== id);

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

    hostListGlobal,
    hostListGlobalLoadingState,
    loadGlobalHosts,
  };
};
