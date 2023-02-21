import React, { ReactElement } from 'react';
import { render, RenderOptions, queries, within } from '@testing-library/react';
import * as customQueries from './custom-queries';
import { RecoilRoot } from 'recoil';

const allQueries = { ...queries, ...customQueries };

const AllTheProviders = ({ children }: { children: React.ReactNode }) => {
  return <RecoilRoot>{children}</RecoilRoot>;
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
