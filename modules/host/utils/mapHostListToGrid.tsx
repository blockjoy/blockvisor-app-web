import { TableGridCell, HostIcon, HostIpStatus } from '@shared/components';
import { Host } from '@modules/grpc/library/blockjoy/v1/host';

export const mapHostListToGird = (
  nodeList: Host[],
  onCellClick: (id: string) => void,
) => {
  return nodeList?.map((host: Host) => {
    return {
      key: host.id,
      component: (
        <TableGridCell
          key={host.id}
          onCellClick={() => onCellClick(host.id)}
          titleIcon={<HostIcon />}
          titleText={host.name}
          footer={<HostIpStatus ipAddresses={host.ipAddresses} />}
          middleRow={`Version: ${host.version}`}
        />
      ),
    };
  });
};
