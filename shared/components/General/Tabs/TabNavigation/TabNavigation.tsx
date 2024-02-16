import NextLink from 'next/link';
import { wrapper } from 'styles/wrapper.styles';
import { styles } from './TabNavigation.styles';

type TabNavigationProps = {
  items: TabNavItem[];
  gap?: string;
};

export const TabNavigation = ({ items, gap }: TabNavigationProps) => {
  return (
    <section css={wrapper.main}>
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
          <header css={styles.sidePanelHeader}>Metrics</header>
        </div>
      </div>
    </section>
  );
};
