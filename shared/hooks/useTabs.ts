import { useEffect, useState } from 'react';
import { usePathname, useSearchParams } from 'next/navigation';
import { useRouter } from 'next/router';
import { useUpdateSearchParams } from '@shared/index';
import { TabItem } from '..';

export function useTabs(tabItems: TabItem[]) {
  const router = useRouter();
  const pathname = usePathname();
  const searchParams = useSearchParams();

  const [activeTab, setActiveTab] = useState('');

  const { createQueryString } = useUpdateSearchParams();

  const tabQuery = searchParams.get('tab');

  useEffect(() => {
    if (router.isReady) setActiveTab(tabQuery ?? tabItems[0]?.value);
  }, [router.isReady]);

  useEffect(() => {
    if (activeTab) {
      const queryParams = createQueryString('tab', activeTab);
      router.replace(`${pathname}?${queryParams}`);
    }
  }, [activeTab]);

  const handleActiveTabChange = (tabValue: string) => {
    setActiveTab(tabValue);
  };

  return {
    activeTab,
    handleActiveTabChange,
  };
}
