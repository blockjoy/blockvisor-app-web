import { NextRouter } from 'next/router';

export const removeQueryParams = (
  router: NextRouter,
  paramsToRemove: Array<string> = [],
) => {
  if (paramsToRemove.length > 0) {
    paramsToRemove.forEach((param) => delete router.query[param]);
  } else {
    Object.keys(router.query).forEach((param) => delete router.query[param]);
  }
  router.replace(
    {
      pathname: router.pathname,
      query: router.query,
    },
    undefined,
    { shallow: true },
  );
};
