import type { ReactNode } from 'react';
import { layout, layoutWrapper, layoutTitle } from './Layout.styles';
import { Logo } from '../Logo';

type Props = {
  title?: string;
  children?: ReactNode;
};

export function Layout({ children, title }: Props) {
  return (
    <main tabIndex={0} id="content" css={[layout]}>
      <section css={[layoutWrapper]}>
        <header>
          <Logo />
          <h1 css={[layoutTitle]}>{title}</h1>
        </header>
        {children}
      </section>
    </main>
  );
}
