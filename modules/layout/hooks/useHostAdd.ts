import { useRecoilState } from 'recoil';
import { layoutState } from '@modules/layout/store';
import { apiClient } from '@modules/client';
import { HostProvision, Uuid } from 'blockjoy-mock-grpc/dist/out/common_pb';
import { toast } from 'react-toastify';

type Hook = {
  createHostProvision: (callback: () => void) => any;
};

export const useHostAdd = (): Hook => {
  const [layout, setLayout] = useRecoilState(layoutState);

  const createHostProvision = async (callback: () => void) => {
    setLayout({
      ...layout,
      hostAddCreating: true,
    });

    const orgId = new Uuid();
    orgId.setValue('to-be-populated');

    const hostProvision = new HostProvision();
    hostProvision.setOrgId;

    const response: any = await apiClient.createHostProvision(hostProvision);

    toast.success('Provisioning Host');

    setTimeout(() => {
      setLayout({
        ...layout,
        hostAddCreating: false,
        hostAddKey: response.key || 'EQ2WBtEt50',
      });

      callback();
    }, 1000);

    return response;
  };

  return {
    createHostProvision,
  };
};
