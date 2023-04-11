import { expect, vi, it, describe, afterEach, beforeEach } from 'vitest';
import { cleanup, render, screen, waitFor } from '../../renderer';
import { NewPasswordForm } from '@modules/auth';
import { useRouterSpy } from '../../utils';
import { routerMockBuilder } from '__tests__/mocks/router';
import userEvent from '@testing-library/user-event';
import { apiClient } from '@modules/client';

beforeEach(() => {
  vi.mock('@modules/client');
});

afterEach(() => {
  cleanup();
});

describe('New Password Form', () => {
  useRouterSpy.mockImplementation(() =>
    routerMockBuilder({ pathname: '/password_reset?token=1234' }),
  );

  it('should display error text when there is an error', () => {
    vi.mocked(apiClient.resetPassword).mockResolvedValue({
      code: 2,
      message: 'no good',
      metadata: { headers: '' },
      source: '',
    });
    render(<NewPasswordForm />);

    userEvent.type(
      screen.getByDataCy('newPassword-password-input'),
      'test1234',
    );
    userEvent.type(
      screen.getByDataCy('newPassword-password-confirm-input'),
      'test1234',
    );

    userEvent.click(screen.getByDataCy('newPassword-submit'));

    waitFor(() => {
      expect(screen.getByDataCy('newPassword-error')).toBeTruthy();
    });
  });
});
