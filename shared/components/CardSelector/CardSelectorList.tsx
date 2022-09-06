import { FormEventHandler, ReactNode } from 'react';
import { styles } from './CardSelectorList.styles';

type Props = {
  children?: ReactNode;
  label?: ReactNode;
  id?: string;
  onSubmit?: FormEventHandler<HTMLFormElement>;
};

export function CardSelectorList({
  children,
  label,
  id = 'card-group',
  onSubmit,
}: Props) {
  return (
    <form onSubmit={onSubmit} aria-labelledby={id} role="radiogroup">
      {label && (
        <div css={[styles.label]} id={id}>
          <slot name="label" />
        </div>
      )}

      <div css={[styles.controls]}>{children}</div>
    </form>
  );
}
