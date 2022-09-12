import { useState, useEffect } from 'react';
import { useRecoilValue } from 'recoil';
import { formatDistanceToNow } from 'date-fns';
import { appState } from '@modules/app/store';
import { hostStyles } from './host.styles';
import { Skeleton } from '../shared';
import { skeletonStyles } from '../shared/skeleton/skeleton.styles';

type Detail = {
  label: string;
  value: string;
};

export const HostDetails = () => {
  const [rows, setRows] = useState<Detail[]>();
  const { activeHost, hostsLoading } = useRecoilValue(appState);
  const { created_at_datetime, diskSize, memSize, version } = activeHost;

  useEffect(() => {
    if (activeHost?.name) {
      setRows([
        {
          label: 'Created',
          value: formatDistanceToNow(new Date(created_at_datetime), {
            addSuffix: true,
          }),
        },
        { label: 'Version', value: version },
        { label: 'Disk Size', value: diskSize },
        { label: 'Memory Size', value: memSize },
      ]);
    }
  }, [activeHost.name]);

  return hostsLoading ? (
    <div css={skeletonStyles.skeletonGrid}>
      <Skeleton width="200px" />
      <Skeleton width="300px" />
      <Skeleton width="150px" />
    </div>
  ) : (
    <>
      <ul>
        {rows?.map(({ label, value }) => (
          <li key={label} css={hostStyles.detailsRow}>
            <label css={hostStyles.detailsLabel}>{label}</label>
            <span css={hostStyles.detailsValue}>{value?.toString()}</span>
          </li>
        ))}
      </ul>
    </>
  );
};
