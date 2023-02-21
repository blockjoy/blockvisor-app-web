import { expect, vi, it, describe } from 'vitest';
import { render, screen, fireEvent } from '../renderer';
import { LoginForm, PublicRoute } from '@modules/auth';
import { useRouter } from 'next/router';
import {
  mockedBlockchainsResponse,
  mockedGetOrganizationsResponse,
  mockJWT,
  mockedRouter,
  mockUseIdentityValue,
} from '../mocks';
import {
  getBlockchainSpy,
  getOrganizationsSpy,
  loginSpy,
  useRouterSpy,
} from '../utils';

describe('LoginForm', () => {
  vi.mock('@modules/auth/hooks/useIdentity', () => ({
    useIdentity() {
      return {
        ...mockUseIdentityValue({ isLoggedIn: true }),
      };
    },
  }));

  useRouterSpy.mockImplementation(() => mockedRouter);
  loginSpy.mockImplementation(async () => ({
    value: mockJWT,
  }));
  getBlockchainSpy.mockImplementation(async () => mockedBlockchainsResponse);
  getOrganizationsSpy.mockImplementation(
    async () => mockedGetOrganizationsResponse,
  );
  const router = useRouter();
  it('should redirect to /nodes when signed in', () => {
    render(
      <PublicRoute>
        <LoginForm />
      </PublicRoute>,
    );
    const emailInputValue = 'blah@foo.com';
    const passwordInputValue = '12345678';

    fireEvent.change(screen.getByDataCy('login-email-input'), {
      target: { value: emailInputValue },
    });

    fireEvent.change(screen.getByDataCy('login-password-input'), {
      target: { value: passwordInputValue },
    });

    fireEvent.click(screen.getByDataCy('login-submit-button'));

    expect(router.push).toHaveBeenCalledWith('/nodes');
  });
});
