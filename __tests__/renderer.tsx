import React, { ReactElement } from 'react';
import { render, RenderOptions, queries, within } from '@testing-library/react';
import * as customQueries from './custom-queries';
import { RecoilRoot } from 'recoil';
import { Global } from '@emotion/react';
import { globalStyles } from 'styles/global.styles';
import ThemeProvider from '@modules/theme/ThemeProvider';
import { ToastContainer } from 'react-toastify';
import { authAtoms } from '@modules/auth';
import { organizationAtoms } from '@modules/organization';

const allQueries = { ...queries, ...customQueries };

const AllTheProviders = ({ children }: { children: React.ReactNode }) => {
  return (
    <RecoilRoot
      initializeState={(snapshot) => {
        snapshot.set(authAtoms.user, {
          firstName: 'test',
          lastName: 'no',
          defaultOrganization: { id: '12345', name: 'SomeORg' },
        });
        snapshot.set(organizationAtoms.defaultOrganization, {
          id: '12345',
          name: 'SomeORg',
        });
      }}
    >
      <Global styles={globalStyles} />
      <ThemeProvider>
        {children}
        <ToastContainer
          hideProgressBar
          autoClose={3000}
          position="bottom-right"
        />
      </ThemeProvider>
    </RecoilRoot>
  );
};

const customScreen = within(document.body, allQueries);
const customWithin = (element: HTMLElement) => within(element, allQueries);

const customRender = (
  ui: ReactElement,
  options?: Omit<RenderOptions, 'wrapper'>,
) => render(ui, { wrapper: AllTheProviders, queries: allQueries, ...options });

export * from '@testing-library/react';
export {
  customScreen as screen,
  customWithin as within,
  customRender as render,
};
