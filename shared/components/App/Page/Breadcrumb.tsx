import { styles } from './Breadcrumb.styles';

type BreadcrumbProps = {
  title: React.ReactNode | string;
  handleClick: VoidFunction;
} & React.PropsWithChildren;

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
