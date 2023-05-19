import { Global } from '@emotion/react';
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { RecoilRoot } from 'recoil';
import { globalStyles } from 'styles/global.styles';
import ThemeProvider from '@modules/theme/ThemeProvider';
import { PrivateRoute } from '@modules/auth';
import { Chat } from '@shared/components';

function MyApp({ Component, pageProps, router }: any) {
  const getLayout = Component?.getLayout || ((page: any) => page);
  return (
    <RecoilRoot>
      <Global styles={globalStyles} />
      <ThemeProvider>
        <PrivateRoute router={router}>
          {getLayout(<Component {...pageProps} />)}
        </PrivateRoute>
        <Chat />
        <ToastContainer
          hideProgressBar
          autoClose={3000}
          position="bottom-right"
        />
      </ThemeProvider>
    </RecoilRoot>
  );
}

export default MyApp;
