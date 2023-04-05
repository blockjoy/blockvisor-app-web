import { expect, vi, it, describe, afterEach } from 'vitest';
import { cleanup, fireEvent, render, screen } from '../../renderer';
import { ForgotPasswordForm, LoginForm } from '@modules/auth';
import { useRouterSpy } from '../../utils';
import { routerMockBuilder } from '__tests__/mocks/router';

afterEach(() => {
  cleanup();
});
describe('Forgot Password Form', () => {
  useRouterSpy.mockImplementation(() =>
    routerMockBuilder({ pathname: '/login?redirect=%2F' }),
  );

  it('should have submit button disabled by default', () => {
    render(<ForgotPasswordForm />);

    const submitButton = screen.getByDataCy(
      'forgot-password-submit',
    ) as HTMLButtonElement;

    expect(submitButton.disabled).toEqual(true);
  });

  /* it('should have submit button enabled when vaild data is entered', () => {
    const { rerender } = render(<ForgotPasswordForm />);

    fireEvent.change(screen.getByDataCy('forgot-password-email-input'), {
      target: { value: 'test@test.com' },
    });

    const submitButton = screen.getByDataCy(
      'forgot-password-submit',
    ) as HTMLButtonElement;

    expect(submitButton.disabled).toEqual(false);
  }); */
});
