import { css } from '@emotion/react';
import { Layout } from '@shared/components';
import { ITheme } from 'types/theme';

const styles = {
  wrapper: css`
    height: 100vh;
    display: grid;
    place-items: center;
  `,
  paragraph: css`
    line-height: 1.45;
    margin-bottom: 20px;
  `,
  footer: (theme: ITheme) => css`
    color: ${theme.colorDefault};
    line-height: 1.45;
  `,
  link: (theme: ITheme) => css`
    &,
    :link,
    :visited,
    :active {
      color: ${theme.colorPrimary};
    }

    :hover {
      color: ${theme.colorPrimary};
      text-decoration: underline;
    }
  `,
};

const Closed = () => {
  return (
    <section css={styles.wrapper}>
      <Layout>
        <p css={styles.paragraph}>
          Thank you for your interest in our Technical Preview. It is now
          closed. We will be launching our production version soon.
        </p>
        <footer css={styles.footer}>
          Be sure to visit{' '}
          <a css={styles.link} href="https://blockjoy.com" target="_blank">
            blockjoy.com
          </a>{' '}
          for the latest news and announcements.
        </footer>
      </Layout>
    </section>
  );
};

export default Closed;
