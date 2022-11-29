import { apiClient } from '@modules/client';
import { useEffect, useState } from 'react';
import { styles } from './NodeMetrics.styles';

type State = {
  offline: number;
  statusText: string;
};

export const NodeMetrics = () => {
  const [data, setData] = useState<State>({
    offline: 0,
    statusText: '',
  });

  const loadMetrics = async () => {
    const metrics: any = await apiClient.getDashboardMetrics();

    const offline = +metrics[1]?.value;

    return {
      statusText: offline === 0 ? '0 Offline' : `${offline} Offline`,
      offline,
    };
  };

  useEffect(() => {
    (async () => {
      const status = await loadMetrics();
      setData(status);
    })();
  }, []);

  return (
    <div css={styles.wrapper}>
      <span
        css={[styles.badge, data.offline ? styles.badgeBad : styles.badgeGood]}
      />
      <span>{data.statusText}</span>
    </div>
  );
};
