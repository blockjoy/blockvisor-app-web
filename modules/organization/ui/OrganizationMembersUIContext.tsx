import React, { createContext, useContext, useState, useCallback } from 'react';
import isEqual from 'lodash/isEqual';
import isFunction from 'lodash/isFunction';
import {
  InitialQueryParams,
  initialQueryParams,
} from './OrganizationMembersUIHelpers';

export type SetQueryParams = (nextQueryParams: InitialQueryParams) => void;

type OrganizationMembersUIContext = {
  queryParams: InitialQueryParams;
  setQueryParamsBase: React.Dispatch<React.SetStateAction<InitialQueryParams>>;
  setQueryParams: SetQueryParams;
};

type OrganizationMembersUIProvider = React.PropsWithChildren;

const OrganizationMembersUIContext =
  createContext<OrganizationMembersUIContext>(
    {} as OrganizationMembersUIContext,
  );

export function useOrganizationMembersUIContext() {
  return useContext(OrganizationMembersUIContext);
}

export const OrganizationMembersUIConsumer =
  OrganizationMembersUIContext.Consumer;

export function OrganizationMembersUIProvider({
  children,
}: OrganizationMembersUIProvider) {
  const initialQueryParamsValue: InitialQueryParams = initialQueryParams;

  const [queryParams, setQueryParamsBase] = useState<InitialQueryParams>(
    initialQueryParamsValue,
  );
  const setQueryParams = useCallback((nextQueryParams: InitialQueryParams) => {
    setQueryParamsBase((prevQueryParams) => {
      if (isEqual(prevQueryParams, nextQueryParams)) {
        return prevQueryParams;
      }

      return nextQueryParams;
    });
  }, []);

  const value: OrganizationMembersUIContext = {
    queryParams,
    setQueryParamsBase,
    setQueryParams,
  };

  return (
    <OrganizationMembersUIContext.Provider value={value}>
      {children}
    </OrganizationMembersUIContext.Provider>
  );
}
