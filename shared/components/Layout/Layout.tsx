import { Logo } from '../Logo';
import type { ReactNode } from 'react';

type Props = {
  title?: string;
  children?: ReactNode;
};

export function Layout({ children, title }: Props) {
  return (
    <main tabIndex={0} id="content">
      <section>
        <header>
          <Logo />
          <h1>{title}</h1>
        </header>
        {children}
      </section>
    </main>
  );
}
