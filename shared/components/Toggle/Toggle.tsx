import { ReactNode } from 'react';
import { display } from 'styles/utils.display.styles';
import { typo } from 'styles/utils.typography.styles';
import { styles } from './Toggle.styles';

type Props = {
  children?: ReactNode;
  description?: ReactNode;
  formTouched?: boolean;
};

export function Toggle({ children, description, formTouched = false }: Props) {
  return (
    <>
      <input css={[display.visuallyHidden]} />
      <label css={[styles.base]}>
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
