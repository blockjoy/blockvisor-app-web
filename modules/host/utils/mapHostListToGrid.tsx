import {
  TableGridCell,
  HostStatus,
  HostIcon,
  HostOs,
} from '@shared/components';
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
          cellTitle={host.name}
          cellIcon={<HostIcon />}
          cellStatus={<HostStatus />}
          cellType={<HostOs os={host.os} osVersion={host.osVersion} />}
        />
      ),
    };
  });
};
