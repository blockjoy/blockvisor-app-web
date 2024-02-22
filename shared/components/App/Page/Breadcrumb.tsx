import { ReactNode } from 'react';
import { styles } from './Breadcrumb.styles';

type BreadcrumbProps = {
  children: ReactNode;
  title: ReactNode | string;
  handleClick: VoidFunction;
};

export const Breadcrumb = ({
  children,
  title,
  handleClick,
}: BreadcrumbProps) => {
  return (
    <div css={styles.breadcrumb}>
      <button onClick={handleClick} css={styles.button}>
        {title}
      </button>
      <span css={styles.separator}>/</span>
      <div>{children}</div>
    </div>
  );
};
