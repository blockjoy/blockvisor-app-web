import { useState, ReactNode } from 'react';
import { styles } from './CardSelector.styles';

type Props = {
  disabled: boolean;
  index: number;

  top?: ReactNode;
  children?: ReactNode;
  action?: ReactNode;
};

export function CardSelector({ disabled, index, children, action }: Props) {
  const [isFocused, setIsFocused] = useState(false);

  const styling = setStyles(disabled);

  const handleFocus = () => {
    if (disabled) return;
    setIsFocused(true);
  };

  const handleBlur = () => {
    if (disabled) return;
    setIsFocused(false);
  };

  return (
    <article
      css={[styling]}
      aria-checked={isFocused}
      role="radio"
      onFocus={handleFocus}
      onMouseEnter={handleFocus}
      onBlur={handleBlur}
      onMouseLeave={handleBlur}
    >
      {disabled && (
        <div className="card-selector__top">
          <span className="t-tiny">Coming soon</span>
        </div>
      )}

      <div className="card-selector__label">{children}</div>

      {action && (
        <div className="card-selector__action">
          <slot name="action" />
        </div>
      )}
    </article>
  );
}

function setStyles(disabled: boolean) {
  const styling = [styles.base];

  if (disabled) {
    styling.push(styles.disabled);
  } else {
    styling.push(styles.enabled);
  }

  return styling;
}
