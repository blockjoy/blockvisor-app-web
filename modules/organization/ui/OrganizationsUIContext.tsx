import React, { createContext, useContext, useState, useCallback } from "react";
import { isEqual, isFunction } from "lodash";
import { InitialQueryParams, initialQueryParams } from "./OrganizationsUIHelpers";

type OrganizationsUIContext = {
  queryParams: InitialQueryParams,
  setQueryParamsBase: React.Dispatch<React.SetStateAction<InitialQueryParams>>;
  setQueryParams: (nextQueryParams: InitialQueryParams) => void;
}

type OrganizationsUIProvider = {
  children?: React.ReactNode
}

const OrganizationsUIContext = createContext<OrganizationsUIContext>({} as OrganizationsUIContext);

export function useOrganizationsUIContext() {
  return useContext(OrganizationsUIContext);
}

export const OrganizationsUIConsumer = OrganizationsUIContext.Consumer;

export function OrganizationsUIProvider({ children }: OrganizationsUIProvider) {
  const initialQueryParamsValue: InitialQueryParams = initialQueryParams;

  const [queryParams, setQueryParamsBase] = useState<InitialQueryParams>(initialQueryParamsValue);
  const setQueryParams = useCallback((nextQueryParams: any) => {
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

  const value : OrganizationsUIContext = {
    queryParams,
    setQueryParamsBase,
    setQueryParams,
  };

  return (
    <OrganizationsUIContext.Provider value={value}>
      {children}
    </OrganizationsUIContext.Provider>
  );
};