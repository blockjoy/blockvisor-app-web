import { ReactNode, useEffect } from 'react';
import anime from 'animejs';
import { layout, layoutWrapper, layoutTitle } from './Layout.styles';
import { typo } from 'styles/utils.typography.styles';
import { Logo } from '..';

type Props = {
  title?: string;
  children?: ReactNode;
};

export function Layout({ children, title }: Props) {
  const animateEntry = () =>
    anime({
      targets: `#js-auth-layout`,
      opacity: [0, 1],
      translateY: [8, 0],
      easing: 'easeInOutQuad',
      duration: 400,
    });
  useEffect(() => {
    animateEntry();
  }, []);

  return (
    <main tabIndex={0} id="content" css={[layout]}>
      <section css={[typo.tiny, layoutWrapper]} id="js-auth-layout">
        <header>
          <Logo />
          <h1 css={[layoutTitle]}>{title}</h1>
        </header>
        {children}
      </section>
    </main>
  );
}
