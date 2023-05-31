import { getOrganizationDetails } from '@modules/organization';
import { expect, it, describe } from 'vitest';
import { mockeOrganizationsResponse } from '__tests__/mocks/organizations';

describe('getOrganizationDetails', () => {
  it('should return null when there is no organization', () => {
    const result = getOrganizationDetails(null);
    expect(result).toEqual(null);
  });

  it('should return Personal organization with 1 member and 1 node', () => {
    const result = getOrganizationDetails(mockeOrganizationsResponse[0]);
    expect(result).toEqual([
      { label: 'TYPE', data: 'Personal' },
      { label: 'MEMBERS', data: 1 },
      { label: 'NODES', data: 1 },
    ]);
  });

  it('should return Other organization with 10 members and 10 nodes', () => {
    const result = getOrganizationDetails({
      ...mockeOrganizationsResponse[0],
      personal: false,
      memberCount: 10,
      nodeCount: 10,
    });
    expect(result).toEqual([
      { label: 'TYPE', data: 'Other' },
      { label: 'MEMBERS', data: 10 },
      { label: 'NODES', data: 10 },
    ]);
  });

  it('should return Other organization with 0 members', () => {
    const result = getOrganizationDetails({
      ...mockeOrganizationsResponse[1],
    });
    expect(result).toEqual([
      { label: 'TYPE', data: 'Other' },
      { label: 'MEMBERS', data: 0 },
      { label: 'NODES', data: 0 },
    ]);
  });
});
