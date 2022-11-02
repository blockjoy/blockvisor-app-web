import { HostProvision } from '@blockjoy/blockjoy-grpc/dist/out/common_pb';
import { isResponeMetaObject, useIdentityRepository } from '@modules/auth';
import { ApplicationError } from '@modules/auth/utils/Errors';
import { apiClient } from '@modules/client';
import { useRecoilState } from 'recoil';
import { hostsAtoms } from '../store/hostAtoms';
import { useProvisionKeysRepository } from './useProvisionKeysRepository';

export function useCreateHostProvision() {
  const [hostProvisionKeys, setHostProvisionKeys] = useRecoilState(
    hostsAtoms.hostProvisionKeys,
  );
  const [loadingHostsState, setLoadingHosts] = useRecoilState(
    hostsAtoms.hostsLoading,
  );
  const provisionKeyRepository = useProvisionKeysRepository();
  const repository = useIdentityRepository();

  const createHostProvision = async (
    ipAddressFrom: string,
    ipAddressTo: string,
    gatewayIpAddress: string,
  ) => {
    setLoadingHosts('loading');

    const orgId = repository?.getIdentity()?.defaultOrganization?.id ?? '';
    const hostProvision = new HostProvision();

    hostProvision.setOrgId(orgId);
    hostProvision.setIpGateway(gatewayIpAddress);
    hostProvision.setIpRangeFrom(ipAddressFrom);
    hostProvision.setIpRangeTo(ipAddressTo);

    const response = await apiClient.createHostProvision(hostProvision);

    if (isResponeMetaObject(response)) {
      const provisionKeys = [...response.messagesList, ...hostProvisionKeys];
      setHostProvisionKeys(provisionKeys);
      provisionKeyRepository?.saveHostProvisionKeys(provisionKeys);
      setLoadingHosts('finished');
      return response.messagesList[0];
    } else {
      setLoadingHosts('finished');
      throw new ApplicationError(
        'CreateHostProvision',
        response?.message ?? '',
      );
    }
  };

  return {
    createHostProvision,
    loading:
      loadingHostsState === 'initializing' || loadingHostsState === 'loading',
    finished: loadingHostsState === 'finished',
  };
}
