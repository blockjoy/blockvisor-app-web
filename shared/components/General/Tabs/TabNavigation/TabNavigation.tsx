import NextLink from 'next/link';
import { styles } from './TabNavigation.styles';

type TabNavigationProps = {
  items: TabNavItem[];
  gap?: string;
  sidePanel?: string;
};

export const TabNavigation = ({
  items,
  gap,
  sidePanel,
}: TabNavigationProps) => {
  return (
    <div css={styles.wrapper}>
      <div css={styles.tabs(gap)}>
        {items.map((item) => (
          <NextLink
            key={item.name}
            href={item.href}
            css={[styles.tabButton, item.isActive && styles.tabButtonActive]}
            className={item.className}
          >
            {item.name}
          </NextLink>
        ))}
        {sidePanel ? (
          <header css={styles.sidePanelHeader}>{sidePanel}</header>
        ) : null}
      </div>
    </div>
  );
};
