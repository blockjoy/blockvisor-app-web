import React, { createContext, useContext, useState, useCallback } from 'react';
import { useRecoilValue } from 'recoil';
import isEqual from 'lodash/isEqual';
import isFunction from 'lodash/isFunction';
import {
  InitialQueryParams,
  initialQueryParams,
} from './OrganizationsUIHelpers';
import { organizationAtoms } from '@modules/organization';

export type SetQueryParams = (nextQueryParams: InitialQueryParams) => void;

type OrganizationsUIContext = {
  queryParams: InitialQueryParams;
  setQueryParamsBase: React.Dispatch<React.SetStateAction<InitialQueryParams>>;
  setQueryParams: SetQueryParams;
};

type OrganizationsUIProvider = React.PropsWithChildren;

const OrganizationsUIContext = createContext<OrganizationsUIContext>(
  {} as OrganizationsUIContext,
);

export const getInitialQueryParams = () => {
  const persistedNodeFilters = useRecoilValue(
    organizationAtoms.organizationsFilters,
  );

  if (!persistedNodeFilters) return initialQueryParams;

  return persistedNodeFilters;
};

export function useOrganizationsUIContext() {
  return useContext(OrganizationsUIContext);
}

export const OrganizationsUIConsumer = OrganizationsUIContext.Consumer;

export function OrganizationsUIProvider({ children }: OrganizationsUIProvider) {
  const initialQueryParamsValue: InitialQueryParams = getInitialQueryParams();

  const [queryParams, setQueryParamsBase] = useState<InitialQueryParams>(
    initialQueryParamsValue,
  );
  const setQueryParams = useCallback((nextQueryParams: InitialQueryParams) => {
    setQueryParamsBase((prevQueryParams) => {
      if (isFunction(nextQueryParams)) {
        nextQueryParams = nextQueryParams(prevQueryParams);
      }

      if (isEqual(prevQueryParams, nextQueryParams)) {
        return prevQueryParams;
      }

      return nextQueryParams;
    });
  }, []);

  const value: OrganizationsUIContext = {
    queryParams,
    setQueryParamsBase,
    setQueryParams,
  };

  return (
    <OrganizationsUIContext.Provider value={value}>
      {children}
    </OrganizationsUIContext.Provider>
  );
}
