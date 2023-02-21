import {
  queryHelpers,
  buildQueries,
  Matcher,
  MatcherOptions,
} from '@testing-library/react';

const queryAllByDataCy = (
  container: HTMLElement,
  id: Matcher,
  options?: MatcherOptions | undefined,
) => queryHelpers.queryAllByAttribute('data-cy', container, id, options);

const getMultipleError = (c: Element | null, dataCyValue: string) =>
  `Found multiple elements with the data-cy attribute of: ${dataCyValue}`;
const getMissingError = (c: Element | null, dataCyValue: string) =>
  `Unable to find an element with the data-cy attribute of: ${dataCyValue}`;

const [
  queryByDataCy,
  getAllByDataCy,
  getByDataCy,
  findAllByDataCy,
  findByDataCy,
] = buildQueries(queryAllByDataCy, getMultipleError, getMissingError);

export {
  queryByDataCy,
  queryAllByDataCy,
  getByDataCy,
  getAllByDataCy,
  findAllByDataCy,
  findByDataCy,
};
