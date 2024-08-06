import { SvgIcon } from '@shared/components';
import { styles } from './Card.styles';
import { typo } from 'styles/utils.typography.styles';

type CardProps = {
  name: string;
  icon: React.ReactNode;
  children: React.ReactNode;
};

export const Card = ({ name, icon, children }: CardProps) => {
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
