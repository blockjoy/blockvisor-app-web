import { usePermissions } from '@modules/auth';
import { HostIpAddress } from '@modules/grpc/library/blockjoy/v1/host';
import { ChangeEvent, useCallback, useEffect, useRef, useState } from 'react';
import { styles } from './HostIps.styles';
import Link from 'next/link';
import { NextLink } from '@shared/components/Buttons';

type Props = {
  ipAddresses: HostIpAddress[];
};

const listTypes = ['all', 'available', 'assigned'];

type ListType = 'all' | 'available' | 'assigned';

export const HostIps = ({ ipAddresses }: Props) => {
  const listRef = useRef<HTMLOListElement>(null);

  const { isSuperUser } = usePermissions();

  const [listHeight, setListHeight] = useState(0);

  const [isTransitionEnabled, setIsTransitionEnabled] = useState(false);

  const [ipListType, setIpListType] = useState<ListType>('all');

  const handleChange = (e: ChangeEvent<HTMLInputElement>) => {
    setIpListType(e.target.value as ListType);
  };

  const getFilteredIps = useCallback(() => {
    switch (ipListType) {
      case 'assigned':
        return ipAddresses.filter(({ assigned }) => assigned);
      case 'available':
        return ipAddresses.filter(({ assigned }) => !assigned);
      default:
        return ipAddresses;
    }
  }, [ipListType]);

  const getSortedIps = (ips: HostIpAddress[]) => {
    const ipsCopy = [...ips];

    const sortedIps = ipsCopy.sort((a, b) => {
      const num1 = Number(
        a.ip
          .split('.')
          .map((num) => `000${num}`.slice(-3))
          .join(''),
      );
      const num2 = Number(
        b.ip
          .split('.')
          .map((num) => `000${num}`.slice(-3))
          .join(''),
      );
      return num1 - num2;
    });

    return sortedIps;
  };

  const sortedIps =
    ipListType === 'all'
      ? getSortedIps(ipAddresses)
      : getSortedIps([...getFilteredIps()]);

  useEffect(() => {
    const newListHeight = listRef.current?.clientHeight;
    setListHeight(newListHeight!);
    if (ipListType === 'all' && !isTransitionEnabled) {
      setIsTransitionEnabled(true);
    }
  }, [ipListType]);

  if (!ipAddresses?.length) return <>-</>;

  return (
    <div css={styles.wrapper}>
      {isSuperUser && (
        <ul css={styles.listPicker}>
          {listTypes.map((type) => (
            <li key={type}>
              <input
                onChange={handleChange}
                checked={ipListType === type}
                type="radio"
                value={type}
                id={type}
                name="listType"
              />
              <label htmlFor={type}>{type}</label>
            </li>
          ))}
        </ul>
      )}
      <div
        css={styles.ipListWrapper}
        style={{
          height: isTransitionEnabled ? `${listHeight}px` : undefined,
          transition: isTransitionEnabled ? '0.4s ease' : '',
        }}
      >
        <ol
          css={styles.ipList}
          ref={listRef}
          style={{
            position: isTransitionEnabled ? 'absolute' : 'static',
          }}
        >
          {sortedIps?.length
            ? sortedIps.map(({ ip, assigned }) => (
                <li
                  key={ip}
                  css={[
                    styles.ip,
                    ipListType === 'all' && assigned && styles.ipAssigned,
                  ]}
                >
                  {isSuperUser && ipListType === 'assigned' ? (
                    <NextLink href={`/admin?name=nodes&page=0&search=${ip}`}>
                      {ip}
                    </NextLink>
                  ) : (
                    ip
                  )}
                </li>
              ))
            : `None`}
        </ol>
      </div>
    </div>
  );
};
