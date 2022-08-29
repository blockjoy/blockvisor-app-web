import React, { AnchorHTMLAttributes, FC, ReactNode } from 'react';
import { display } from 'styles/utils.display.styles';
import { typo } from 'styles/utils.typography.styles';

interface Props extends AnchorHTMLAttributes<HTMLAnchorElement> {
  target: string;
  children: ReactNode;
}

export const SkipToContent: FC<Props> = ({
  target = 'content',
  children = 'Skip to main content',
  ...rest
}) => {
  function focusOnContent(e: React.MouseEvent<HTMLAnchorElement>) {
    e.preventDefault();
    e.stopPropagation();
    document.getElementById(target)?.focus({ preventScroll: true });
  }

  return (
    <a
      href="#"
      className="skip-to-content"
      onClick={focusOnContent}
      rel="external"
      css={[display.visuallyHidden, typo.base]}
      {...rest}
    >
      {children}
    </a>
  );
};
