import { useRecoilValue } from 'recoil';
import Link from 'next/link';
import { authSelectors } from '@modules/auth';
import { styles } from './HostIps.styles';
import { sortIps } from '@modules/node';
import { DetailsTableTabs, DetailsTableTabsList } from '@shared/components';
import { HostIpAddress } from '@modules/grpc/library/blockjoy/common/v1/host';

type Props = { ipAddresses: HostIpAddress[] };

type ListType = 'all' | 'available' | 'assigned';

export const HostIps = ({ ipAddresses }: Props) => {
  const isSuperUser = useRecoilValue(authSelectors.isSuperUser);

  const renderItems = (ips: HostIpAddress[], listType: ListType) => (
    <DetailsTableTabsList>
      {sortIps(ips)?.length ? (
        sortIps(ips).map(({ ip, assigned }) => (
          <li key={ip} css={styles.ip}>
            {listType !== 'available' && assigned ? (
              <>
                {isSuperUser ? (
                  <Link
                    css={[
                      styles.ipListLink,
                      styles.ipListLinkAssigned,
                      listType === 'all' && styles.ipAssigned,
                    ]}
                    href={`/admin?name=nodes&page=1&ip=${ip}`}
                  >
                    {ip}
                  </Link>
                ) : (
                  <p css={listType === 'all' && styles.ipAssigned}>{ip}</p>
                )}
              </>
            ) : (
              ip
            )}
          </li>
        ))
      ) : (
        <li>None</li>
      )}
    </DetailsTableTabsList>
  );

  const ipAddressesAssigned = ipAddresses.filter(({ assigned }) => assigned);

  const ipAddressesAvailable = ipAddresses.filter(({ assigned }) => !assigned);

  if (!ipAddresses?.length) return <>-</>;

  return (
    <DetailsTableTabs
      tabs={[
        {
          name: 'All',
          items: renderItems(ipAddresses, 'all'),
        },
        {
          name: 'Available',
          items: renderItems(ipAddressesAvailable, 'available'),
        },
        {
          name: 'Assigned',
          items: renderItems(ipAddressesAssigned, 'assigned'),
        },
      ]}
      showTabHeader={
        Boolean(ipAddressesAssigned.length) &&
        Boolean(ipAddressesAvailable.length)
      }
    />
  );
};
