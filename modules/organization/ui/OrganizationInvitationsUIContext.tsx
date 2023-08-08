import React, { createContext, useContext, useState, useCallback } from 'react';
import isEqual from 'lodash/isEqual';
import isFunction from 'lodash/isFunction';
import {
  InitialQueryParams,
  initialQueryParams,
} from './OrganizationInvitationsUIHelpers';

export type SetQueryParams = (nextQueryParams: InitialQueryParams) => void;

type OrganizationInvitationsUIContext = {
  queryParams: InitialQueryParams;
  setQueryParamsBase: React.Dispatch<React.SetStateAction<InitialQueryParams>>;
  setQueryParams: SetQueryParams;
};

type OrganizationInvitationsUIProvider = {
  children?: React.ReactNode;
};

const OrganizationInvitationsUIContext =
  createContext<OrganizationInvitationsUIContext>(
    {} as OrganizationInvitationsUIContext,
  );

export function useOrganizationInvitationsUIContext() {
  return useContext(OrganizationInvitationsUIContext);
}

export const OrganizationInvitationsUIConsumer =
  OrganizationInvitationsUIContext.Consumer;

export function OrganizationInvitationsUIProvider({
  children,
}: OrganizationInvitationsUIProvider) {
  const initialQueryParamsValue: InitialQueryParams = initialQueryParams;

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

  const value: OrganizationInvitationsUIContext = {
    queryParams,
    setQueryParamsBase,
    setQueryParams,
  };

  return (
    <OrganizationInvitationsUIContext.Provider value={value}>
      {children}
    </OrganizationInvitationsUIContext.Provider>
  );
}
