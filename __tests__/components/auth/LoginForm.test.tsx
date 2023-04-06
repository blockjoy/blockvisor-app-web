import { expect, vi, it, describe, afterEach, beforeEach } from 'vitest';
import {
  cleanup,
  fireEvent,
  render,
  screen,
  act,
  waitFor,
} from '../../renderer';
import { LoginForm } from '@modules/auth';
import { useRouterSpy } from '../../utils';
import { routerMockBuilder } from '__tests__/mocks/router';
import { useGetOrganizations } from '@modules/organization';
import userEvent from '@testing-library/user-event';

describe('Login Form', () => {
  beforeEach(() => {
    vi.mock('@modules/organization/hooks/useGetOrganizations');
  });
  afterEach(() => {
    cleanup();
  });

  useRouterSpy.mockImplementation(() =>
    routerMockBuilder({ pathname: '/login?redirect=%2F' }),
  );

  it('should have submit button disabled by default', () => {
    vi.mocked(useGetOrganizations).mockReturnValue({
      getOrganizations: vi.fn(),
      organizations: [],
      total: 0,
      removeFromOrganizations: vi.fn(),
      addToOrganizations: vi.fn(),
      isLoading: 'finished',
      setIsLoading: vi.fn(),
    });
    render(<LoginForm />);

    const submitButton = screen.getByDataCy('login-submit-button');

    expect(submitButton).toHaveProperty('disabled', true);
  });

  it('should have submit button enabled when vaild data is entered', () => {
    vi.mocked(useGetOrganizations).mockReturnValue({
      getOrganizations: vi.fn(),
      organizations: [],
      total: 0,
      removeFromOrganizations: vi.fn(),
      addToOrganizations: vi.fn(),
      isLoading: 'finished',
      setIsLoading: vi.fn(),
    });

    render(<LoginForm />);

    const emailInput = screen.getByDataCy('login-email-input');
    const passwordInput = screen.getByDataCy('login-password-input');

    userEvent.type(emailInput, 'test@test.com');
    userEvent.type(passwordInput, 'test@test.com');

    waitFor(() => {
      const submitButton = screen.getByDataCy('login-submit-button');
      expect(submitButton).not.toHaveProperty('disabled');
    });
  });
});
