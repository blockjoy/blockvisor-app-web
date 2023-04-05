import { expect, vi, it, describe, afterEach } from 'vitest';
import { cleanup, fireEvent, render, screen } from '../../renderer';
import { LoginForm } from '@modules/auth';
import { useRouterSpy } from '../../utils';
import { routerMockBuilder } from '__tests__/mocks/router';

describe('Login Form', () => {
  afterEach(() => {
    cleanup();
  });

  useRouterSpy.mockImplementation(() =>
    routerMockBuilder({ pathname: '/login?redirect=%2F' }),
  );

  it('should have submit button disabled by default', () => {
    render(<LoginForm />);

    const submitButton = screen.getByDataCy('login-submit-button');

    expect(submitButton).toHaveProperty('disabled', true);
  });

  it('should have submit button enabled when vaild data is entered', () => {
    render(<LoginForm />);

    const emailInput = screen.getByDataCy('login-email-input');

    fireEvent.change(emailInput, {
      target: { value: 'test@test.com' },
    });

    const passwordInput = screen.getByDataCy('login-password-input');

    fireEvent.change(passwordInput, {
      target: { value: 'test123' },
    });

    const submitButton = screen.getByDataCy('login-submit-button');

    fireEvent.click(submitButton);
    expect(submitButton).not.toHaveProperty('disabled');
  });
});
