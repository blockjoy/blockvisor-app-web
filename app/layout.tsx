'use client';

import { ReactNode } from 'react';
import { RecoilRoot } from 'recoil';
import { Global } from '@emotion/react';
import { globalStyles } from 'styles/global.styles';
import ThemeProvider from '@modules/theme/ThemeProvider';
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import 'rc-slider/assets/index.css';
import { EmotionProvider } from '@modules/theme/EmotionProvider';

type Props = {
  children?: ReactNode;
};

export default function RootLayout({ children }: Props) {
  return (
    <html lang="en">
      <head></head>
      <body>
        <EmotionProvider>
          <Global styles={globalStyles} />
          <RecoilRoot>
            <ThemeProvider>
              {children}
              <ToastContainer
                hideProgressBar
                autoClose={3000}
                position="bottom-right"
              />
            </ThemeProvider>
          </RecoilRoot>
        </EmotionProvider>
      </body>
    </html>
  );
}
