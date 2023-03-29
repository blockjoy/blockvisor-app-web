import { checkIfExists } from '@modules/organization/utils/checkIfExists';
import { expect, it, describe } from 'vitest';

describe('checkIfExist', () => {
  it('should return undefined when the user is not a member nor invited', () => {
    const result = checkIfExists(
      [{ email: 'test@test.com' }],
      [{ inviteeEmail: 'man@moon.com' }],
      'user@test.com',
    );
    expect(result).toEqual(undefined);
  });

  it('should return member when the user is already a member', () => {
    const result = checkIfExists(
      [{ email: 'user@test.com' }],
      [{ inviteeEmail: 'man@moon.com' }],
      'user@test.com',
    );
    expect(result).toEqual('member');
  });

  it('should return invited when the user has already been invited', () => {
    const result = checkIfExists(
      [{ email: 'test@test.com' }],
      [{ inviteeEmail: 'user@test.com' }],
      'user@test.com',
    );
    expect(result).toEqual('invited');
  });
});
