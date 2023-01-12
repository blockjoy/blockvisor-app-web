import anime from 'animejs';
import { ReactNode, useEffect } from 'react';
import { BlockjoyLogo } from '@shared/components';
import { layout, layoutTitle, layoutWrapper } from './Layout.styles';

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
      <section css={[layoutWrapper]} id="js-auth-layout">
        <header>
          <BlockjoyLogo scale={1} />
          <h1 css={[layoutTitle]}>{title}</h1>
        </header>
        {children}
      </section>
    </main>
  );
}
