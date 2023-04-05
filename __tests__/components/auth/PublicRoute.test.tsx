import { expect, vi, it, describe } from 'vitest';
import { render } from '../../renderer';
import { LoginForm, PublicRoute } from '@modules/auth';
import { useRouter } from 'next/router';
import {
  getBlockchainSpy,
  getOrganizationsSpy,
  loginSpy,
  useRouterSpy,
} from '../../utils';
import { routerMockBuilder } from '__tests__/mocks/router';
import { mockJWT, mockUseIdentityValue } from '__tests__/mocks/auth';
import { mockeOrganizationsResponse } from '__tests__/mocks/organizations';
import { mockedBlockchainsResponse } from '__tests__/mocks/blockchains';

describe('Public Route', () => {
  vi.mock('@modules/auth/hooks/useIdentity', () => ({
    useIdentity() {
      return {
        ...mockUseIdentityValue({ isLoggedIn: true }),
      };
    },
  }));

  useRouterSpy.mockImplementation(() =>
    routerMockBuilder({ pathname: '/login', isReady: true }),
  );
  loginSpy.mockImplementation(async () => ({
    value: mockJWT,
  }));
  getBlockchainSpy.mockImplementation(async () => mockedBlockchainsResponse);
  getOrganizationsSpy.mockImplementation(
    async () => mockeOrganizationsResponse,
  );
  const router = useRouter();
  it('should redirect to /nodes when signed in', () => {
    render(
      <PublicRoute>
        <LoginForm />
      </PublicRoute>,
    );

    expect(router.push).toHaveBeenCalledWith('/nodes');
  });
});
