import React, { useContext, useState, useCallback, createContext } from 'react';
import isEqual from 'lodash/isEqual';
import isFunction from 'lodash/isFunction';
import { initialQueryParams, InitialQueryParams } from './HostUIHelpers';
import { loadPersistedFilters } from '../utils/loadPersistedFilters';
import { buildParams } from '../utils/buildParams';
import { numOfItemsPerPage } from '@modules/node/utils';

type HostUIContext = {
  queryParams: InitialQueryParams;
  setQueryParamsBase: React.Dispatch<React.SetStateAction<InitialQueryParams>>;
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

  const { memory, cpu, space } = persistedHostFilters;
  const params = buildParams(memory, cpu, space);

  const itemsPerPage = numOfItemsPerPage();

  return {
    ...initialQueryParams,
    filter: params,
    pagination: {
      ...initialQueryParams.pagination,
      items_per_page: itemsPerPage,
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
