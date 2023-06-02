import { useSetRecoilState, useRecoilState } from 'recoil';
import { useIdentityRepository } from '@modules/auth';
import { hostAtoms } from '../store/hostAtoms';
import { useRouter } from 'next/router';
import { ROUTES } from '@shared/index';
import { hostClient } from '@modules/grpc/clients/hostClient';
import { InitialQueryParams } from '../ui/HostUIHelpers';
import { getInitialQueryParams } from '../ui/HostUIContext';

export const useHostList = () => {
  const router = useRouter();

  const repository = useIdentityRepository();

  const [defaultHost, setDefaultHost] = useRecoilState(hostAtoms.defaultHost);

  const [isLoading, setIsLoading] = useRecoilState(hostAtoms.isLoading);
  const [hostList, setHostList] = useRecoilState(hostAtoms.hostList);

  const setPreloadNodes = useSetRecoilState(hostAtoms.preloadHosts);

  const setHasMore = useSetRecoilState(hostAtoms.hasMoreHosts);

  const handleHostClick = (args: any) => {
    router.push(ROUTES.HOST(args.key));
  };

  const loadHosts = async (queryParams?: InitialQueryParams) => {
    if (!queryParams) {
      const savedQueryParams = getInitialQueryParams();
      queryParams = savedQueryParams;
    }

    const loadingState =
      queryParams.pagination.current_page === 1 ? 'initializing' : 'loading';

    setIsLoading(loadingState);

    setHasMore(false);

    const org_id = repository?.getIdentity()?.defaultOrganization?.id;

    const hosts: any = await hostClient.listHosts(
      org_id!,
      queryParams?.filter,
      queryParams?.pagination,
    );

    if (!defaultHost && Boolean(hosts.length)) setDefaultHost(hosts[0]);

    setPreloadNodes(hosts.length);

    if (queryParams.pagination.current_page === 1) {
      setHostList(hosts);
    } else {
      const newNodes = [...hostList, ...hosts];
      setHostList(newNodes);
    }

    setHasMore(false);

    setPreloadNodes(0);

    setIsLoading('finished');
  };

  return {
    hostList,
    isLoading,

    handleHostClick,
    loadHosts,
  };
};
