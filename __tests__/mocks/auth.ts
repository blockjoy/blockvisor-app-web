import { UseIdentity } from '@modules/auth';

const mockJWT =
  'ZXlKMGVYQWlPaUpLVjFRaUxDSmhiR2NpT2lKSVV6VXhNaUo5LmV5SnBaQ0k2SW1Zd05XWXpZVEZsTFRJeVptWXRORGRsTmkwNU1tTTJMV1JsTlRNM1ltRmpNR0V3WmlJc0ltVjRjQ0k2TVRZM05qVTFOVGMwTWl3aWRHOXJaVzVmZEhsd1pTSTZJblZ6WlhKZllYVjBhQ0lzSW5KdmJHVWlPaUoxYzJWeUlpd2laR0YwWVNJNmV5SmxiV0ZwYkNJNkluUm9iMjFoYzBCaWJHOWphMnB2ZVM1amIyMGlMQ0p2Y21kZmFXUWlPaUpsWkRCbVlUTmhOUzFpWVdNNExUUmtOekV0WVdOaE5DMDJNMlF3WVdaa01URTRPV01pTENKdmNtZGZjbTlzWlNJNkltOTNibVZ5SW4xOS50ck9JZ2JEblRqNWlmLVIyNGsxeVJaUEJtWlJHWDVEdzZBSXZTcEtyQ00tTTdPUmhhRmdPY0gyMzctVUxoSTdCVmVSTHVTTjJKc0EtZ3NNR1I2YWlIQQ';

const mockUseIdentityValue = (overrides?: Partial<UseIdentity>) => {
  const base: UseIdentity = {
    isLoggedIn: false,
    isVerified: false,
    isLoading: false,
    isDone: false,
    state: '',
    user: {
      id: '12345',
      firstName: 'Michael',
      lastName: 'Jackson',
      email: 'michael@gmail.com',
      defaultOrganization: {
        name: 'Some Org',
        id: '1234566778',
      },
    },
  };
  return { ...base, ...overrides };
};

export { mockJWT, mockUseIdentityValue };
