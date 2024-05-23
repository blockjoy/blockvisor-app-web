import anime from 'animejs';
import { useEffect } from 'react';
import { BlockjoyLogo } from '@shared/components';
import Head from 'next/head';
import { layout, layoutTitle, layoutWrapper } from './Layout.styles';

type Props = {
  title?: string;
  overflow?: 'visible' | 'hidden';
} & React.PropsWithChildren;

export function Layout({ children, title, overflow = 'hidden' }: Props) {
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
    <>
      <Head>
        <title>{title}</title>
      </Head>
      <main tabIndex={0} id="content" css={[layout]}>
        <section css={[layoutWrapper(overflow)]} id="js-auth-layout">
          <header>
            <BlockjoyLogo scale={1} />
            <h1 css={[layoutTitle]}>{title}</h1>
          </header>
          {children}
        </section>
      </main>
    </>
  );
}
