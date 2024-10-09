import { NextPage } from 'next';
import { AppProps } from 'next/app';
import { ReactElement, ReactNode, useEffect, useState } from 'react';
import { ToastContainer } from 'react-toastify';
import { RecoilRoot } from 'recoil';
import { Global } from '@emotion/react';
import { PrivateRoute } from '@modules/auth';
import ThemeProvider from '@modules/theme/ThemeProvider';
import { PortalContainer } from '@shared/components';
import 'react-toastify/dist/ReactToastify.css';
import { globalStyles } from 'styles/global.styles';

type NextPageWithLayout = NextPage & {
  getLayout?: (page: ReactElement) => ReactNode;
};

type AppPropsWithLayout = AppProps & {
  Component: NextPageWithLayout;
};

function MyApp({ Component, pageProps, router }: AppPropsWithLayout) {
  const getLayout = Component?.getLayout || ((page: ReactNode) => page);

  const [isIframe, setIsIframe] = useState(false);

  useEffect(() => {
    setIsIframe(window.location !== window.parent.location);
  }, []);

  if (isIframe) return null;

  return (
    <RecoilRoot>
      <Global styles={globalStyles} />
      <ThemeProvider>
        <PrivateRoute router={router}>
          {getLayout(<Component {...pageProps} />)}
        </PrivateRoute>
        <ToastContainer
          hideProgressBar
          autoClose={3000}
          position="bottom-right"
        />
        <PortalContainer />
      </ThemeProvider>
    </RecoilRoot>
  );
}

export default MyApp;
