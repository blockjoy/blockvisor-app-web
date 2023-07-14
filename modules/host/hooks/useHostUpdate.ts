import { Host } from '@modules/grpc/library/blockjoy/v1/host';
import { useHostList } from './useHostList';
import { useHostView } from './useHostView';

export const useHostUpdate = () => {
  const { hostList, setHostList } = useHostList();
  const { host, setHost } = useHostView();

  const modifyHost = (modifiedHost: Host) => {
    if (host?.id === modifiedHost.id) {
      const newHost: Host = {
        ...host,
        ...modifiedHost,
      };
      setHost(newHost);
    }

    if (hostList?.length) {
      const newHostList = hostList.map((host: Host) => {
        if (host.id === modifiedHost.id) {
          const newHostInList = {
            ...host,
            ...modifiedHost,
          };

          return newHostInList;
        }

        return host;
      });
      setHostList(newHostList);
    }
  };

  return {
    modifyHost,
  };
};
