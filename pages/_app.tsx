import { Global } from '@emotion/react';
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { RecoilRoot } from 'recoil';
import { globalStyles } from 'styles/global.styles';

import ThemeProvider from "./ThemeProvider";

// todo extend AppProps type to include getLayout
function MyApp({ Component, pageProps }: any) {
  const getLayout = Component?.getLayout || ((page: any) => page);

  return (
    <RecoilRoot>
      <Global styles={globalStyles} />
      <ThemeProvider>
        {getLayout(<Component {...pageProps} />)}
        <ToastContainer position="bottom-left" />
      </ThemeProvider>
    </RecoilRoot>
  );
}

export default MyApp;
