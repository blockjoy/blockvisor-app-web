import { SvgIcon } from '@shared/components';
import { styles } from './DrawerContent.styles';

type Props = {
  title?: string;
  icon?: React.ReactNode;
  bottomBorder?: boolean;
};

export const DrawerContent = ({
  children,
  title,
  icon,
  bottomBorder = true,
}: React.PropsWithChildren<Props>) => (
  <div css={styles.wrapper(bottomBorder)}>
    {icon && (
      <div css={styles.titleWrapper}>
        <SvgIcon size="16px">{icon}</SvgIcon>
        <span css={styles.title}>{title}</span>
      </div>
    )}
    <div css={styles.content}>{children}</div>
  </div>
);
