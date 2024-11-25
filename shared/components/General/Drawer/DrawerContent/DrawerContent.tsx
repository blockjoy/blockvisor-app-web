import { SvgIcon } from '@shared/components';
import { styles } from './DrawerContent.styles';

type Props = {
  title?: string;
  icon?: React.ReactNode;
};

export const DrawerContent = ({
  children,
  title,
  icon,
}: React.PropsWithChildren<Props>) => (
  <div css={styles.wrapper}>
    {icon && (
      <div css={styles.titleWrapper}>
        <SvgIcon size="16px">{icon}</SvgIcon>
        <span css={styles.title}>{title}</span>
      </div>
    )}
    <div css={styles.content}>{children}</div>
  </div>
);
