import { useSetRecoilState, useRecoilState } from 'recoil';
import { useIdentityRepository } from '@modules/auth';
import { hostAtoms } from '../store/hostAtoms';
import { useRouter } from 'next/router';
import { ROUTES } from '@shared/index';
import { DUMMY_HOSTS } from '../mocks/host';
import { Host } from '@modules/grpc/library/blockjoy/v1/host';
import { hostClient } from '@modules/grpc/clients/hostClient';

export const useHostView = () => {
  const router = useRouter();

  const repository = useIdentityRepository();

  const [isLoading, setIsLoading] = useRecoilState(hostAtoms.isLoading);
  const [host, setHost] = useRecoilState(hostAtoms.activeHost);

  const loadHost = async (id?: string | string[]) => {
    setIsLoading('initializing');

    const org_id = repository?.getIdentity()?.defaultOrganization?.id;

    // const host: any = await hostClient.getHost(id);
    // console.log('HOST', host);

    const hostMocked: any = DUMMY_HOSTS.find((host: any) => host.id === id);
    await new Promise((r) => setTimeout(r, 900));
    console.log('HOST MOCKED', host);

    setHost(hostMocked);

    setIsLoading('finished');
  };

  const unloadHost = () => {
    setHost(null);
    setIsLoading('finished');
  };

  return {
    host,
    isLoading,

    loadHost,
    unloadHost,
  };
};
