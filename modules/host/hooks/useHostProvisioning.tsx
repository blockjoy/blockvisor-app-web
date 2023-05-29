import { hostClient } from '@modules/grpc/clients/hostClient';

export const useHostProvisioning = () => {
  const provision = async () => {
    const provisionToken: any = await hostClient.provision();

    return provisionToken;
  };

  return {
    provision,
  };
};
