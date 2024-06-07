import {
  createContext,
  useContext,
  useState,
  useCallback,
  Dispatch,
  SetStateAction,
} from 'react';
import { useRecoilValue } from 'recoil';
import isEqual from 'lodash/isEqual';
import isFunction from 'lodash/isFunction';
import {
  initialQueryParams,
  InitialQueryParams,
  nodeAtoms,
  nodeSelectors,
} from '@modules/node';
import { numOfItemsPerPage } from '@shared/index';
import { UINodeFilterCriteria } from '@modules/grpc';

type NodeUIContext = {
  queryParams: InitialQueryParams;
  setQueryParamsBase: Dispatch<SetStateAction<InitialQueryParams>>;
  setQueryParams: (nextQueryParams: InitialQueryParams) => void;
};

export type NodeUIProps = {
  queryParams: InitialQueryParams;
  setQueryParams: (nextQueryParams: InitialQueryParams) => void;
};

type NodeUIProvider = React.PropsWithChildren;

const NodeUIContext = createContext<NodeUIContext>({} as NodeUIContext);

export const getInitialQueryParams = (
  initialFilters: UINodeFilterCriteria,
  initialKeyword?: string,
) => {
  if (!initialFilters) return initialQueryParams;

  const itemsPerPage = numOfItemsPerPage();

  return {
    ...initialQueryParams,
    filter: {
      ...initialFilters,
      keyword: initialKeyword ?? initialFilters.keyword,
    },
    pagination: {
      ...initialQueryParams.pagination,
      itemsPerPage,
    },
  };
};

export function useNodeUIContext() {
  return useContext(NodeUIContext);
}

export const NodeUIConsumer = NodeUIContext.Consumer;

export function NodeUIProvider({ children }: NodeUIProvider) {
  const initialFilters = useRecoilValue(nodeSelectors.filters);
  const initialKeyword = useRecoilValue(nodeAtoms.filtersSearchQuery);
  const initialQueryParamsValue = getInitialQueryParams(
    initialFilters,
    initialKeyword,
  );

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
