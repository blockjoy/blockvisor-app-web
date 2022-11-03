import { useRecoilState, useRecoilValue } from 'recoil';
import { HostProvision } from '@blockjoy/blockjoy-grpc/dist/out/common_pb';
import { apiClient } from '@modules/client';
import { toast } from 'react-toastify';
import { useEffect } from 'react';
import { hostsAtoms } from '../store/hostAtoms';
import { delay } from '@shared/utils/delay';
import { env } from '@shared/constants/env';
import { authAtoms } from '@modules/auth';

export const useHosts = () => {
  const [hostProvisionKeys, setHostProvisionKeys] = useRecoilState(
    hostsAtoms.hostProvisionKeys,
  );
  const [hosts, setHosts] = useRecoilState(hostsAtoms.hosts);
  const [host, setHost] = useRecoilState(hostsAtoms.host);
  const [loadingHost, setHostLoading] = useRecoilState(hostsAtoms.hostLoading);
  const [loadingHosts, setLoadingHosts] = useRecoilState(
    hostsAtoms.hostsLoading,
  );

  const user = useRecoilValue(authAtoms.user);

  const deleteHost = async (id: string) => {
    const uuid = id?.toString()!;
    await apiClient.execDeleteHost(uuid);
    toast.success(`Host Deleted`);
  };

  const stopHost = async (id: string) => {
    const uuid = id?.toString()!;
    await apiClient.execStopHost(uuid);
    toast.success(`Host Stopped`);
  };

  const restartHost = async (id: string) => {
    const uuid = id?.toString()!;
    await apiClient.execRestartHost(uuid);
    toast.success(`Host Restarted`);
  };

  useEffect(() => {
    if (localStorage.getItem('hostProvisionKeys')) {
      setHostProvisionKeys(
        JSON.parse(localStorage.getItem('hostProvisionKeys') || ''),
      );
    }
  }, []);

  return {
    stopHost,
    restartHost,
    deleteHost,
    hostAddKey: hostProvisionKeys?.length ? hostProvisionKeys[0] : '',
    hosts,
    loadingHosts: loadingHosts,
    loadingHost: Boolean(loadingHost),
  };
};
