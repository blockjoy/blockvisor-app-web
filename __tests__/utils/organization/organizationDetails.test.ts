import { getOrganizationDetails } from '@modules/organization';
import { expect, it, describe } from 'vitest';

describe('getOrganizationDetails', () => {
  it('should return null when there is no organization', () => {
    const result = getOrganizationDetails(null);
    expect(result).toEqual(null);
  });

  it('should return Personal organization with 1 member', () => {
    const result = getOrganizationDetails({ personal: true, memberCount: 1 });
    expect(result).toEqual([
      { label: 'TYPE', data: 'Personal' },
      { label: 'MEMBERS', data: '1' },
    ]);
  });

  it('should return Other organization with 10 members', () => {
    const result = getOrganizationDetails({ personal: false, memberCount: 10 });
    expect(result).toEqual([
      { label: 'TYPE', data: 'Other' },
      { label: 'MEMBERS', data: '10' },
    ]);
  });

  it('should return Other organization with 0 members', () => {
    const result = getOrganizationDetails({ personal: false });
    expect(result).toEqual([
      { label: 'TYPE', data: 'Other' },
      { label: 'MEMBERS', data: '0' },
    ]);
  });
});
