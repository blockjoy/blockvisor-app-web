/* eslint-disable */

export const protobufPackage = "blockjoy.common.v1";

/** The search operator for a set of fields. */
export enum SearchOperator {
  SEARCH_OPERATOR_UNSPECIFIED = 0,
  SEARCH_OPERATOR_OR = 1,
  SEARCH_OPERATOR_AND = 2,
  UNRECOGNIZED = -1,
}

/** The sort order to return a field by. */
export enum SortOrder {
  SORT_ORDER_UNSPECIFIED = 0,
  SORT_ORDER_ASCENDING = 1,
  SORT_ORDER_DESCENDING = 2,
  UNRECOGNIZED = -1,
}
