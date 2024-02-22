import { Skeleton } from '@shared/components';
import { ReactNode } from 'react';
import { reset } from 'styles/utils.reset.styles';
import { wrapper } from 'styles/wrapper.styles';
import { styles } from './Tabs.styles';

type TabProps = {
  activeTab: string;
  tabItems: Array<TabItem>;
  onTabClick: (tabValue: string) => void;
  isLoading?: boolean;
  type?: TabType;
};

export type TabItem = { value: string; label: string; component: ReactNode };

export function Tabs({
  tabItems,
  activeTab,
  onTabClick,
  isLoading = false,
  type = 'default',
}: TabProps) {
  return (
    <div css={styles.wrapper(type)}>
      <div css={type === 'default' ? wrapper.main : styles.navi(type)}>
        <nav css={styles.tabs(type)}>
          {isLoading ? (
            <div css={styles.loading}>
              <Skeleton width="200px" />
            </div>
          ) : (
            <ul css={[reset.list, styles.tabList(type)]}>
              {tabItems.map((item) => (
                <li key={item.value}>
                  <button
                    css={[reset.button, styles.tabsButton(type)]}
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
      <div css={styles.items(type)}>
        {tabItems.map((item) => {
          return activeTab === item.value ? (
            <div key={item.value} css={[styles.tabComponent(type)]}>
              {item.component}
            </div>
          ) : null;
        })}
      </div>
    </div>
  );
}
