import {
  ReactNode,
  createContext,
  useContext,
  useState,
  useCallback,
  Dispatch,
  SetStateAction,
} from 'react';
import isEqual from 'lodash/isEqual';
import isFunction from 'lodash/isFunction';
import { initialQueryParams, InitialQueryParams } from '@modules/node';
import { numOfItemsPerPage } from '@shared/index';
import { fetchFromLocalStorage } from 'utils/fetchFromLocalStorage';

type NodeUIContext = {
  queryParams: InitialQueryParams;
  setQueryParamsBase: Dispatch<SetStateAction<InitialQueryParams>>;
  setQueryParams: (nextQueryParams: InitialQueryParams) => void;
};

export type NodeUIProps = {
  queryParams: InitialQueryParams;
  setQueryParams: (nextQueryParams: InitialQueryParams) => void;
};

type NodeUIProvider = {
  children?: ReactNode;
};

const NodeUIContext = createContext<NodeUIContext>({} as NodeUIContext);

export const getInitialQueryParams = () => {
  const persistedNodeFilters = fetchFromLocalStorage('node.filters');
  const persistedNodeSort = fetchFromLocalStorage('node.sort');

  if (!persistedNodeFilters && !persistedNodeSort) return initialQueryParams;

  const itemsPerPage = numOfItemsPerPage();

  return {
    ...initialQueryParams,
    filter: persistedNodeFilters
      ? persistedNodeFilters
      : initialQueryParams.filter,
    pagination: {
      ...initialQueryParams.pagination,
      itemsPerPage,
    },
    sort: persistedNodeSort ? persistedNodeSort : initialQueryParams.sort,
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
