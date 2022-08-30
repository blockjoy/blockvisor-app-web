import { FC } from 'react';
import { typo } from 'styles/utils.typography.styles';
import { DataState } from '..';
import { styles } from './DataRow.styles';

interface Props {
  state: HostState | NodeState;
  icon?: React.FC<React.SVGProps<SVGSVGElement>>;
  primary?: string;
  secondary?: string;
  children: React.ReactNode;
}

export const DataRow: FC<Props> = ({
  state,
  icon,
  primary,
  secondary,
  children,
}) => {
  const classes = [styles.base, styles[state], icon && styles.withIcon];

  return (
    <>
      <div css={classes}>
        <div css={styles.content}>
          {/* {icon && <p css={styles.icon}>{icon}</p>} */}
          <p css={styles.primary}>{primary}</p>
          <p css={styles.secondary}>{secondary}</p>
        </div>
        <div css={styles.state}>
          <div css={[typo.uppercase, styles.label]}>
            <DataState status={state} />
          </div>
          {children}
        </div>
      </div>
    </>
  );
};
