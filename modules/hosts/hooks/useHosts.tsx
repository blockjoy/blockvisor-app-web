import { useRecoilState } from 'recoil';
import {
  HostProvision,
  Uuid,
} from '@blockjoy/blockjoy-grpc/dist/out/common_pb';
import { apiClient } from '@modules/client';
import { toast } from 'react-toastify';
import { useState } from 'react';
import { hostsAtoms } from '@modules/hosts';
import { delay } from '@shared/utils/delay';
import { env } from '@shared/constants/env';

export const useHosts = () => {
  const [hostAddKey, setHostAddKey] = useState<string>();
  const [hosts, setHosts] = useRecoilState(hostsAtoms.hosts);
  const [host, setHost] = useRecoilState(hostsAtoms.host);
  const [loadingHost, setHostLoading] = useRecoilState(hostsAtoms.hostLoading);
  const [loadingHosts, setLoadingHosts] = useRecoilState(
    hostsAtoms.hostsLoading,
  );

  const getHosts = async () => {
    setLoadingHosts(true);
    // revisit this once types are consolidated
    const hosts: any = await apiClient.getHosts();

    console.log('hosts', hosts);
    setHosts(hosts);
    await delay(env.loadingDuration);
    setLoadingHosts(false);
  };
  const deleteHost = async (id: string) => {
    const uuid = new Uuid();
    uuid.setValue(id?.toString()!);
    await apiClient.execDeleteHost(uuid);
    toast.success(`Host Deleted`);
  };

  const stopHost = async (id: string) => {
    const uuid = new Uuid();
    uuid.setValue(id?.toString()!);
    await apiClient.execStopHost(uuid);
    toast.success(`Host Stopped`);
  };

  const restartHost = async (id: string) => {
    const uuid = new Uuid();
    uuid.setValue(id?.toString()!);
    await apiClient.execRestartHost(uuid);
    toast.success(`Host Restarted`);
  };

  const loadHost = async (id: string) => {
    setHostLoading(true);

    const uuid = new Uuid();
    uuid.setValue(id!);
    // revisit this once types are consolidated
    const hosts: any = await apiClient.getHosts(uuid);

    // temp fix to get host from full list
    const host = hosts.find((h: any) => h.id.value === id);

    console.log('loadHost', host);

    setHost(host);
    await delay(env.loadingDuration);
    setHostLoading(false);
  };

  const createHostProvision = async (callback: () => void) => {
    const orgId = new Uuid();
    orgId.setValue(process.env.NEXT_PUBLIC_ORG_ID || '');

    const hostProvision = new HostProvision();
    hostProvision.setOrgId(orgId);

    const response: any = await apiClient.createHostProvision(hostProvision);

    toast.success('Provisioning Host');

    setTimeout(() => {
      setHostAddKey(response.key || '');

      callback();
    }, 1000);

    return response;
  };

  return {
    loadHost,
    stopHost,
    restartHost,
    deleteHost,
    createHostProvision,
    getHosts,
    hostAddKey,
    hosts,
    loadingHosts: Boolean(loadingHosts),
    host,
    loadingHost: Boolean(loadingHost),
  };
};
