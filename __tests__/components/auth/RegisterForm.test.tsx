import { expect, it, vi, describe, afterEach, beforeEach } from 'vitest';
import { cleanup, fireEvent, render, screen, waitFor } from '../../renderer';
import { RegisterForm } from '@modules/auth';
import { useRouterSpy } from '../../utils';
import { routerMockBuilder } from '__tests__/mocks/router';
import userEvent from '@testing-library/user-event';

beforeEach(() => {
  vi.mock('@modules/client');
});

afterEach(() => {
  cleanup();
});

describe('Register Form', () => {
  useRouterSpy.mockImplementation(() =>
    routerMockBuilder({ pathname: '/register' }),
  );

  it('should have submit button disabled by default', () => {
    render(<RegisterForm />);

    const submitButton = screen.getByDataCy(
      'register-submit-button',
    ) as HTMLButtonElement;

    expect(submitButton.disabled).toEqual(true);
  });

  it('should have submit button enabled when vaild data is entered', async () => {
    render(<RegisterForm />);

    fireEvent.input(screen.getByDataCy('register-email-input'), {
      target: {
        value: 'test@test.com',
      },
    });

    fireEvent.input(screen.getByDataCy('register-firstName-input'), {
      target: {
        value: 'Firstname',
      },
    });

    fireEvent.input(screen.getByDataCy('register-lastName-input'), {
      target: {
        value: 'Lastname',
      },
    });

    fireEvent.input(screen.getByDataCy('register-password-input'), {
      target: {
        value: 'test1234',
      },
    });

    const submitButton = screen.getByDataCy(
      'register-submit-button',
    ) as HTMLButtonElement;

    await waitFor(() => {
      expect(submitButton.disabled).toEqual(false);
    });
  });
});
