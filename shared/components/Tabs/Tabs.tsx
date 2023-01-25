import { ReactNode } from 'react';
import { reset } from 'styles/utils.reset.styles';
import { wrapper } from 'styles/wrapper.styles';
import { styles } from './Tabs.styles';

type Props = {
  activeTab: string;
  tabItems: Array<{ value: string; label: string; component: ReactNode }>;
  onTabClick: (tabValue: string) => void;
};

export function Tabs({ tabItems, activeTab, onTabClick }: Props) {
  return (
    <>
      <nav css={[styles.tabs, wrapper.main]}>
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
      </nav>
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
