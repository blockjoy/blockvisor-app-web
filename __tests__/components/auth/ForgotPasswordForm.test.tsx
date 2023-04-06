import { expect, it, describe, afterEach } from 'vitest';
import { cleanup, render, screen, waitFor } from '../../renderer';
import { ForgotPasswordForm } from '@modules/auth';
import { useRouterSpy } from '../../utils';
import { routerMockBuilder } from '__tests__/mocks/router';
import userEvent from '@testing-library/user-event';

afterEach(() => {
  cleanup();
});
describe('Forgot Password Form', () => {
  useRouterSpy.mockImplementation(() =>
    routerMockBuilder({ pathname: '/forgot-password' }),
  );

  it('should have submit button disabled by default', () => {
    render(<ForgotPasswordForm />);

    const submitButton = screen.getByDataCy(
      'forgot-password-submit',
    ) as HTMLButtonElement;

    expect(submitButton.disabled).toEqual(true);
  });

  it('should have submit button enabled when vaild data is entered', () => {
    render(<ForgotPasswordForm />);

    userEvent.type(
      screen.getByDataCy('forgot-password-email-input'),
      'test@test.com',
    );

    waitFor(() => {
      const submitButton = screen.getByDataCy(
        'forgot-password-submit',
      ) as HTMLButtonElement;
      expect(submitButton.disabled).toEqual(false);
    });
  });
});
