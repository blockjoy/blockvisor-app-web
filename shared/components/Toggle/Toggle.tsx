import { MouseEventHandler, ReactNode } from 'react';
import { display } from 'styles/utils.display.styles';
import { typo } from 'styles/utils.typography.styles';
import { styles } from './Toggle.styles';

type Props = {
  children?: ReactNode;
  description?: ReactNode;
  active?: boolean;
  onClick: MouseEventHandler<HTMLLabelElement>;
};

export function Toggle({ children, description, active, onClick }: Props) {
  return (
    <>
      <input css={[display.visuallyHidden]} />
      <label onClick={onClick} css={[styles.base, active && styles.active]}>
        <div css={[styles.label]}>
          {children}
          {description && (
            <small css={[typo.tiny, styles.description]}>{description}</small>
          )}
        </div>
      </label>
    </>
  );
}
