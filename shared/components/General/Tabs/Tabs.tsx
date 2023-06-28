import { Skeleton } from '@shared/components';
import { ReactNode } from 'react';
import { reset } from 'styles/utils.reset.styles';
import { wrapper } from 'styles/wrapper.styles';
import { styles } from './Tabs.styles';

type Props = {
  activeTab: string;
  tabItems: Array<TabItem>;
  onTabClick: (tabValue: string) => void;
  isLoading?: boolean;
};

export type TabItem = { value: string; label: string; component: ReactNode };

export function Tabs({
  tabItems,
  activeTab,
  onTabClick,
  isLoading = false,
}: Props) {
  return (
    <>
      <div css={wrapper.main}>
        <nav css={styles.tabs}>
          {isLoading ? (
            <div css={styles.loading}>
              <Skeleton width="200px" />
            </div>
          ) : (
            <ul css={[reset.list, styles.tabList]}>
              {tabItems.map((item, index) => (
                <li key={index}>
                  <button
                    css={[reset.button, styles.tabsButton]}
                    className={activeTab === item.value ? 'active' : ''}
                    onClick={() => onTabClick(item.value)}
                  >
                    {item.label}
                  </button>
                </li>
              ))}
            </ul>
          )}
        </nav>
      </div>
      {tabItems.map((item, index) => {
        return activeTab === item.value ? (
          <div key={index} css={[styles.tabComponent]}>
            {item.component}
          </div>
        ) : null;
      })}
    </>
  );
}
