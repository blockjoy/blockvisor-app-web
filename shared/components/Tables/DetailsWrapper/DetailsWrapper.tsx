import { ReactNode } from 'react';
import Link from 'next/link';
import { styles } from './DetailsWrapper.styles';

type DetailsWrapperProps = {
  children: ReactNode;
  title: string;
  href: string;
};

export const DetailsWrapper = ({
  children,
  title,
  href,
}: DetailsWrapperProps) => {
  return (
    <div>
      <div css={styles.header}>
        <h3 css={styles.headline}>{title}</h3>
        <Link href={href} css={[styles.link]} shallow>
          View all
        </Link>
      </div>
      {children}
    </div>
  );
};
