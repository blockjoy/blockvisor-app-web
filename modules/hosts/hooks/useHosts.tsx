import { useRecoilState, useRecoilValue } from 'recoil';
import { HostProvision } from '@blockjoy/blockjoy-grpc/dist/out/common_pb';
import { apiClient } from '@modules/client';
import { toast } from 'react-toastify';
import { useEffect } from 'react';
import { hostsAtoms } from '../store/hostAtoms';
import { delay } from '@shared/utils/delay';
import { env } from '@shared/constants/env';
import { organisationAtoms } from '@modules/organizations';

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

  const defaultOrganization = useRecoilValue(
    organisationAtoms.defaultOrganization,
  );

  const getHosts = async () => {
    setLoadingHosts(true);
    // revisit this once types are consolidated

    console.log('defaultOrganization', defaultOrganization?.id);

    const hosts: any = await apiClient.getHosts(
      undefined,
      defaultOrganization?.id || '',
      undefined,
    );

    console.log('hosts', hosts);

    // load provisioning hosts
    if (localStorage.getItem('hostProvisionKeys')) {
      const hostProvisionKeys = JSON.parse(
        localStorage.getItem('hostProvisionKeys') || '',
      );

      for (let key of hostProvisionKeys) {
        const response: any = await apiClient.getHostProvision(key);
        const hostProvisionRecord = response[0];
        if (!hostProvisionRecord?.claimedAt) {
          hosts.unshift({
            isHostProvision: true,
            name: 'Host Provisioning',
            location: `Key: ${hostProvisionRecord.id}`,
            id: hostProvisionRecord.id,
            created_at_datetime: new Date(),
          });
        }
      }
    }

    setHosts(hosts);
    await delay(env.loadingDuration);
    setLoadingHosts(false);
  };
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

  const loadHost = async (id: string) => {
    setHostLoading(true);

    const uuid = id!;
    // revisit this once types are consolidated
    const hosts: any = await apiClient.getHosts(
      undefined,
      defaultOrganization?.id,
      undefined,
    );

    // temp fix to get host from full list
    const host = hosts.find((h: any) => h.id === id);

    setHost(host);
    await delay(env.loadingDuration);
    setHostLoading(false);
  };

  const createHostProvision = async (callback: (args1: string) => void) => {
    const orgId = defaultOrganization?.id || '';

    const hostProvision = new HostProvision();
    hostProvision.setOrgId(orgId);

    const response: any = await apiClient.createHostProvision(hostProvision);
    1;

    const hostProvisionKey = response?.messagesList[0];
    const hostProvisionKeysCopy = [...hostProvisionKeys];

    hostProvisionKeysCopy.push(hostProvisionKey);

    setHostProvisionKeys(hostProvisionKeysCopy);

    localStorage.setItem(
      'hostProvisionKeys',
      JSON.stringify(hostProvisionKeysCopy),
    );

    await delay(env.loadingDuration);

    toast.success('Provisioning Host');

    callback(hostProvisionKey);
  };

  useEffect(() => {
    if (localStorage.getItem('hostProvisionKeys')) {
      setHostProvisionKeys(
        JSON.parse(localStorage.getItem('hostProvisionKeys') || ''),
      );
    }
  }, []);

  return {
    loadHost,
    stopHost,
    restartHost,
    deleteHost,
    createHostProvision,
    getHosts,
    hostAddKey: hostProvisionKeys?.length ? hostProvisionKeys[0] : '',
    hosts,
    loadingHosts: Boolean(loadingHosts),
    host,
    loadingHost: Boolean(loadingHost),
  };
};
