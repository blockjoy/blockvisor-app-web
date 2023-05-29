import { useSetRecoilState, useRecoilState } from 'recoil';
import { useIdentityRepository } from '@modules/auth';
import { hostAtoms } from '../store/hostAtoms';
import { useRouter } from 'next/router';
import { ROUTES } from '@shared/index';
import { DUMMY_HOSTS } from '../mocks/host';
import { hostClient } from '@modules/grpc/clients/hostClient';

export const useHostList = () => {
  const router = useRouter();

  const repository = useIdentityRepository();

  const [isLoading, setIsLoading] = useRecoilState(hostAtoms.isLoading);
  const [hostList, setHostList] = useRecoilState(hostAtoms.hostList);

  const handleHostClick = (args: any) => {
    router.push(ROUTES.HOST(args.key));
  };

  const loadHosts = async () => {
    setIsLoading('initializing');

    const org_id = repository?.getIdentity()?.defaultOrganization?.id;

    const hostsAPI: any = await hostClient.listHosts(org_id!);

    const hosts: any = DUMMY_HOSTS;
    await new Promise((r) => setTimeout(r, 300));

    console.log('HOSTS', hosts);

    setHostList(hosts);

    setIsLoading('finished');
  };

  return {
    hostList,
    isLoading,

    handleHostClick,
    loadHosts,
  };
};
