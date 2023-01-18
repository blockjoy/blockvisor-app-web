import Script from 'next/script';
import { Global } from '@emotion/react';
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import 'rc-slider/assets/index.css';
import { RecoilRoot } from 'recoil';
import { globalStyles } from 'styles/global.styles';
import ThemeProvider from '@modules/theme/ThemeProvider';

// todo extend AppProps type to include getLayout
function MyApp({ Component, pageProps }: any) {
  const getLayout = Component?.getLayout || ((page: any) => page);
  return (
    <RecoilRoot>
      <Global styles={globalStyles} />
      <ThemeProvider>
        <Script
          defer
          data-domain="app.dev.blockjoy.com"
          src="https://plausible.io/js/script.js"
        ></Script>
        <Script id="crisp-js">{`window.$crisp=[];window.CRISP_WEBSITE_ID="09ccc057-4bc5-4c14-909a-6b10f6bbe1cb";(function(){d=document;s=d.createElement("script");s.src="https://client.crisp.chat/l.js";s.async=1;d.getElementsByTagName("head")[0].appendChild(s);})();`}</Script>
        {getLayout(<Component {...pageProps} />)}
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
