import React, { createContext, useContext, useState, useCallback } from 'react';
import isEqual from 'lodash/isEqual';
import isFunction from 'lodash/isFunction';
import { InitialQueryParams, initialQueryParams } from './NodeUIHelpers';
import { buildParams, loadPersistedFilters } from '@modules/node/utils';
import { numOfItemsPerPage } from '@shared/index';

type NodeUIContext = {
  queryParams: InitialQueryParams;
  setQueryParamsBase: React.Dispatch<React.SetStateAction<InitialQueryParams>>;
  setQueryParams: (nextQueryParams: InitialQueryParams) => void;
};

export type NodeUIProps = {
  queryParams: InitialQueryParams;
  setQueryParams: (nextQueryParams: InitialQueryParams) => void;
};

type NodeUIProvider = {
  children?: React.ReactNode;
};

const NodeUIContext = createContext<NodeUIContext>({} as NodeUIContext);

export const getInitialQueryParams = () => {
  const persistedNodeFilters = loadPersistedFilters();

  if (!persistedNodeFilters) return initialQueryParams;

  const { blockchain, type, status } = persistedNodeFilters;
  const params = buildParams(blockchain, type, status);

  const itemsPerPage = numOfItemsPerPage();

  return {
    ...initialQueryParams,
    filter: params,
    pagination: {
      ...initialQueryParams.pagination,
      itemsPerPage: itemsPerPage,
    },
  };
};

export function useNodeUIContext() {
  return useContext(NodeUIContext);
}

export const NodeUIConsumer = NodeUIContext.Consumer;

export function NodeUIProvider({ children }: NodeUIProvider) {
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

  const value: NodeUIContext = {
    queryParams,
    setQueryParamsBase,
    setQueryParams,
  };

  return (
    <NodeUIContext.Provider value={value}>{children}</NodeUIContext.Provider>
  );
}
