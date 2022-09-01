import { Global } from '@emotion/react';
import type { AppProps } from 'next/app';
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { RecoilRoot } from 'recoil';
import { globalStyles } from 'styles/global.styles';

import Head from 'next/head';

import ThemeProvider from "./ThemeProvider";

// todo extend AppProps type to include getLayout
function MyApp({ Component, pageProps }: any) {
  const getLayout = Component?.getLayout || ((page: any) => page);

  return (
    <RecoilRoot>
      <Head>
        <link rel="stylesheet" href="https://unicons.iconscout.com/release/v4.0.0/css/line.css" />
      </Head>
      <Global styles={globalStyles} />
      <ThemeProvider>
        {getLayout(<Component {...pageProps} />)}
        <ToastContainer position="bottom-left" />
      </ThemeProvider>
    </RecoilRoot>
  );
}

export default MyApp;
