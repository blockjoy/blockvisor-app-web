import Link from 'next/link';
import { useRouter } from 'next/router';
import { ROUTES } from '@shared/index';
import { SvgIcon } from '@shared/components';
import { styles } from './SubSidebar.styles';

type Props = {
  items?: SubSidebarItem[];
};

export const SubSidebar = ({ items }: Props) => {
  const router = useRouter();

  return (
    <aside css={styles.wrapper}>
      {items?.map((item) => {
        return (
          <div key={item.name} css={styles.item}>
            <h3 css={styles.title}>{item.title}</h3>
            <nav css={styles.nav}>
              {item.items?.map((item) => {
                const href = `${ROUTES.SETTINGS}/${item.name}`;
                const isActive = router.pathname === href;

                return (
                  <Link
                    key={item.name}
                    href={href}
                    css={[
                      styles.link,
                      isActive ? styles.linkActive : styles.linkInactive,
                    ]}
                  >
                    <SvgIcon size="14px">{item.icon}</SvgIcon>
                    {item.title}
                  </Link>
                );
              })}
            </nav>
          </div>
        );
      })}
    </aside>
  );
};
