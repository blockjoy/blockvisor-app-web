import { SvgIcon } from '@shared/components';
import { ReactNode } from 'react';
import { styles } from './AdminSettingsCard.styles';
import { typo } from 'styles/utils.typography.styles';

type AdminSettingsCardProps = {
  name: string;
  icon: ReactNode;
  children: ReactNode;
};

export const AdminSettingsCard = ({
  name,
  icon,
  children,
}: AdminSettingsCardProps) => {
  return (
    <article css={styles.card}>
      <div css={styles.cardTitle}>
        <SvgIcon size="20px"> {icon}</SvgIcon>
        <span css={typo.capitalize}>{name}</span>
      </div>
      <div>{children}</div>
    </article>
  );
};
