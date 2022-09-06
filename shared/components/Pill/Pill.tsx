import Image from 'next/image';
import { MouseEventHandler, ReactNode } from 'react';
import { display } from 'styles/utils.display.styles';
import { reset } from 'styles/utils.reset.styles';
import { typo } from 'styles/utils.typography.styles';
import { styles } from './Pill.styles';

type Props = {
  removable?: boolean;
  showFull?: boolean;
  onClick: MouseEventHandler<HTMLButtonElement>;
  children?: ReactNode;
};

// missing animation
export function Pill({
  removable = true,
  showFull = false,
  onClick,
  children,
}: Props) {
  const pillStyles = setStyles(showFull);
  const pillTextStyles = setPillTextStyles(removable);
  return (
    <span css={pillStyles}>
      <span css={pillTextStyles}>{children}</span>
      {removable && (
        <button
          css={[reset.button, styles.pillButton]}
          type="button"
          onClick={onClick}
        >
          <span css={[display.visuallyHidden]}>Remove</span>
          <Image
            src="/assets/icons/close-12.svg"
            aria-hidden="true"
            layout="fixed"
            width={12}
            height={12}
          />
        </button>
      )}
    </span>
  );
}

function setPillTextStyles(removable?: boolean) {
  const base = [styles.pillText];

  if (removable) {
    base.push(styles.pillTextWithAction);
  }
  return base;
}

function setStyles(showFull?: boolean) {
  const classes = [styles.pill, typo.small];

  if (showFull) {
    classes.push(styles.pillFull);
  }

  return classes;
}
