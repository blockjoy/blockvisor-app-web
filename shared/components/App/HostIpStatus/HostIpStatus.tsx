import { HostIpAddress } from '@modules/grpc/library/blockjoy/v1/host';
import { Alert } from '@shared/components';
import { styles } from './HostIpStatus.styles';

type Props = {
  ipAddresses: HostIpAddress[];
  isRounded?: boolean;
};

export const HostIpStatus = ({ ipAddresses, isRounded }: Props) => {
  const ipAddressCount = ipAddresses?.reduce(
    (acc, ip) => acc + (!ip.assigned ? 1 : 0),
    0,
  );

  return (
    <Alert
      isRounded={isRounded}
      isSuccess={ipAddressCount > 0}
      additionalStyles={[styles.alert]}
    >{`${ipAddressCount} IP${ipAddressCount !== 1 ? `'s` : ''}`}</Alert>
  );
};
