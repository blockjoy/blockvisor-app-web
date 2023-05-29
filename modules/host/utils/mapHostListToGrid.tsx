import { TableGridCell, HostStatus } from '@shared/components';
import { Host } from '@modules/grpc/library/blockjoy/v1/host';

export const mapHostListToGird = (
  nodeList: Host[],
  onCellClick: (args0: any) => void,
) => {
  return nodeList?.map((host: Host) => {
    return {
      key: host.id,
      component: (
        <TableGridCell
          key={host.id}
          onCellClick={() => onCellClick({ key: host.id })}
          cellTitle={host.name}
          cellIcon={null}
          cellStatus={<HostStatus status={host.status} />}
          cellType={host.ip}
        />
      ),
    };
  });
};
