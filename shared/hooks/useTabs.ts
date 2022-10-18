import { useRouter } from 'next/router';
import { useEffect, useState } from 'react';

export function useTabs(noOfTabs: number) {
  const { query, replace, isReady } = useRouter();
  const [activeTab, setActiveTab] = useState('');

  useEffect(() => {
    if (isReady) {
      if (
        query.tab &&
        typeof query.tab === 'string' &&
        parseInt(query.tab) <= noOfTabs
      ) {
        setActiveTab(query.tab);
      } else {
        replace({
          query: { ...query, tab: '1' },
        });
      }
    }
  }, [query.tab]);

  return { activeTab, setActiveTab };
}
