import { styles } from './NextLink.styles';
import Link from 'next/link';

type Props = {
  href: string;
  children: React.ReactNode;
};

export const NextLink = ({ href, children }: Props) => (
  <Link css={styles.link} href={href}>
    {children}
  </Link>
);
