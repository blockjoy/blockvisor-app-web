import React, { createContext, useContext, useState, useCallback } from 'react';
import { isEqual, isFunction } from 'lodash';
import { InitialQueryParams, initialQueryParams } from './InvoicesUIHelpers';

export type SetQueryParams = (nextQueryParams: InitialQueryParams) => void;

type InvoicesUIContext = {
  queryParams: InitialQueryParams;
  setQueryParamsBase: React.Dispatch<React.SetStateAction<InitialQueryParams>>;
  setQueryParams: SetQueryParams;
};

type InvoicesUIProvider = {
  children?: React.ReactNode;
};

const InvoicesUIContext = createContext<InvoicesUIContext>(
  {} as InvoicesUIContext,
);

export function useInvoicesUIContext() {
  return useContext(InvoicesUIContext);
}

export const InvoicesUIConsumer = InvoicesUIContext.Consumer;

export function InvoicesUIProvider({ children }: InvoicesUIProvider) {
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

  const value: InvoicesUIContext = {
    queryParams,
    setQueryParamsBase,
    setQueryParams,
  };

  return (
    <InvoicesUIContext.Provider value={value}>
      {children}
    </InvoicesUIContext.Provider>
  );
}
