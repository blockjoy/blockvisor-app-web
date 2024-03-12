import React, {
  useContext,
  useState,
  useCallback,
  createContext,
  Dispatch,
  SetStateAction,
} from 'react';
import isEqual from 'lodash/isEqual';
import isFunction from 'lodash/isFunction';
import {
  loadPersistedFilters,
  initialQueryParams,
  InitialQueryParams,
} from '@modules/host';
import { numOfItemsPerPage } from '@shared/index';

type HostUIContext = {
  queryParams: InitialQueryParams;
  setQueryParamsBase: Dispatch<SetStateAction<InitialQueryParams>>;
  setQueryParams: (nextQueryParams: InitialQueryParams) => void;
};

export type HostUIProps = {
  queryParams: InitialQueryParams;
  setQueryParams: (nextQueryParams: InitialQueryParams) => void;
};

type HostUIProvider = {
  children?: React.ReactNode;
};

const HostUIContext = createContext<HostUIContext>({} as HostUIContext);

export const getInitialQueryParams = () => {
  const persistedHostFilters = loadPersistedFilters();

  if (!persistedHostFilters) return initialQueryParams;

  const itemsPerPage = numOfItemsPerPage();

  return {
    ...initialQueryParams,
    filter: persistedHostFilters,
    pagination: {
      ...initialQueryParams.pagination,
      itemsPerPage,
    },
  };
};

export function useHostUIContext() {
  return useContext(HostUIContext);
}

export const HostUIConsumer = HostUIContext.Consumer;

export function HostUIProvider({ children }: HostUIProvider) {
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

  const value: HostUIContext = {
    queryParams,
    setQueryParamsBase,
    setQueryParams,
  };

  return (
    <HostUIContext.Provider value={value}>{children}</HostUIContext.Provider>
  );
}
