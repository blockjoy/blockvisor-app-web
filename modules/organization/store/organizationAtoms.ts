import { atom } from 'recoil';
import {
  InitialQueryParams as InitialQueryParamsOrganizations,
  initialQueryParams,
} from '../ui/OrganizationsUIHelpers';
import { localStorageEffect } from 'utils/store/persist';
import { Org } from '@modules/grpc/library/blockjoy/v1/org';

const selectedOrganization = atom<Org | null>({
  key: 'organization.current',
  default: null,
});

const organizationsPageIndex = atom<number>({
  key: 'organization.pageIndex',
  default: 0,
});

const allOrganizations = atom<Org[]>({
  key: 'organization.all',
  default: [],
});

const organizationsFilters = atom<InitialQueryParamsOrganizations>({
  key: 'organization.filters',
  default: initialQueryParams,
  effects: [localStorageEffect('organizationsFilters')],
});

const organizationsLoadingState = atom<LoadingState>({
  key: 'organizations.loadingState',
  default: 'initializing',
});

const organizationLoadingState = atom<LoadingState>({
  key: 'organization.loadingState',
  default: 'loading',
});

const organizationMemberLoadingState = atom<LoadingState>({
  key: 'organization.member.loadingState',
  default: 'initializing',
});

const provisionToken = atom<string>({
  key: 'organization.provisionToken',
  default: '',
});

const provisionTokenLoadingState = atom<LoadingState>({
  key: 'organization.provisionToken.loadingState',
  default: 'finished',
});

export const organizationAtoms = {
  selectedOrganization,
  organizationsPageIndex,
  organizationLoadingState,
  organizationsLoadingState,
  allOrganizations,
  organizationsFilters,
  organizationMemberLoadingState,
  provisionToken,
  provisionTokenLoadingState,
};
