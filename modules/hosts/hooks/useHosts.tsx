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

  const getHosts = async () => {
    setLoadingHosts('loading');
    // revisit this once types are consolidated

    let hosts: any[] = [];

    const hostsResponse: any = await apiClient.getHosts(
      undefined,
      user?.defaultOrganization?.id,
      undefined,
    );

    console.log('hosts', hosts);

    if (hostsResponse?.code !== 6) {
      hosts = hostsResponse;
      setLoadingHosts('finished');
    }

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
    setLoadingHosts('finished');
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
      user?.defaultOrganization?.id,
      undefined,
    );

    // temp fix to get host from full list
    const host = hosts.find((h: any) => h.id === id);

    setHost(host);
    await delay(env.loadingDuration);
    setHostLoading(false);
  };

  const createHostProvision = async (
    ipAddressFrom: string,
    ipAddressTo: string,
    gatewayIpAddress: string,
    callback: (args1: string) => void,
  ) => {
    const orgId = user?.defaultOrganization?.id!;

    const hostProvision = new HostProvision();
    hostProvision.setOrgId(orgId);
    // TODO: impl the following
    /*
    hostProvision.setIpGateway("<your gateway ip>");
    hostProvision.setIpRangeFrom("<ip range start>");
    hostProvision.setIpRangeTo("<ip range end>");
    */

    const response: any = await apiClient.createHostProvision(hostProvision);

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
    loadingHosts: loadingHosts,
    host,
    loadingHost: Boolean(loadingHost),
  };
};
