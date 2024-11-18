import { TableGridCell, HostIcon, HostIpStatus } from '@shared/components';
import { Host } from '@modules/grpc/library/blockjoy/v1/host';
import { spacing } from 'styles/utils.spacing.styles';

export const mapHostListToGird = (
  nodeList: Host[],
  onCellClick: (id: string) => void,
) => {
  return nodeList?.map((host: Host) => {
    return {
      key: host.hostId,
      component: (
        <TableGridCell
          key={host.hostId}
          onCellClick={() => onCellClick(host.hostId)}
          titleIcon={<HostIcon />}
          titleText={host.displayName || host.networkName}
          footer={<HostIpStatus ipAddresses={host.ipAddresses} />}
          middleRow={
            <div css={[spacing.top.micro, spacing.bottom.small]}>
              {' '}
              Version: {host.bvVersion}
            </div>
          }
        />
      ),
    };
  });
};
