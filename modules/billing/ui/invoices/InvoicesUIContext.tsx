import React, { createContext, useContext, useState, useCallback } from 'react';
import isEqual from 'lodash/isEqual';
import isFunction from 'lodash/isFunction';
import { InvoicesQueryParams, initialQueryParams } from '@modules/billing';
import { numOfItemsPerPage } from '@shared/index';

export type SetQueryParams = (nextQueryParams: InvoicesQueryParams) => void;

type InvoicesUIContext = {
  queryParams: InvoicesQueryParams;
  setQueryParamsBase: React.Dispatch<React.SetStateAction<InvoicesQueryParams>>;
  setQueryParams: SetQueryParams;
};

type InvoicesUIProvider = {
  children?: React.ReactNode;
};

const InvoicesUIContext = createContext<InvoicesUIContext>(
  {} as InvoicesUIContext,
);

export const getInitialQueryParams = () => {
  const itemsPerPage = numOfItemsPerPage();

  return {
    ...initialQueryParams,
    pagination: {
      ...initialQueryParams.pagination,
      itemsPerPage,
    },
  };
};

export function useInvoicesUIContext() {
  return useContext(InvoicesUIContext);
}

export const InvoicesUIConsumer = InvoicesUIContext.Consumer;

export function InvoicesUIProvider({ children }: InvoicesUIProvider) {
  const initialQueryParamsValue: InvoicesQueryParams = getInitialQueryParams();

  const [queryParams, setQueryParamsBase] = useState<InvoicesQueryParams>(
    initialQueryParamsValue,
  );
  const setQueryParams = useCallback((nextQueryParams: InvoicesQueryParams) => {
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
