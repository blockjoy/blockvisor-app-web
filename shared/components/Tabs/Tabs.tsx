import { ReactNode, useState } from 'react';
import { reset } from 'styles/utils.reset.styles';
import { typo } from 'styles/utils.typography.styles';
import { styles } from './Tabs.styles';

type Props = {
  activeTab: string;
  tabItems: Array<{ value: string; label: string; component: ReactNode }>;
  onTabClick: (tabValue: string) => void;
};

export function Tabs({ tabItems, activeTab, onTabClick }: Props) {
  return (
    <>
      <nav css={[styles.tabs]}>
        <ul css={[reset.list, styles.tabList]}>
          {tabItems.map((item) => (
            <li>
              <button
                css={[
                  reset.button,
                  styles.tabsButton,
                  typo.medium,
                  activeTab === item.value && styles.activeButton,
                ]}
                onClick={() => onTabClick(item.value)}
              >
                {item.label}
              </button>
            </li>
          ))}
        </ul>
      </nav>
      {tabItems.map((item) => {
        return activeTab === item.value ? (
          <div css={[styles.tabComponent]}>{item.component}</div>
        ) : null;
      })}
    </>
  );
}
