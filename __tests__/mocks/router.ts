import { NextRouter } from 'next/router';
import { vi } from 'vitest';

const mockedRouter: NextRouter = {
  route: '/',
  pathname: '',
  query: { redirect: '' },
  asPath: '',
  push: vi.fn(),
  basePath: '',
  isLocaleDomain: false,
  replace: vi.fn(() => Promise.resolve(true)),
  back: vi.fn(),
  reload: vi.fn(),
  events: {
    on: vi.fn(),
    off: vi.fn(),
    emit: vi.fn(),
  },
  isFallback: false,
  isReady: false,
  isPreview: false,
  beforePopState: vi.fn(),
  forward: vi.fn(),
  prefetch: vi.fn(() => Promise.resolve()),
};

const routerMockBuilder = (overrides?: Partial<NextRouter>) => {
  return { ...mockedRouter, ...overrides };
};

export { routerMockBuilder };
