/* eslint-disable */
import Long from "long";
import type { CallContext, CallOptions } from "nice-grpc-common";
import _m0 from "protobufjs/minimal";
import { Timestamp } from "../../google/protobuf/timestamp";
import { Address } from "../common/v1/address";
import { Amount, Currency } from "../common/v1/currency";
import { SearchOperator, SortOrder } from "../common/v1/search";

export const protobufPackage = "blockjoy.v1";

export enum OrgSortField {
  ORG_SORT_FIELD_UNSPECIFIED = 0,
  ORG_SORT_FIELD_NAME = 1,
  ORG_SORT_FIELD_CREATED_AT = 2,
  ORG_SORT_FIELD_UPDATED_AT = 3,
  ORG_SORT_FIELD_HOST_COUNT = 4,
  ORG_SORT_FIELD_NODE_COUNT = 5,
  ORG_SORT_FIELD_MEMBER_COUNT = 6,
  UNRECOGNIZED = -1,
}

export enum InvoiceStatus {
  INVOICE_STATUS_UNSPECIFIED = 0,
  INVOICE_STATUS_DRAFT = 1,
  INVOICE_STATUS_OPEN = 2,
  INVOICE_STATUS_PAID = 3,
  INVOICE_STATUS_UNCOLLECTIBLE = 4,
  INVOICE_STATUS_VOID = 5,
  UNRECOGNIZED = -1,
}

/** Organization representation */
export interface Org {
  /** The UUID of a the organization. */
  id: string;
  /** The name of this organization. */
  name: string;
  /** A personal organization is the default for a single user. */
  personal: boolean;
  /** The moment which this organization was created. */
  createdAt:
    | Date
    | undefined;
  /** The moment which this organization was last updated. */
  updatedAt:
    | Date
    | undefined;
  /** This field contains the users of this organization. */
  members: OrgUser[];
  /** The number of users in this organization. */
  memberCount: number;
  /** The number of nodes that this organization has. */
  hostCount: number;
  /** The number of nodes that this organization has. */
  nodeCount: number;
}

export interface OrgServiceGetRequest {
  id: string;
}

export interface OrgServiceGetResponse {
  org: Org | undefined;
}

export interface OrgServiceListRequest {
  /**
   * If this is set to a user id, only orgs that that user is a member of will
   * be returned
   */
  memberId?:
    | string
    | undefined;
  /**
   * If this is true, only personal orgs are returned. If this is false, no
   * personal orgs are returned.
   */
  personal?:
    | boolean
    | undefined;
  /** The number of items to be skipped over. */
  offset: number;
  /**
   * The number of items that will be returned. Together with offset, you can
   * use this to get pagination.
   */
  limit: number;
  /** Search params. */
  search?:
    | OrgSearch
    | undefined;
  /** The field sorting order of results. */
  sort: OrgSort[];
}

/**
 * This message contains fields used to search organizations as opposed to just
 * filtering them.
 */
export interface OrgSearch {
  /** The way the search parameters should be combined. */
  operator: SearchOperator;
  /** Search only the id. */
  id?:
    | string
    | undefined;
  /** Search only the name. */
  name?: string | undefined;
}

export interface OrgSort {
  field: OrgSortField;
  order: SortOrder;
}

export interface OrgServiceListResponse {
  orgs: Org[];
  /** The total number of orgs matching your query. */
  orgCount: number;
}

export interface OrgServiceCreateRequest {
  name: string;
}

export interface OrgServiceCreateResponse {
  org: Org | undefined;
}

export interface OrgServiceUpdateRequest {
  /** The id of the organization to be updated. */
  id: string;
  /**
   * If this value is provided, the name of the organization will be set to the
   * provided value.
   */
  name?: string | undefined;
}

export interface OrgServiceUpdateResponse {
}

export interface OrgServiceDeleteRequest {
  id: string;
}

export interface OrgServiceDeleteResponse {
}

export interface OrgServiceRemoveMemberRequest {
  userId: string;
  orgId: string;
}

export interface OrgServiceRemoveMemberResponse {
}

export interface OrgServiceGetProvisionTokenRequest {
  userId: string;
  orgId: string;
}

export interface OrgServiceGetProvisionTokenResponse {
  token: string;
}

export interface OrgServiceResetProvisionTokenRequest {
  userId: string;
  orgId: string;
}

export interface OrgServiceResetProvisionTokenResponse {
  token: string;
}

export interface OrgUser {
  userId: string;
  orgId: string;
  name: string;
  email: string;
  roles: OrgRole[];
  joinedAt: Date | undefined;
}

export interface OrgRole {
  name?: string | undefined;
}

export interface OrgServiceInitCardRequest {
  /** The id of the org for which you want to initialise a new card. */
  orgId: string;
  /** The user that initiates this card. */
  userId: string;
}

export interface OrgServiceInitCardResponse {
  clientSecret: string;
}

export interface OrgServiceListPaymentMethodsRequest {
  orgId: string;
}

export interface OrgServiceListPaymentMethodsResponse {
  methods: PaymentMethod[];
}

export interface PaymentMethod {
  /** The id of the org to which this payment method belongs. */
  orgId?:
    | string
    | undefined;
  /** The id of the user that created this payment method. */
  userId?: string | undefined;
  createdAt: Date | undefined;
  updatedAt:
    | Date
    | undefined;
  /** This payment method is done through a credit card. */
  card?: Card | undefined;
}

export interface Card {
  brand: string;
  expMonth: number;
  expYear: number;
  last4: string;
}

export interface OrgServiceBillingDetailsRequest {
  orgId: string;
}

export interface OrgServiceBillingDetailsResponse {
  currency: Currency;
  currentPeriodStart: Date | undefined;
  currentPeriodEnd: Date | undefined;
  defaultPaymentMethod?: string | undefined;
  createdAt: Date | undefined;
  status: string;
  items: BillingItem[];
}

export interface BillingItem {
  name?:
    | string
    | undefined;
  /** In the lowest denomination, e.g. dollar cents or pennies. */
  unitAmount?:
    | number
    | undefined;
  /** The number of items. */
  quantity?: number | undefined;
}

export interface OrgServiceGetAddressRequest {
  orgId: string;
}

export interface OrgServiceGetAddressResponse {
  address?: Address | undefined;
}

export interface OrgServiceSetAddressRequest {
  orgId: string;
  address: Address | undefined;
}

export interface OrgServiceSetAddressResponse {
}

export interface OrgServiceDeleteAddressRequest {
  orgId: string;
}

export interface OrgServiceDeleteAddressResponse {
}

export interface OrgServiceGetInvoicesRequest {
  orgId: string;
}

export interface OrgServiceGetInvoicesResponse {
  invoices: Invoice[];
}

export interface Invoice {
  /** The invoice number is displayed on the invoice. */
  number?: string | undefined;
  createdAt?: Date | undefined;
  discount: Discount | undefined;
  pdfUrl?: string | undefined;
  lineItems: LineItem[];
  status?: InvoiceStatus | undefined;
  subtotal?: number | undefined;
  total?: number | undefined;
}

export interface Discount {
  name?: string | undefined;
}

export interface LineItem {
  subtotal: number;
  total?: number | undefined;
  description?: string | undefined;
  start?: Date | undefined;
  end?: Date | undefined;
  plan?: string | undefined;
  proration: boolean;
  quantity?: number | undefined;
  discounts: LineItemDiscount[];
}

export interface LineItemDiscount {
  name?: string | undefined;
  amount?: Amount | undefined;
}

function createBaseOrg(): Org {
  return {
    id: "",
    name: "",
    personal: false,
    createdAt: undefined,
    updatedAt: undefined,
    members: [],
    memberCount: 0,
    hostCount: 0,
    nodeCount: 0,
  };
}

export const Org = {
  encode(message: Org, writer: _m0.Writer = _m0.Writer.create()): _m0.Writer {
    if (message.id !== "") {
      writer.uint32(10).string(message.id);
    }
    if (message.name !== "") {
      writer.uint32(18).string(message.name);
    }
    if (message.personal === true) {
      writer.uint32(24).bool(message.personal);
    }
    if (message.createdAt !== undefined) {
      Timestamp.encode(toTimestamp(message.createdAt), writer.uint32(34).fork()).ldelim();
    }
    if (message.updatedAt !== undefined) {
      Timestamp.encode(toTimestamp(message.updatedAt), writer.uint32(42).fork()).ldelim();
    }
    for (const v of message.members) {
      OrgUser.encode(v!, writer.uint32(50).fork()).ldelim();
    }
    if (message.memberCount !== 0) {
      writer.uint32(56).uint64(message.memberCount);
    }
    if (message.hostCount !== 0) {
      writer.uint32(64).uint64(message.hostCount);
    }
    if (message.nodeCount !== 0) {
      writer.uint32(72).uint64(message.nodeCount);
    }
    return writer;
  },

  decode(input: _m0.Reader | Uint8Array, length?: number): Org {
    const reader = input instanceof _m0.Reader ? input : _m0.Reader.create(input);
    let end = length === undefined ? reader.len : reader.pos + length;
    const message = createBaseOrg();
    while (reader.pos < end) {
      const tag = reader.uint32();
      switch (tag >>> 3) {
        case 1:
          if (tag !== 10) {
            break;
          }

          message.id = reader.string();
          continue;
        case 2:
          if (tag !== 18) {
            break;
          }

          message.name = reader.string();
          continue;
        case 3:
          if (tag !== 24) {
            break;
          }

          message.personal = reader.bool();
          continue;
        case 4:
          if (tag !== 34) {
            break;
          }

          message.createdAt = fromTimestamp(Timestamp.decode(reader, reader.uint32()));
          continue;
        case 5:
          if (tag !== 42) {
            break;
          }

          message.updatedAt = fromTimestamp(Timestamp.decode(reader, reader.uint32()));
          continue;
        case 6:
          if (tag !== 50) {
            break;
          }

          message.members.push(OrgUser.decode(reader, reader.uint32()));
          continue;
        case 7:
          if (tag !== 56) {
            break;
          }

          message.memberCount = longToNumber(reader.uint64() as Long);
          continue;
        case 8:
          if (tag !== 64) {
            break;
          }

          message.hostCount = longToNumber(reader.uint64() as Long);
          continue;
        case 9:
          if (tag !== 72) {
            break;
          }

          message.nodeCount = longToNumber(reader.uint64() as Long);
          continue;
      }
      if ((tag & 7) === 4 || tag === 0) {
        break;
      }
      reader.skipType(tag & 7);
    }
    return message;
  },

  create(base?: DeepPartial<Org>): Org {
    return Org.fromPartial(base ?? {});
  },

  fromPartial(object: DeepPartial<Org>): Org {
    const message = createBaseOrg();
    message.id = object.id ?? "";
    message.name = object.name ?? "";
    message.personal = object.personal ?? false;
    message.createdAt = object.createdAt ?? undefined;
    message.updatedAt = object.updatedAt ?? undefined;
    message.members = object.members?.map((e) => OrgUser.fromPartial(e)) || [];
    message.memberCount = object.memberCount ?? 0;
    message.hostCount = object.hostCount ?? 0;
    message.nodeCount = object.nodeCount ?? 0;
    return message;
  },
};

function createBaseOrgServiceGetRequest(): OrgServiceGetRequest {
  return { id: "" };
}

export const OrgServiceGetRequest = {
  encode(message: OrgServiceGetRequest, writer: _m0.Writer = _m0.Writer.create()): _m0.Writer {
    if (message.id !== "") {
      writer.uint32(10).string(message.id);
    }
    return writer;
  },

  decode(input: _m0.Reader | Uint8Array, length?: number): OrgServiceGetRequest {
    const reader = input instanceof _m0.Reader ? input : _m0.Reader.create(input);
    let end = length === undefined ? reader.len : reader.pos + length;
    const message = createBaseOrgServiceGetRequest();
    while (reader.pos < end) {
      const tag = reader.uint32();
      switch (tag >>> 3) {
        case 1:
          if (tag !== 10) {
            break;
          }

          message.id = reader.string();
          continue;
      }
      if ((tag & 7) === 4 || tag === 0) {
        break;
      }
      reader.skipType(tag & 7);
    }
    return message;
  },

  create(base?: DeepPartial<OrgServiceGetRequest>): OrgServiceGetRequest {
    return OrgServiceGetRequest.fromPartial(base ?? {});
  },

  fromPartial(object: DeepPartial<OrgServiceGetRequest>): OrgServiceGetRequest {
    const message = createBaseOrgServiceGetRequest();
    message.id = object.id ?? "";
    return message;
  },
};

function createBaseOrgServiceGetResponse(): OrgServiceGetResponse {
  return { org: undefined };
}

export const OrgServiceGetResponse = {
  encode(message: OrgServiceGetResponse, writer: _m0.Writer = _m0.Writer.create()): _m0.Writer {
    if (message.org !== undefined) {
      Org.encode(message.org, writer.uint32(10).fork()).ldelim();
    }
    return writer;
  },

  decode(input: _m0.Reader | Uint8Array, length?: number): OrgServiceGetResponse {
    const reader = input instanceof _m0.Reader ? input : _m0.Reader.create(input);
    let end = length === undefined ? reader.len : reader.pos + length;
    const message = createBaseOrgServiceGetResponse();
    while (reader.pos < end) {
      const tag = reader.uint32();
      switch (tag >>> 3) {
        case 1:
          if (tag !== 10) {
            break;
          }

          message.org = Org.decode(reader, reader.uint32());
          continue;
      }
      if ((tag & 7) === 4 || tag === 0) {
        break;
      }
      reader.skipType(tag & 7);
    }
    return message;
  },

  create(base?: DeepPartial<OrgServiceGetResponse>): OrgServiceGetResponse {
    return OrgServiceGetResponse.fromPartial(base ?? {});
  },

  fromPartial(object: DeepPartial<OrgServiceGetResponse>): OrgServiceGetResponse {
    const message = createBaseOrgServiceGetResponse();
    message.org = (object.org !== undefined && object.org !== null) ? Org.fromPartial(object.org) : undefined;
    return message;
  },
};

function createBaseOrgServiceListRequest(): OrgServiceListRequest {
  return { memberId: undefined, personal: undefined, offset: 0, limit: 0, search: undefined, sort: [] };
}

export const OrgServiceListRequest = {
  encode(message: OrgServiceListRequest, writer: _m0.Writer = _m0.Writer.create()): _m0.Writer {
    if (message.memberId !== undefined) {
      writer.uint32(10).string(message.memberId);
    }
    if (message.personal !== undefined) {
      writer.uint32(16).bool(message.personal);
    }
    if (message.offset !== 0) {
      writer.uint32(24).uint64(message.offset);
    }
    if (message.limit !== 0) {
      writer.uint32(32).uint64(message.limit);
    }
    if (message.search !== undefined) {
      OrgSearch.encode(message.search, writer.uint32(42).fork()).ldelim();
    }
    for (const v of message.sort) {
      OrgSort.encode(v!, writer.uint32(50).fork()).ldelim();
    }
    return writer;
  },

  decode(input: _m0.Reader | Uint8Array, length?: number): OrgServiceListRequest {
    const reader = input instanceof _m0.Reader ? input : _m0.Reader.create(input);
    let end = length === undefined ? reader.len : reader.pos + length;
    const message = createBaseOrgServiceListRequest();
    while (reader.pos < end) {
      const tag = reader.uint32();
      switch (tag >>> 3) {
        case 1:
          if (tag !== 10) {
            break;
          }

          message.memberId = reader.string();
          continue;
        case 2:
          if (tag !== 16) {
            break;
          }

          message.personal = reader.bool();
          continue;
        case 3:
          if (tag !== 24) {
            break;
          }

          message.offset = longToNumber(reader.uint64() as Long);
          continue;
        case 4:
          if (tag !== 32) {
            break;
          }

          message.limit = longToNumber(reader.uint64() as Long);
          continue;
        case 5:
          if (tag !== 42) {
            break;
          }

          message.search = OrgSearch.decode(reader, reader.uint32());
          continue;
        case 6:
          if (tag !== 50) {
            break;
          }

          message.sort.push(OrgSort.decode(reader, reader.uint32()));
          continue;
      }
      if ((tag & 7) === 4 || tag === 0) {
        break;
      }
      reader.skipType(tag & 7);
    }
    return message;
  },

  create(base?: DeepPartial<OrgServiceListRequest>): OrgServiceListRequest {
    return OrgServiceListRequest.fromPartial(base ?? {});
  },

  fromPartial(object: DeepPartial<OrgServiceListRequest>): OrgServiceListRequest {
    const message = createBaseOrgServiceListRequest();
    message.memberId = object.memberId ?? undefined;
    message.personal = object.personal ?? undefined;
    message.offset = object.offset ?? 0;
    message.limit = object.limit ?? 0;
    message.search = (object.search !== undefined && object.search !== null)
      ? OrgSearch.fromPartial(object.search)
      : undefined;
    message.sort = object.sort?.map((e) => OrgSort.fromPartial(e)) || [];
    return message;
  },
};

function createBaseOrgSearch(): OrgSearch {
  return { operator: 0, id: undefined, name: undefined };
}

export const OrgSearch = {
  encode(message: OrgSearch, writer: _m0.Writer = _m0.Writer.create()): _m0.Writer {
    if (message.operator !== 0) {
      writer.uint32(8).int32(message.operator);
    }
    if (message.id !== undefined) {
      writer.uint32(18).string(message.id);
    }
    if (message.name !== undefined) {
      writer.uint32(26).string(message.name);
    }
    return writer;
  },

  decode(input: _m0.Reader | Uint8Array, length?: number): OrgSearch {
    const reader = input instanceof _m0.Reader ? input : _m0.Reader.create(input);
    let end = length === undefined ? reader.len : reader.pos + length;
    const message = createBaseOrgSearch();
    while (reader.pos < end) {
      const tag = reader.uint32();
      switch (tag >>> 3) {
        case 1:
          if (tag !== 8) {
            break;
          }

          message.operator = reader.int32() as any;
          continue;
        case 2:
          if (tag !== 18) {
            break;
          }

          message.id = reader.string();
          continue;
        case 3:
          if (tag !== 26) {
            break;
          }

          message.name = reader.string();
          continue;
      }
      if ((tag & 7) === 4 || tag === 0) {
        break;
      }
      reader.skipType(tag & 7);
    }
    return message;
  },

  create(base?: DeepPartial<OrgSearch>): OrgSearch {
    return OrgSearch.fromPartial(base ?? {});
  },

  fromPartial(object: DeepPartial<OrgSearch>): OrgSearch {
    const message = createBaseOrgSearch();
    message.operator = object.operator ?? 0;
    message.id = object.id ?? undefined;
    message.name = object.name ?? undefined;
    return message;
  },
};

function createBaseOrgSort(): OrgSort {
  return { field: 0, order: 0 };
}

export const OrgSort = {
  encode(message: OrgSort, writer: _m0.Writer = _m0.Writer.create()): _m0.Writer {
    if (message.field !== 0) {
      writer.uint32(8).int32(message.field);
    }
    if (message.order !== 0) {
      writer.uint32(16).int32(message.order);
    }
    return writer;
  },

  decode(input: _m0.Reader | Uint8Array, length?: number): OrgSort {
    const reader = input instanceof _m0.Reader ? input : _m0.Reader.create(input);
    let end = length === undefined ? reader.len : reader.pos + length;
    const message = createBaseOrgSort();
    while (reader.pos < end) {
      const tag = reader.uint32();
      switch (tag >>> 3) {
        case 1:
          if (tag !== 8) {
            break;
          }

          message.field = reader.int32() as any;
          continue;
        case 2:
          if (tag !== 16) {
            break;
          }

          message.order = reader.int32() as any;
          continue;
      }
      if ((tag & 7) === 4 || tag === 0) {
        break;
      }
      reader.skipType(tag & 7);
    }
    return message;
  },

  create(base?: DeepPartial<OrgSort>): OrgSort {
    return OrgSort.fromPartial(base ?? {});
  },

  fromPartial(object: DeepPartial<OrgSort>): OrgSort {
    const message = createBaseOrgSort();
    message.field = object.field ?? 0;
    message.order = object.order ?? 0;
    return message;
  },
};

function createBaseOrgServiceListResponse(): OrgServiceListResponse {
  return { orgs: [], orgCount: 0 };
}

export const OrgServiceListResponse = {
  encode(message: OrgServiceListResponse, writer: _m0.Writer = _m0.Writer.create()): _m0.Writer {
    for (const v of message.orgs) {
      Org.encode(v!, writer.uint32(10).fork()).ldelim();
    }
    if (message.orgCount !== 0) {
      writer.uint32(16).uint64(message.orgCount);
    }
    return writer;
  },

  decode(input: _m0.Reader | Uint8Array, length?: number): OrgServiceListResponse {
    const reader = input instanceof _m0.Reader ? input : _m0.Reader.create(input);
    let end = length === undefined ? reader.len : reader.pos + length;
    const message = createBaseOrgServiceListResponse();
    while (reader.pos < end) {
      const tag = reader.uint32();
      switch (tag >>> 3) {
        case 1:
          if (tag !== 10) {
            break;
          }

          message.orgs.push(Org.decode(reader, reader.uint32()));
          continue;
        case 2:
          if (tag !== 16) {
            break;
          }

          message.orgCount = longToNumber(reader.uint64() as Long);
          continue;
      }
      if ((tag & 7) === 4 || tag === 0) {
        break;
      }
      reader.skipType(tag & 7);
    }
    return message;
  },

  create(base?: DeepPartial<OrgServiceListResponse>): OrgServiceListResponse {
    return OrgServiceListResponse.fromPartial(base ?? {});
  },

  fromPartial(object: DeepPartial<OrgServiceListResponse>): OrgServiceListResponse {
    const message = createBaseOrgServiceListResponse();
    message.orgs = object.orgs?.map((e) => Org.fromPartial(e)) || [];
    message.orgCount = object.orgCount ?? 0;
    return message;
  },
};

function createBaseOrgServiceCreateRequest(): OrgServiceCreateRequest {
  return { name: "" };
}

export const OrgServiceCreateRequest = {
  encode(message: OrgServiceCreateRequest, writer: _m0.Writer = _m0.Writer.create()): _m0.Writer {
    if (message.name !== "") {
      writer.uint32(10).string(message.name);
    }
    return writer;
  },

  decode(input: _m0.Reader | Uint8Array, length?: number): OrgServiceCreateRequest {
    const reader = input instanceof _m0.Reader ? input : _m0.Reader.create(input);
    let end = length === undefined ? reader.len : reader.pos + length;
    const message = createBaseOrgServiceCreateRequest();
    while (reader.pos < end) {
      const tag = reader.uint32();
      switch (tag >>> 3) {
        case 1:
          if (tag !== 10) {
            break;
          }

          message.name = reader.string();
          continue;
      }
      if ((tag & 7) === 4 || tag === 0) {
        break;
      }
      reader.skipType(tag & 7);
    }
    return message;
  },

  create(base?: DeepPartial<OrgServiceCreateRequest>): OrgServiceCreateRequest {
    return OrgServiceCreateRequest.fromPartial(base ?? {});
  },

  fromPartial(object: DeepPartial<OrgServiceCreateRequest>): OrgServiceCreateRequest {
    const message = createBaseOrgServiceCreateRequest();
    message.name = object.name ?? "";
    return message;
  },
};

function createBaseOrgServiceCreateResponse(): OrgServiceCreateResponse {
  return { org: undefined };
}

export const OrgServiceCreateResponse = {
  encode(message: OrgServiceCreateResponse, writer: _m0.Writer = _m0.Writer.create()): _m0.Writer {
    if (message.org !== undefined) {
      Org.encode(message.org, writer.uint32(10).fork()).ldelim();
    }
    return writer;
  },

  decode(input: _m0.Reader | Uint8Array, length?: number): OrgServiceCreateResponse {
    const reader = input instanceof _m0.Reader ? input : _m0.Reader.create(input);
    let end = length === undefined ? reader.len : reader.pos + length;
    const message = createBaseOrgServiceCreateResponse();
    while (reader.pos < end) {
      const tag = reader.uint32();
      switch (tag >>> 3) {
        case 1:
          if (tag !== 10) {
            break;
          }

          message.org = Org.decode(reader, reader.uint32());
          continue;
      }
      if ((tag & 7) === 4 || tag === 0) {
        break;
      }
      reader.skipType(tag & 7);
    }
    return message;
  },

  create(base?: DeepPartial<OrgServiceCreateResponse>): OrgServiceCreateResponse {
    return OrgServiceCreateResponse.fromPartial(base ?? {});
  },

  fromPartial(object: DeepPartial<OrgServiceCreateResponse>): OrgServiceCreateResponse {
    const message = createBaseOrgServiceCreateResponse();
    message.org = (object.org !== undefined && object.org !== null) ? Org.fromPartial(object.org) : undefined;
    return message;
  },
};

function createBaseOrgServiceUpdateRequest(): OrgServiceUpdateRequest {
  return { id: "", name: undefined };
}

export const OrgServiceUpdateRequest = {
  encode(message: OrgServiceUpdateRequest, writer: _m0.Writer = _m0.Writer.create()): _m0.Writer {
    if (message.id !== "") {
      writer.uint32(10).string(message.id);
    }
    if (message.name !== undefined) {
      writer.uint32(18).string(message.name);
    }
    return writer;
  },

  decode(input: _m0.Reader | Uint8Array, length?: number): OrgServiceUpdateRequest {
    const reader = input instanceof _m0.Reader ? input : _m0.Reader.create(input);
    let end = length === undefined ? reader.len : reader.pos + length;
    const message = createBaseOrgServiceUpdateRequest();
    while (reader.pos < end) {
      const tag = reader.uint32();
      switch (tag >>> 3) {
        case 1:
          if (tag !== 10) {
            break;
          }

          message.id = reader.string();
          continue;
        case 2:
          if (tag !== 18) {
            break;
          }

          message.name = reader.string();
          continue;
      }
      if ((tag & 7) === 4 || tag === 0) {
        break;
      }
      reader.skipType(tag & 7);
    }
    return message;
  },

  create(base?: DeepPartial<OrgServiceUpdateRequest>): OrgServiceUpdateRequest {
    return OrgServiceUpdateRequest.fromPartial(base ?? {});
  },

  fromPartial(object: DeepPartial<OrgServiceUpdateRequest>): OrgServiceUpdateRequest {
    const message = createBaseOrgServiceUpdateRequest();
    message.id = object.id ?? "";
    message.name = object.name ?? undefined;
    return message;
  },
};

function createBaseOrgServiceUpdateResponse(): OrgServiceUpdateResponse {
  return {};
}

export const OrgServiceUpdateResponse = {
  encode(_: OrgServiceUpdateResponse, writer: _m0.Writer = _m0.Writer.create()): _m0.Writer {
    return writer;
  },

  decode(input: _m0.Reader | Uint8Array, length?: number): OrgServiceUpdateResponse {
    const reader = input instanceof _m0.Reader ? input : _m0.Reader.create(input);
    let end = length === undefined ? reader.len : reader.pos + length;
    const message = createBaseOrgServiceUpdateResponse();
    while (reader.pos < end) {
      const tag = reader.uint32();
      switch (tag >>> 3) {
      }
      if ((tag & 7) === 4 || tag === 0) {
        break;
      }
      reader.skipType(tag & 7);
    }
    return message;
  },

  create(base?: DeepPartial<OrgServiceUpdateResponse>): OrgServiceUpdateResponse {
    return OrgServiceUpdateResponse.fromPartial(base ?? {});
  },

  fromPartial(_: DeepPartial<OrgServiceUpdateResponse>): OrgServiceUpdateResponse {
    const message = createBaseOrgServiceUpdateResponse();
    return message;
  },
};

function createBaseOrgServiceDeleteRequest(): OrgServiceDeleteRequest {
  return { id: "" };
}

export const OrgServiceDeleteRequest = {
  encode(message: OrgServiceDeleteRequest, writer: _m0.Writer = _m0.Writer.create()): _m0.Writer {
    if (message.id !== "") {
      writer.uint32(10).string(message.id);
    }
    return writer;
  },

  decode(input: _m0.Reader | Uint8Array, length?: number): OrgServiceDeleteRequest {
    const reader = input instanceof _m0.Reader ? input : _m0.Reader.create(input);
    let end = length === undefined ? reader.len : reader.pos + length;
    const message = createBaseOrgServiceDeleteRequest();
    while (reader.pos < end) {
      const tag = reader.uint32();
      switch (tag >>> 3) {
        case 1:
          if (tag !== 10) {
            break;
          }

          message.id = reader.string();
          continue;
      }
      if ((tag & 7) === 4 || tag === 0) {
        break;
      }
      reader.skipType(tag & 7);
    }
    return message;
  },

  create(base?: DeepPartial<OrgServiceDeleteRequest>): OrgServiceDeleteRequest {
    return OrgServiceDeleteRequest.fromPartial(base ?? {});
  },

  fromPartial(object: DeepPartial<OrgServiceDeleteRequest>): OrgServiceDeleteRequest {
    const message = createBaseOrgServiceDeleteRequest();
    message.id = object.id ?? "";
    return message;
  },
};

function createBaseOrgServiceDeleteResponse(): OrgServiceDeleteResponse {
  return {};
}

export const OrgServiceDeleteResponse = {
  encode(_: OrgServiceDeleteResponse, writer: _m0.Writer = _m0.Writer.create()): _m0.Writer {
    return writer;
  },

  decode(input: _m0.Reader | Uint8Array, length?: number): OrgServiceDeleteResponse {
    const reader = input instanceof _m0.Reader ? input : _m0.Reader.create(input);
    let end = length === undefined ? reader.len : reader.pos + length;
    const message = createBaseOrgServiceDeleteResponse();
    while (reader.pos < end) {
      const tag = reader.uint32();
      switch (tag >>> 3) {
      }
      if ((tag & 7) === 4 || tag === 0) {
        break;
      }
      reader.skipType(tag & 7);
    }
    return message;
  },

  create(base?: DeepPartial<OrgServiceDeleteResponse>): OrgServiceDeleteResponse {
    return OrgServiceDeleteResponse.fromPartial(base ?? {});
  },

  fromPartial(_: DeepPartial<OrgServiceDeleteResponse>): OrgServiceDeleteResponse {
    const message = createBaseOrgServiceDeleteResponse();
    return message;
  },
};

function createBaseOrgServiceRemoveMemberRequest(): OrgServiceRemoveMemberRequest {
  return { userId: "", orgId: "" };
}

export const OrgServiceRemoveMemberRequest = {
  encode(message: OrgServiceRemoveMemberRequest, writer: _m0.Writer = _m0.Writer.create()): _m0.Writer {
    if (message.userId !== "") {
      writer.uint32(10).string(message.userId);
    }
    if (message.orgId !== "") {
      writer.uint32(18).string(message.orgId);
    }
    return writer;
  },

  decode(input: _m0.Reader | Uint8Array, length?: number): OrgServiceRemoveMemberRequest {
    const reader = input instanceof _m0.Reader ? input : _m0.Reader.create(input);
    let end = length === undefined ? reader.len : reader.pos + length;
    const message = createBaseOrgServiceRemoveMemberRequest();
    while (reader.pos < end) {
      const tag = reader.uint32();
      switch (tag >>> 3) {
        case 1:
          if (tag !== 10) {
            break;
          }

          message.userId = reader.string();
          continue;
        case 2:
          if (tag !== 18) {
            break;
          }

          message.orgId = reader.string();
          continue;
      }
      if ((tag & 7) === 4 || tag === 0) {
        break;
      }
      reader.skipType(tag & 7);
    }
    return message;
  },

  create(base?: DeepPartial<OrgServiceRemoveMemberRequest>): OrgServiceRemoveMemberRequest {
    return OrgServiceRemoveMemberRequest.fromPartial(base ?? {});
  },

  fromPartial(object: DeepPartial<OrgServiceRemoveMemberRequest>): OrgServiceRemoveMemberRequest {
    const message = createBaseOrgServiceRemoveMemberRequest();
    message.userId = object.userId ?? "";
    message.orgId = object.orgId ?? "";
    return message;
  },
};

function createBaseOrgServiceRemoveMemberResponse(): OrgServiceRemoveMemberResponse {
  return {};
}

export const OrgServiceRemoveMemberResponse = {
  encode(_: OrgServiceRemoveMemberResponse, writer: _m0.Writer = _m0.Writer.create()): _m0.Writer {
    return writer;
  },

  decode(input: _m0.Reader | Uint8Array, length?: number): OrgServiceRemoveMemberResponse {
    const reader = input instanceof _m0.Reader ? input : _m0.Reader.create(input);
    let end = length === undefined ? reader.len : reader.pos + length;
    const message = createBaseOrgServiceRemoveMemberResponse();
    while (reader.pos < end) {
      const tag = reader.uint32();
      switch (tag >>> 3) {
      }
      if ((tag & 7) === 4 || tag === 0) {
        break;
      }
      reader.skipType(tag & 7);
    }
    return message;
  },

  create(base?: DeepPartial<OrgServiceRemoveMemberResponse>): OrgServiceRemoveMemberResponse {
    return OrgServiceRemoveMemberResponse.fromPartial(base ?? {});
  },

  fromPartial(_: DeepPartial<OrgServiceRemoveMemberResponse>): OrgServiceRemoveMemberResponse {
    const message = createBaseOrgServiceRemoveMemberResponse();
    return message;
  },
};

function createBaseOrgServiceGetProvisionTokenRequest(): OrgServiceGetProvisionTokenRequest {
  return { userId: "", orgId: "" };
}

export const OrgServiceGetProvisionTokenRequest = {
  encode(message: OrgServiceGetProvisionTokenRequest, writer: _m0.Writer = _m0.Writer.create()): _m0.Writer {
    if (message.userId !== "") {
      writer.uint32(10).string(message.userId);
    }
    if (message.orgId !== "") {
      writer.uint32(18).string(message.orgId);
    }
    return writer;
  },

  decode(input: _m0.Reader | Uint8Array, length?: number): OrgServiceGetProvisionTokenRequest {
    const reader = input instanceof _m0.Reader ? input : _m0.Reader.create(input);
    let end = length === undefined ? reader.len : reader.pos + length;
    const message = createBaseOrgServiceGetProvisionTokenRequest();
    while (reader.pos < end) {
      const tag = reader.uint32();
      switch (tag >>> 3) {
        case 1:
          if (tag !== 10) {
            break;
          }

          message.userId = reader.string();
          continue;
        case 2:
          if (tag !== 18) {
            break;
          }

          message.orgId = reader.string();
          continue;
      }
      if ((tag & 7) === 4 || tag === 0) {
        break;
      }
      reader.skipType(tag & 7);
    }
    return message;
  },

  create(base?: DeepPartial<OrgServiceGetProvisionTokenRequest>): OrgServiceGetProvisionTokenRequest {
    return OrgServiceGetProvisionTokenRequest.fromPartial(base ?? {});
  },

  fromPartial(object: DeepPartial<OrgServiceGetProvisionTokenRequest>): OrgServiceGetProvisionTokenRequest {
    const message = createBaseOrgServiceGetProvisionTokenRequest();
    message.userId = object.userId ?? "";
    message.orgId = object.orgId ?? "";
    return message;
  },
};

function createBaseOrgServiceGetProvisionTokenResponse(): OrgServiceGetProvisionTokenResponse {
  return { token: "" };
}

export const OrgServiceGetProvisionTokenResponse = {
  encode(message: OrgServiceGetProvisionTokenResponse, writer: _m0.Writer = _m0.Writer.create()): _m0.Writer {
    if (message.token !== "") {
      writer.uint32(10).string(message.token);
    }
    return writer;
  },

  decode(input: _m0.Reader | Uint8Array, length?: number): OrgServiceGetProvisionTokenResponse {
    const reader = input instanceof _m0.Reader ? input : _m0.Reader.create(input);
    let end = length === undefined ? reader.len : reader.pos + length;
    const message = createBaseOrgServiceGetProvisionTokenResponse();
    while (reader.pos < end) {
      const tag = reader.uint32();
      switch (tag >>> 3) {
        case 1:
          if (tag !== 10) {
            break;
          }

          message.token = reader.string();
          continue;
      }
      if ((tag & 7) === 4 || tag === 0) {
        break;
      }
      reader.skipType(tag & 7);
    }
    return message;
  },

  create(base?: DeepPartial<OrgServiceGetProvisionTokenResponse>): OrgServiceGetProvisionTokenResponse {
    return OrgServiceGetProvisionTokenResponse.fromPartial(base ?? {});
  },

  fromPartial(object: DeepPartial<OrgServiceGetProvisionTokenResponse>): OrgServiceGetProvisionTokenResponse {
    const message = createBaseOrgServiceGetProvisionTokenResponse();
    message.token = object.token ?? "";
    return message;
  },
};

function createBaseOrgServiceResetProvisionTokenRequest(): OrgServiceResetProvisionTokenRequest {
  return { userId: "", orgId: "" };
}

export const OrgServiceResetProvisionTokenRequest = {
  encode(message: OrgServiceResetProvisionTokenRequest, writer: _m0.Writer = _m0.Writer.create()): _m0.Writer {
    if (message.userId !== "") {
      writer.uint32(10).string(message.userId);
    }
    if (message.orgId !== "") {
      writer.uint32(18).string(message.orgId);
    }
    return writer;
  },

  decode(input: _m0.Reader | Uint8Array, length?: number): OrgServiceResetProvisionTokenRequest {
    const reader = input instanceof _m0.Reader ? input : _m0.Reader.create(input);
    let end = length === undefined ? reader.len : reader.pos + length;
    const message = createBaseOrgServiceResetProvisionTokenRequest();
    while (reader.pos < end) {
      const tag = reader.uint32();
      switch (tag >>> 3) {
        case 1:
          if (tag !== 10) {
            break;
          }

          message.userId = reader.string();
          continue;
        case 2:
          if (tag !== 18) {
            break;
          }

          message.orgId = reader.string();
          continue;
      }
      if ((tag & 7) === 4 || tag === 0) {
        break;
      }
      reader.skipType(tag & 7);
    }
    return message;
  },

  create(base?: DeepPartial<OrgServiceResetProvisionTokenRequest>): OrgServiceResetProvisionTokenRequest {
    return OrgServiceResetProvisionTokenRequest.fromPartial(base ?? {});
  },

  fromPartial(object: DeepPartial<OrgServiceResetProvisionTokenRequest>): OrgServiceResetProvisionTokenRequest {
    const message = createBaseOrgServiceResetProvisionTokenRequest();
    message.userId = object.userId ?? "";
    message.orgId = object.orgId ?? "";
    return message;
  },
};

function createBaseOrgServiceResetProvisionTokenResponse(): OrgServiceResetProvisionTokenResponse {
  return { token: "" };
}

export const OrgServiceResetProvisionTokenResponse = {
  encode(message: OrgServiceResetProvisionTokenResponse, writer: _m0.Writer = _m0.Writer.create()): _m0.Writer {
    if (message.token !== "") {
      writer.uint32(10).string(message.token);
    }
    return writer;
  },

  decode(input: _m0.Reader | Uint8Array, length?: number): OrgServiceResetProvisionTokenResponse {
    const reader = input instanceof _m0.Reader ? input : _m0.Reader.create(input);
    let end = length === undefined ? reader.len : reader.pos + length;
    const message = createBaseOrgServiceResetProvisionTokenResponse();
    while (reader.pos < end) {
      const tag = reader.uint32();
      switch (tag >>> 3) {
        case 1:
          if (tag !== 10) {
            break;
          }

          message.token = reader.string();
          continue;
      }
      if ((tag & 7) === 4 || tag === 0) {
        break;
      }
      reader.skipType(tag & 7);
    }
    return message;
  },

  create(base?: DeepPartial<OrgServiceResetProvisionTokenResponse>): OrgServiceResetProvisionTokenResponse {
    return OrgServiceResetProvisionTokenResponse.fromPartial(base ?? {});
  },

  fromPartial(object: DeepPartial<OrgServiceResetProvisionTokenResponse>): OrgServiceResetProvisionTokenResponse {
    const message = createBaseOrgServiceResetProvisionTokenResponse();
    message.token = object.token ?? "";
    return message;
  },
};

function createBaseOrgUser(): OrgUser {
  return { userId: "", orgId: "", name: "", email: "", roles: [], joinedAt: undefined };
}

export const OrgUser = {
  encode(message: OrgUser, writer: _m0.Writer = _m0.Writer.create()): _m0.Writer {
    if (message.userId !== "") {
      writer.uint32(10).string(message.userId);
    }
    if (message.orgId !== "") {
      writer.uint32(18).string(message.orgId);
    }
    if (message.name !== "") {
      writer.uint32(26).string(message.name);
    }
    if (message.email !== "") {
      writer.uint32(34).string(message.email);
    }
    for (const v of message.roles) {
      OrgRole.encode(v!, writer.uint32(42).fork()).ldelim();
    }
    if (message.joinedAt !== undefined) {
      Timestamp.encode(toTimestamp(message.joinedAt), writer.uint32(50).fork()).ldelim();
    }
    return writer;
  },

  decode(input: _m0.Reader | Uint8Array, length?: number): OrgUser {
    const reader = input instanceof _m0.Reader ? input : _m0.Reader.create(input);
    let end = length === undefined ? reader.len : reader.pos + length;
    const message = createBaseOrgUser();
    while (reader.pos < end) {
      const tag = reader.uint32();
      switch (tag >>> 3) {
        case 1:
          if (tag !== 10) {
            break;
          }

          message.userId = reader.string();
          continue;
        case 2:
          if (tag !== 18) {
            break;
          }

          message.orgId = reader.string();
          continue;
        case 3:
          if (tag !== 26) {
            break;
          }

          message.name = reader.string();
          continue;
        case 4:
          if (tag !== 34) {
            break;
          }

          message.email = reader.string();
          continue;
        case 5:
          if (tag !== 42) {
            break;
          }

          message.roles.push(OrgRole.decode(reader, reader.uint32()));
          continue;
        case 6:
          if (tag !== 50) {
            break;
          }

          message.joinedAt = fromTimestamp(Timestamp.decode(reader, reader.uint32()));
          continue;
      }
      if ((tag & 7) === 4 || tag === 0) {
        break;
      }
      reader.skipType(tag & 7);
    }
    return message;
  },

  create(base?: DeepPartial<OrgUser>): OrgUser {
    return OrgUser.fromPartial(base ?? {});
  },

  fromPartial(object: DeepPartial<OrgUser>): OrgUser {
    const message = createBaseOrgUser();
    message.userId = object.userId ?? "";
    message.orgId = object.orgId ?? "";
    message.name = object.name ?? "";
    message.email = object.email ?? "";
    message.roles = object.roles?.map((e) => OrgRole.fromPartial(e)) || [];
    message.joinedAt = object.joinedAt ?? undefined;
    return message;
  },
};

function createBaseOrgRole(): OrgRole {
  return { name: undefined };
}

export const OrgRole = {
  encode(message: OrgRole, writer: _m0.Writer = _m0.Writer.create()): _m0.Writer {
    if (message.name !== undefined) {
      writer.uint32(10).string(message.name);
    }
    return writer;
  },

  decode(input: _m0.Reader | Uint8Array, length?: number): OrgRole {
    const reader = input instanceof _m0.Reader ? input : _m0.Reader.create(input);
    let end = length === undefined ? reader.len : reader.pos + length;
    const message = createBaseOrgRole();
    while (reader.pos < end) {
      const tag = reader.uint32();
      switch (tag >>> 3) {
        case 1:
          if (tag !== 10) {
            break;
          }

          message.name = reader.string();
          continue;
      }
      if ((tag & 7) === 4 || tag === 0) {
        break;
      }
      reader.skipType(tag & 7);
    }
    return message;
  },

  create(base?: DeepPartial<OrgRole>): OrgRole {
    return OrgRole.fromPartial(base ?? {});
  },

  fromPartial(object: DeepPartial<OrgRole>): OrgRole {
    const message = createBaseOrgRole();
    message.name = object.name ?? undefined;
    return message;
  },
};

function createBaseOrgServiceInitCardRequest(): OrgServiceInitCardRequest {
  return { orgId: "", userId: "" };
}

export const OrgServiceInitCardRequest = {
  encode(message: OrgServiceInitCardRequest, writer: _m0.Writer = _m0.Writer.create()): _m0.Writer {
    if (message.orgId !== "") {
      writer.uint32(10).string(message.orgId);
    }
    if (message.userId !== "") {
      writer.uint32(18).string(message.userId);
    }
    return writer;
  },

  decode(input: _m0.Reader | Uint8Array, length?: number): OrgServiceInitCardRequest {
    const reader = input instanceof _m0.Reader ? input : _m0.Reader.create(input);
    let end = length === undefined ? reader.len : reader.pos + length;
    const message = createBaseOrgServiceInitCardRequest();
    while (reader.pos < end) {
      const tag = reader.uint32();
      switch (tag >>> 3) {
        case 1:
          if (tag !== 10) {
            break;
          }

          message.orgId = reader.string();
          continue;
        case 2:
          if (tag !== 18) {
            break;
          }

          message.userId = reader.string();
          continue;
      }
      if ((tag & 7) === 4 || tag === 0) {
        break;
      }
      reader.skipType(tag & 7);
    }
    return message;
  },

  create(base?: DeepPartial<OrgServiceInitCardRequest>): OrgServiceInitCardRequest {
    return OrgServiceInitCardRequest.fromPartial(base ?? {});
  },

  fromPartial(object: DeepPartial<OrgServiceInitCardRequest>): OrgServiceInitCardRequest {
    const message = createBaseOrgServiceInitCardRequest();
    message.orgId = object.orgId ?? "";
    message.userId = object.userId ?? "";
    return message;
  },
};

function createBaseOrgServiceInitCardResponse(): OrgServiceInitCardResponse {
  return { clientSecret: "" };
}

export const OrgServiceInitCardResponse = {
  encode(message: OrgServiceInitCardResponse, writer: _m0.Writer = _m0.Writer.create()): _m0.Writer {
    if (message.clientSecret !== "") {
      writer.uint32(10).string(message.clientSecret);
    }
    return writer;
  },

  decode(input: _m0.Reader | Uint8Array, length?: number): OrgServiceInitCardResponse {
    const reader = input instanceof _m0.Reader ? input : _m0.Reader.create(input);
    let end = length === undefined ? reader.len : reader.pos + length;
    const message = createBaseOrgServiceInitCardResponse();
    while (reader.pos < end) {
      const tag = reader.uint32();
      switch (tag >>> 3) {
        case 1:
          if (tag !== 10) {
            break;
          }

          message.clientSecret = reader.string();
          continue;
      }
      if ((tag & 7) === 4 || tag === 0) {
        break;
      }
      reader.skipType(tag & 7);
    }
    return message;
  },

  create(base?: DeepPartial<OrgServiceInitCardResponse>): OrgServiceInitCardResponse {
    return OrgServiceInitCardResponse.fromPartial(base ?? {});
  },

  fromPartial(object: DeepPartial<OrgServiceInitCardResponse>): OrgServiceInitCardResponse {
    const message = createBaseOrgServiceInitCardResponse();
    message.clientSecret = object.clientSecret ?? "";
    return message;
  },
};

function createBaseOrgServiceListPaymentMethodsRequest(): OrgServiceListPaymentMethodsRequest {
  return { orgId: "" };
}

export const OrgServiceListPaymentMethodsRequest = {
  encode(message: OrgServiceListPaymentMethodsRequest, writer: _m0.Writer = _m0.Writer.create()): _m0.Writer {
    if (message.orgId !== "") {
      writer.uint32(10).string(message.orgId);
    }
    return writer;
  },

  decode(input: _m0.Reader | Uint8Array, length?: number): OrgServiceListPaymentMethodsRequest {
    const reader = input instanceof _m0.Reader ? input : _m0.Reader.create(input);
    let end = length === undefined ? reader.len : reader.pos + length;
    const message = createBaseOrgServiceListPaymentMethodsRequest();
    while (reader.pos < end) {
      const tag = reader.uint32();
      switch (tag >>> 3) {
        case 1:
          if (tag !== 10) {
            break;
          }

          message.orgId = reader.string();
          continue;
      }
      if ((tag & 7) === 4 || tag === 0) {
        break;
      }
      reader.skipType(tag & 7);
    }
    return message;
  },

  create(base?: DeepPartial<OrgServiceListPaymentMethodsRequest>): OrgServiceListPaymentMethodsRequest {
    return OrgServiceListPaymentMethodsRequest.fromPartial(base ?? {});
  },

  fromPartial(object: DeepPartial<OrgServiceListPaymentMethodsRequest>): OrgServiceListPaymentMethodsRequest {
    const message = createBaseOrgServiceListPaymentMethodsRequest();
    message.orgId = object.orgId ?? "";
    return message;
  },
};

function createBaseOrgServiceListPaymentMethodsResponse(): OrgServiceListPaymentMethodsResponse {
  return { methods: [] };
}

export const OrgServiceListPaymentMethodsResponse = {
  encode(message: OrgServiceListPaymentMethodsResponse, writer: _m0.Writer = _m0.Writer.create()): _m0.Writer {
    for (const v of message.methods) {
      PaymentMethod.encode(v!, writer.uint32(10).fork()).ldelim();
    }
    return writer;
  },

  decode(input: _m0.Reader | Uint8Array, length?: number): OrgServiceListPaymentMethodsResponse {
    const reader = input instanceof _m0.Reader ? input : _m0.Reader.create(input);
    let end = length === undefined ? reader.len : reader.pos + length;
    const message = createBaseOrgServiceListPaymentMethodsResponse();
    while (reader.pos < end) {
      const tag = reader.uint32();
      switch (tag >>> 3) {
        case 1:
          if (tag !== 10) {
            break;
          }

          message.methods.push(PaymentMethod.decode(reader, reader.uint32()));
          continue;
      }
      if ((tag & 7) === 4 || tag === 0) {
        break;
      }
      reader.skipType(tag & 7);
    }
    return message;
  },

  create(base?: DeepPartial<OrgServiceListPaymentMethodsResponse>): OrgServiceListPaymentMethodsResponse {
    return OrgServiceListPaymentMethodsResponse.fromPartial(base ?? {});
  },

  fromPartial(object: DeepPartial<OrgServiceListPaymentMethodsResponse>): OrgServiceListPaymentMethodsResponse {
    const message = createBaseOrgServiceListPaymentMethodsResponse();
    message.methods = object.methods?.map((e) => PaymentMethod.fromPartial(e)) || [];
    return message;
  },
};

function createBasePaymentMethod(): PaymentMethod {
  return { orgId: undefined, userId: undefined, createdAt: undefined, updatedAt: undefined, card: undefined };
}

export const PaymentMethod = {
  encode(message: PaymentMethod, writer: _m0.Writer = _m0.Writer.create()): _m0.Writer {
    if (message.orgId !== undefined) {
      writer.uint32(18).string(message.orgId);
    }
    if (message.userId !== undefined) {
      writer.uint32(26).string(message.userId);
    }
    if (message.createdAt !== undefined) {
      Timestamp.encode(toTimestamp(message.createdAt), writer.uint32(42).fork()).ldelim();
    }
    if (message.updatedAt !== undefined) {
      Timestamp.encode(toTimestamp(message.updatedAt), writer.uint32(50).fork()).ldelim();
    }
    if (message.card !== undefined) {
      Card.encode(message.card, writer.uint32(58).fork()).ldelim();
    }
    return writer;
  },

  decode(input: _m0.Reader | Uint8Array, length?: number): PaymentMethod {
    const reader = input instanceof _m0.Reader ? input : _m0.Reader.create(input);
    let end = length === undefined ? reader.len : reader.pos + length;
    const message = createBasePaymentMethod();
    while (reader.pos < end) {
      const tag = reader.uint32();
      switch (tag >>> 3) {
        case 2:
          if (tag !== 18) {
            break;
          }

          message.orgId = reader.string();
          continue;
        case 3:
          if (tag !== 26) {
            break;
          }

          message.userId = reader.string();
          continue;
        case 5:
          if (tag !== 42) {
            break;
          }

          message.createdAt = fromTimestamp(Timestamp.decode(reader, reader.uint32()));
          continue;
        case 6:
          if (tag !== 50) {
            break;
          }

          message.updatedAt = fromTimestamp(Timestamp.decode(reader, reader.uint32()));
          continue;
        case 7:
          if (tag !== 58) {
            break;
          }

          message.card = Card.decode(reader, reader.uint32());
          continue;
      }
      if ((tag & 7) === 4 || tag === 0) {
        break;
      }
      reader.skipType(tag & 7);
    }
    return message;
  },

  create(base?: DeepPartial<PaymentMethod>): PaymentMethod {
    return PaymentMethod.fromPartial(base ?? {});
  },

  fromPartial(object: DeepPartial<PaymentMethod>): PaymentMethod {
    const message = createBasePaymentMethod();
    message.orgId = object.orgId ?? undefined;
    message.userId = object.userId ?? undefined;
    message.createdAt = object.createdAt ?? undefined;
    message.updatedAt = object.updatedAt ?? undefined;
    message.card = (object.card !== undefined && object.card !== null) ? Card.fromPartial(object.card) : undefined;
    return message;
  },
};

function createBaseCard(): Card {
  return { brand: "", expMonth: 0, expYear: 0, last4: "" };
}

export const Card = {
  encode(message: Card, writer: _m0.Writer = _m0.Writer.create()): _m0.Writer {
    if (message.brand !== "") {
      writer.uint32(10).string(message.brand);
    }
    if (message.expMonth !== 0) {
      writer.uint32(16).int64(message.expMonth);
    }
    if (message.expYear !== 0) {
      writer.uint32(24).int64(message.expYear);
    }
    if (message.last4 !== "") {
      writer.uint32(34).string(message.last4);
    }
    return writer;
  },

  decode(input: _m0.Reader | Uint8Array, length?: number): Card {
    const reader = input instanceof _m0.Reader ? input : _m0.Reader.create(input);
    let end = length === undefined ? reader.len : reader.pos + length;
    const message = createBaseCard();
    while (reader.pos < end) {
      const tag = reader.uint32();
      switch (tag >>> 3) {
        case 1:
          if (tag !== 10) {
            break;
          }

          message.brand = reader.string();
          continue;
        case 2:
          if (tag !== 16) {
            break;
          }

          message.expMonth = longToNumber(reader.int64() as Long);
          continue;
        case 3:
          if (tag !== 24) {
            break;
          }

          message.expYear = longToNumber(reader.int64() as Long);
          continue;
        case 4:
          if (tag !== 34) {
            break;
          }

          message.last4 = reader.string();
          continue;
      }
      if ((tag & 7) === 4 || tag === 0) {
        break;
      }
      reader.skipType(tag & 7);
    }
    return message;
  },

  create(base?: DeepPartial<Card>): Card {
    return Card.fromPartial(base ?? {});
  },

  fromPartial(object: DeepPartial<Card>): Card {
    const message = createBaseCard();
    message.brand = object.brand ?? "";
    message.expMonth = object.expMonth ?? 0;
    message.expYear = object.expYear ?? 0;
    message.last4 = object.last4 ?? "";
    return message;
  },
};

function createBaseOrgServiceBillingDetailsRequest(): OrgServiceBillingDetailsRequest {
  return { orgId: "" };
}

export const OrgServiceBillingDetailsRequest = {
  encode(message: OrgServiceBillingDetailsRequest, writer: _m0.Writer = _m0.Writer.create()): _m0.Writer {
    if (message.orgId !== "") {
      writer.uint32(10).string(message.orgId);
    }
    return writer;
  },

  decode(input: _m0.Reader | Uint8Array, length?: number): OrgServiceBillingDetailsRequest {
    const reader = input instanceof _m0.Reader ? input : _m0.Reader.create(input);
    let end = length === undefined ? reader.len : reader.pos + length;
    const message = createBaseOrgServiceBillingDetailsRequest();
    while (reader.pos < end) {
      const tag = reader.uint32();
      switch (tag >>> 3) {
        case 1:
          if (tag !== 10) {
            break;
          }

          message.orgId = reader.string();
          continue;
      }
      if ((tag & 7) === 4 || tag === 0) {
        break;
      }
      reader.skipType(tag & 7);
    }
    return message;
  },

  create(base?: DeepPartial<OrgServiceBillingDetailsRequest>): OrgServiceBillingDetailsRequest {
    return OrgServiceBillingDetailsRequest.fromPartial(base ?? {});
  },

  fromPartial(object: DeepPartial<OrgServiceBillingDetailsRequest>): OrgServiceBillingDetailsRequest {
    const message = createBaseOrgServiceBillingDetailsRequest();
    message.orgId = object.orgId ?? "";
    return message;
  },
};

function createBaseOrgServiceBillingDetailsResponse(): OrgServiceBillingDetailsResponse {
  return {
    currency: 0,
    currentPeriodStart: undefined,
    currentPeriodEnd: undefined,
    defaultPaymentMethod: undefined,
    createdAt: undefined,
    status: "",
    items: [],
  };
}

export const OrgServiceBillingDetailsResponse = {
  encode(message: OrgServiceBillingDetailsResponse, writer: _m0.Writer = _m0.Writer.create()): _m0.Writer {
    if (message.currency !== 0) {
      writer.uint32(8).int32(message.currency);
    }
    if (message.currentPeriodStart !== undefined) {
      Timestamp.encode(toTimestamp(message.currentPeriodStart), writer.uint32(18).fork()).ldelim();
    }
    if (message.currentPeriodEnd !== undefined) {
      Timestamp.encode(toTimestamp(message.currentPeriodEnd), writer.uint32(26).fork()).ldelim();
    }
    if (message.defaultPaymentMethod !== undefined) {
      writer.uint32(34).string(message.defaultPaymentMethod);
    }
    if (message.createdAt !== undefined) {
      Timestamp.encode(toTimestamp(message.createdAt), writer.uint32(42).fork()).ldelim();
    }
    if (message.status !== "") {
      writer.uint32(58).string(message.status);
    }
    for (const v of message.items) {
      BillingItem.encode(v!, writer.uint32(66).fork()).ldelim();
    }
    return writer;
  },

  decode(input: _m0.Reader | Uint8Array, length?: number): OrgServiceBillingDetailsResponse {
    const reader = input instanceof _m0.Reader ? input : _m0.Reader.create(input);
    let end = length === undefined ? reader.len : reader.pos + length;
    const message = createBaseOrgServiceBillingDetailsResponse();
    while (reader.pos < end) {
      const tag = reader.uint32();
      switch (tag >>> 3) {
        case 1:
          if (tag !== 8) {
            break;
          }

          message.currency = reader.int32() as any;
          continue;
        case 2:
          if (tag !== 18) {
            break;
          }

          message.currentPeriodStart = fromTimestamp(Timestamp.decode(reader, reader.uint32()));
          continue;
        case 3:
          if (tag !== 26) {
            break;
          }

          message.currentPeriodEnd = fromTimestamp(Timestamp.decode(reader, reader.uint32()));
          continue;
        case 4:
          if (tag !== 34) {
            break;
          }

          message.defaultPaymentMethod = reader.string();
          continue;
        case 5:
          if (tag !== 42) {
            break;
          }

          message.createdAt = fromTimestamp(Timestamp.decode(reader, reader.uint32()));
          continue;
        case 7:
          if (tag !== 58) {
            break;
          }

          message.status = reader.string();
          continue;
        case 8:
          if (tag !== 66) {
            break;
          }

          message.items.push(BillingItem.decode(reader, reader.uint32()));
          continue;
      }
      if ((tag & 7) === 4 || tag === 0) {
        break;
      }
      reader.skipType(tag & 7);
    }
    return message;
  },

  create(base?: DeepPartial<OrgServiceBillingDetailsResponse>): OrgServiceBillingDetailsResponse {
    return OrgServiceBillingDetailsResponse.fromPartial(base ?? {});
  },

  fromPartial(object: DeepPartial<OrgServiceBillingDetailsResponse>): OrgServiceBillingDetailsResponse {
    const message = createBaseOrgServiceBillingDetailsResponse();
    message.currency = object.currency ?? 0;
    message.currentPeriodStart = object.currentPeriodStart ?? undefined;
    message.currentPeriodEnd = object.currentPeriodEnd ?? undefined;
    message.defaultPaymentMethod = object.defaultPaymentMethod ?? undefined;
    message.createdAt = object.createdAt ?? undefined;
    message.status = object.status ?? "";
    message.items = object.items?.map((e) => BillingItem.fromPartial(e)) || [];
    return message;
  },
};

function createBaseBillingItem(): BillingItem {
  return { name: undefined, unitAmount: undefined, quantity: undefined };
}

export const BillingItem = {
  encode(message: BillingItem, writer: _m0.Writer = _m0.Writer.create()): _m0.Writer {
    if (message.name !== undefined) {
      writer.uint32(10).string(message.name);
    }
    if (message.unitAmount !== undefined) {
      writer.uint32(16).int64(message.unitAmount);
    }
    if (message.quantity !== undefined) {
      writer.uint32(24).uint64(message.quantity);
    }
    return writer;
  },

  decode(input: _m0.Reader | Uint8Array, length?: number): BillingItem {
    const reader = input instanceof _m0.Reader ? input : _m0.Reader.create(input);
    let end = length === undefined ? reader.len : reader.pos + length;
    const message = createBaseBillingItem();
    while (reader.pos < end) {
      const tag = reader.uint32();
      switch (tag >>> 3) {
        case 1:
          if (tag !== 10) {
            break;
          }

          message.name = reader.string();
          continue;
        case 2:
          if (tag !== 16) {
            break;
          }

          message.unitAmount = longToNumber(reader.int64() as Long);
          continue;
        case 3:
          if (tag !== 24) {
            break;
          }

          message.quantity = longToNumber(reader.uint64() as Long);
          continue;
      }
      if ((tag & 7) === 4 || tag === 0) {
        break;
      }
      reader.skipType(tag & 7);
    }
    return message;
  },

  create(base?: DeepPartial<BillingItem>): BillingItem {
    return BillingItem.fromPartial(base ?? {});
  },

  fromPartial(object: DeepPartial<BillingItem>): BillingItem {
    const message = createBaseBillingItem();
    message.name = object.name ?? undefined;
    message.unitAmount = object.unitAmount ?? undefined;
    message.quantity = object.quantity ?? undefined;
    return message;
  },
};

function createBaseOrgServiceGetAddressRequest(): OrgServiceGetAddressRequest {
  return { orgId: "" };
}

export const OrgServiceGetAddressRequest = {
  encode(message: OrgServiceGetAddressRequest, writer: _m0.Writer = _m0.Writer.create()): _m0.Writer {
    if (message.orgId !== "") {
      writer.uint32(10).string(message.orgId);
    }
    return writer;
  },

  decode(input: _m0.Reader | Uint8Array, length?: number): OrgServiceGetAddressRequest {
    const reader = input instanceof _m0.Reader ? input : _m0.Reader.create(input);
    let end = length === undefined ? reader.len : reader.pos + length;
    const message = createBaseOrgServiceGetAddressRequest();
    while (reader.pos < end) {
      const tag = reader.uint32();
      switch (tag >>> 3) {
        case 1:
          if (tag !== 10) {
            break;
          }

          message.orgId = reader.string();
          continue;
      }
      if ((tag & 7) === 4 || tag === 0) {
        break;
      }
      reader.skipType(tag & 7);
    }
    return message;
  },

  create(base?: DeepPartial<OrgServiceGetAddressRequest>): OrgServiceGetAddressRequest {
    return OrgServiceGetAddressRequest.fromPartial(base ?? {});
  },

  fromPartial(object: DeepPartial<OrgServiceGetAddressRequest>): OrgServiceGetAddressRequest {
    const message = createBaseOrgServiceGetAddressRequest();
    message.orgId = object.orgId ?? "";
    return message;
  },
};

function createBaseOrgServiceGetAddressResponse(): OrgServiceGetAddressResponse {
  return { address: undefined };
}

export const OrgServiceGetAddressResponse = {
  encode(message: OrgServiceGetAddressResponse, writer: _m0.Writer = _m0.Writer.create()): _m0.Writer {
    if (message.address !== undefined) {
      Address.encode(message.address, writer.uint32(10).fork()).ldelim();
    }
    return writer;
  },

  decode(input: _m0.Reader | Uint8Array, length?: number): OrgServiceGetAddressResponse {
    const reader = input instanceof _m0.Reader ? input : _m0.Reader.create(input);
    let end = length === undefined ? reader.len : reader.pos + length;
    const message = createBaseOrgServiceGetAddressResponse();
    while (reader.pos < end) {
      const tag = reader.uint32();
      switch (tag >>> 3) {
        case 1:
          if (tag !== 10) {
            break;
          }

          message.address = Address.decode(reader, reader.uint32());
          continue;
      }
      if ((tag & 7) === 4 || tag === 0) {
        break;
      }
      reader.skipType(tag & 7);
    }
    return message;
  },

  create(base?: DeepPartial<OrgServiceGetAddressResponse>): OrgServiceGetAddressResponse {
    return OrgServiceGetAddressResponse.fromPartial(base ?? {});
  },

  fromPartial(object: DeepPartial<OrgServiceGetAddressResponse>): OrgServiceGetAddressResponse {
    const message = createBaseOrgServiceGetAddressResponse();
    message.address = (object.address !== undefined && object.address !== null)
      ? Address.fromPartial(object.address)
      : undefined;
    return message;
  },
};

function createBaseOrgServiceSetAddressRequest(): OrgServiceSetAddressRequest {
  return { orgId: "", address: undefined };
}

export const OrgServiceSetAddressRequest = {
  encode(message: OrgServiceSetAddressRequest, writer: _m0.Writer = _m0.Writer.create()): _m0.Writer {
    if (message.orgId !== "") {
      writer.uint32(10).string(message.orgId);
    }
    if (message.address !== undefined) {
      Address.encode(message.address, writer.uint32(18).fork()).ldelim();
    }
    return writer;
  },

  decode(input: _m0.Reader | Uint8Array, length?: number): OrgServiceSetAddressRequest {
    const reader = input instanceof _m0.Reader ? input : _m0.Reader.create(input);
    let end = length === undefined ? reader.len : reader.pos + length;
    const message = createBaseOrgServiceSetAddressRequest();
    while (reader.pos < end) {
      const tag = reader.uint32();
      switch (tag >>> 3) {
        case 1:
          if (tag !== 10) {
            break;
          }

          message.orgId = reader.string();
          continue;
        case 2:
          if (tag !== 18) {
            break;
          }

          message.address = Address.decode(reader, reader.uint32());
          continue;
      }
      if ((tag & 7) === 4 || tag === 0) {
        break;
      }
      reader.skipType(tag & 7);
    }
    return message;
  },

  create(base?: DeepPartial<OrgServiceSetAddressRequest>): OrgServiceSetAddressRequest {
    return OrgServiceSetAddressRequest.fromPartial(base ?? {});
  },

  fromPartial(object: DeepPartial<OrgServiceSetAddressRequest>): OrgServiceSetAddressRequest {
    const message = createBaseOrgServiceSetAddressRequest();
    message.orgId = object.orgId ?? "";
    message.address = (object.address !== undefined && object.address !== null)
      ? Address.fromPartial(object.address)
      : undefined;
    return message;
  },
};

function createBaseOrgServiceSetAddressResponse(): OrgServiceSetAddressResponse {
  return {};
}

export const OrgServiceSetAddressResponse = {
  encode(_: OrgServiceSetAddressResponse, writer: _m0.Writer = _m0.Writer.create()): _m0.Writer {
    return writer;
  },

  decode(input: _m0.Reader | Uint8Array, length?: number): OrgServiceSetAddressResponse {
    const reader = input instanceof _m0.Reader ? input : _m0.Reader.create(input);
    let end = length === undefined ? reader.len : reader.pos + length;
    const message = createBaseOrgServiceSetAddressResponse();
    while (reader.pos < end) {
      const tag = reader.uint32();
      switch (tag >>> 3) {
      }
      if ((tag & 7) === 4 || tag === 0) {
        break;
      }
      reader.skipType(tag & 7);
    }
    return message;
  },

  create(base?: DeepPartial<OrgServiceSetAddressResponse>): OrgServiceSetAddressResponse {
    return OrgServiceSetAddressResponse.fromPartial(base ?? {});
  },

  fromPartial(_: DeepPartial<OrgServiceSetAddressResponse>): OrgServiceSetAddressResponse {
    const message = createBaseOrgServiceSetAddressResponse();
    return message;
  },
};

function createBaseOrgServiceDeleteAddressRequest(): OrgServiceDeleteAddressRequest {
  return { orgId: "" };
}

export const OrgServiceDeleteAddressRequest = {
  encode(message: OrgServiceDeleteAddressRequest, writer: _m0.Writer = _m0.Writer.create()): _m0.Writer {
    if (message.orgId !== "") {
      writer.uint32(10).string(message.orgId);
    }
    return writer;
  },

  decode(input: _m0.Reader | Uint8Array, length?: number): OrgServiceDeleteAddressRequest {
    const reader = input instanceof _m0.Reader ? input : _m0.Reader.create(input);
    let end = length === undefined ? reader.len : reader.pos + length;
    const message = createBaseOrgServiceDeleteAddressRequest();
    while (reader.pos < end) {
      const tag = reader.uint32();
      switch (tag >>> 3) {
        case 1:
          if (tag !== 10) {
            break;
          }

          message.orgId = reader.string();
          continue;
      }
      if ((tag & 7) === 4 || tag === 0) {
        break;
      }
      reader.skipType(tag & 7);
    }
    return message;
  },

  create(base?: DeepPartial<OrgServiceDeleteAddressRequest>): OrgServiceDeleteAddressRequest {
    return OrgServiceDeleteAddressRequest.fromPartial(base ?? {});
  },

  fromPartial(object: DeepPartial<OrgServiceDeleteAddressRequest>): OrgServiceDeleteAddressRequest {
    const message = createBaseOrgServiceDeleteAddressRequest();
    message.orgId = object.orgId ?? "";
    return message;
  },
};

function createBaseOrgServiceDeleteAddressResponse(): OrgServiceDeleteAddressResponse {
  return {};
}

export const OrgServiceDeleteAddressResponse = {
  encode(_: OrgServiceDeleteAddressResponse, writer: _m0.Writer = _m0.Writer.create()): _m0.Writer {
    return writer;
  },

  decode(input: _m0.Reader | Uint8Array, length?: number): OrgServiceDeleteAddressResponse {
    const reader = input instanceof _m0.Reader ? input : _m0.Reader.create(input);
    let end = length === undefined ? reader.len : reader.pos + length;
    const message = createBaseOrgServiceDeleteAddressResponse();
    while (reader.pos < end) {
      const tag = reader.uint32();
      switch (tag >>> 3) {
      }
      if ((tag & 7) === 4 || tag === 0) {
        break;
      }
      reader.skipType(tag & 7);
    }
    return message;
  },

  create(base?: DeepPartial<OrgServiceDeleteAddressResponse>): OrgServiceDeleteAddressResponse {
    return OrgServiceDeleteAddressResponse.fromPartial(base ?? {});
  },

  fromPartial(_: DeepPartial<OrgServiceDeleteAddressResponse>): OrgServiceDeleteAddressResponse {
    const message = createBaseOrgServiceDeleteAddressResponse();
    return message;
  },
};

function createBaseOrgServiceGetInvoicesRequest(): OrgServiceGetInvoicesRequest {
  return { orgId: "" };
}

export const OrgServiceGetInvoicesRequest = {
  encode(message: OrgServiceGetInvoicesRequest, writer: _m0.Writer = _m0.Writer.create()): _m0.Writer {
    if (message.orgId !== "") {
      writer.uint32(10).string(message.orgId);
    }
    return writer;
  },

  decode(input: _m0.Reader | Uint8Array, length?: number): OrgServiceGetInvoicesRequest {
    const reader = input instanceof _m0.Reader ? input : _m0.Reader.create(input);
    let end = length === undefined ? reader.len : reader.pos + length;
    const message = createBaseOrgServiceGetInvoicesRequest();
    while (reader.pos < end) {
      const tag = reader.uint32();
      switch (tag >>> 3) {
        case 1:
          if (tag !== 10) {
            break;
          }

          message.orgId = reader.string();
          continue;
      }
      if ((tag & 7) === 4 || tag === 0) {
        break;
      }
      reader.skipType(tag & 7);
    }
    return message;
  },

  create(base?: DeepPartial<OrgServiceGetInvoicesRequest>): OrgServiceGetInvoicesRequest {
    return OrgServiceGetInvoicesRequest.fromPartial(base ?? {});
  },

  fromPartial(object: DeepPartial<OrgServiceGetInvoicesRequest>): OrgServiceGetInvoicesRequest {
    const message = createBaseOrgServiceGetInvoicesRequest();
    message.orgId = object.orgId ?? "";
    return message;
  },
};

function createBaseOrgServiceGetInvoicesResponse(): OrgServiceGetInvoicesResponse {
  return { invoices: [] };
}

export const OrgServiceGetInvoicesResponse = {
  encode(message: OrgServiceGetInvoicesResponse, writer: _m0.Writer = _m0.Writer.create()): _m0.Writer {
    for (const v of message.invoices) {
      Invoice.encode(v!, writer.uint32(10).fork()).ldelim();
    }
    return writer;
  },

  decode(input: _m0.Reader | Uint8Array, length?: number): OrgServiceGetInvoicesResponse {
    const reader = input instanceof _m0.Reader ? input : _m0.Reader.create(input);
    let end = length === undefined ? reader.len : reader.pos + length;
    const message = createBaseOrgServiceGetInvoicesResponse();
    while (reader.pos < end) {
      const tag = reader.uint32();
      switch (tag >>> 3) {
        case 1:
          if (tag !== 10) {
            break;
          }

          message.invoices.push(Invoice.decode(reader, reader.uint32()));
          continue;
      }
      if ((tag & 7) === 4 || tag === 0) {
        break;
      }
      reader.skipType(tag & 7);
    }
    return message;
  },

  create(base?: DeepPartial<OrgServiceGetInvoicesResponse>): OrgServiceGetInvoicesResponse {
    return OrgServiceGetInvoicesResponse.fromPartial(base ?? {});
  },

  fromPartial(object: DeepPartial<OrgServiceGetInvoicesResponse>): OrgServiceGetInvoicesResponse {
    const message = createBaseOrgServiceGetInvoicesResponse();
    message.invoices = object.invoices?.map((e) => Invoice.fromPartial(e)) || [];
    return message;
  },
};

function createBaseInvoice(): Invoice {
  return {
    number: undefined,
    createdAt: undefined,
    discount: undefined,
    pdfUrl: undefined,
    lineItems: [],
    status: undefined,
    subtotal: undefined,
    total: undefined,
  };
}

export const Invoice = {
  encode(message: Invoice, writer: _m0.Writer = _m0.Writer.create()): _m0.Writer {
    if (message.number !== undefined) {
      writer.uint32(10).string(message.number);
    }
    if (message.createdAt !== undefined) {
      Timestamp.encode(toTimestamp(message.createdAt), writer.uint32(18).fork()).ldelim();
    }
    if (message.discount !== undefined) {
      Discount.encode(message.discount, writer.uint32(26).fork()).ldelim();
    }
    if (message.pdfUrl !== undefined) {
      writer.uint32(34).string(message.pdfUrl);
    }
    for (const v of message.lineItems) {
      LineItem.encode(v!, writer.uint32(42).fork()).ldelim();
    }
    if (message.status !== undefined) {
      writer.uint32(48).int32(message.status);
    }
    if (message.subtotal !== undefined) {
      writer.uint32(56).int64(message.subtotal);
    }
    if (message.total !== undefined) {
      writer.uint32(64).int64(message.total);
    }
    return writer;
  },

  decode(input: _m0.Reader | Uint8Array, length?: number): Invoice {
    const reader = input instanceof _m0.Reader ? input : _m0.Reader.create(input);
    let end = length === undefined ? reader.len : reader.pos + length;
    const message = createBaseInvoice();
    while (reader.pos < end) {
      const tag = reader.uint32();
      switch (tag >>> 3) {
        case 1:
          if (tag !== 10) {
            break;
          }

          message.number = reader.string();
          continue;
        case 2:
          if (tag !== 18) {
            break;
          }

          message.createdAt = fromTimestamp(Timestamp.decode(reader, reader.uint32()));
          continue;
        case 3:
          if (tag !== 26) {
            break;
          }

          message.discount = Discount.decode(reader, reader.uint32());
          continue;
        case 4:
          if (tag !== 34) {
            break;
          }

          message.pdfUrl = reader.string();
          continue;
        case 5:
          if (tag !== 42) {
            break;
          }

          message.lineItems.push(LineItem.decode(reader, reader.uint32()));
          continue;
        case 6:
          if (tag !== 48) {
            break;
          }

          message.status = reader.int32() as any;
          continue;
        case 7:
          if (tag !== 56) {
            break;
          }

          message.subtotal = longToNumber(reader.int64() as Long);
          continue;
        case 8:
          if (tag !== 64) {
            break;
          }

          message.total = longToNumber(reader.int64() as Long);
          continue;
      }
      if ((tag & 7) === 4 || tag === 0) {
        break;
      }
      reader.skipType(tag & 7);
    }
    return message;
  },

  create(base?: DeepPartial<Invoice>): Invoice {
    return Invoice.fromPartial(base ?? {});
  },

  fromPartial(object: DeepPartial<Invoice>): Invoice {
    const message = createBaseInvoice();
    message.number = object.number ?? undefined;
    message.createdAt = object.createdAt ?? undefined;
    message.discount = (object.discount !== undefined && object.discount !== null)
      ? Discount.fromPartial(object.discount)
      : undefined;
    message.pdfUrl = object.pdfUrl ?? undefined;
    message.lineItems = object.lineItems?.map((e) => LineItem.fromPartial(e)) || [];
    message.status = object.status ?? undefined;
    message.subtotal = object.subtotal ?? undefined;
    message.total = object.total ?? undefined;
    return message;
  },
};

function createBaseDiscount(): Discount {
  return { name: undefined };
}

export const Discount = {
  encode(message: Discount, writer: _m0.Writer = _m0.Writer.create()): _m0.Writer {
    if (message.name !== undefined) {
      writer.uint32(10).string(message.name);
    }
    return writer;
  },

  decode(input: _m0.Reader | Uint8Array, length?: number): Discount {
    const reader = input instanceof _m0.Reader ? input : _m0.Reader.create(input);
    let end = length === undefined ? reader.len : reader.pos + length;
    const message = createBaseDiscount();
    while (reader.pos < end) {
      const tag = reader.uint32();
      switch (tag >>> 3) {
        case 1:
          if (tag !== 10) {
            break;
          }

          message.name = reader.string();
          continue;
      }
      if ((tag & 7) === 4 || tag === 0) {
        break;
      }
      reader.skipType(tag & 7);
    }
    return message;
  },

  create(base?: DeepPartial<Discount>): Discount {
    return Discount.fromPartial(base ?? {});
  },

  fromPartial(object: DeepPartial<Discount>): Discount {
    const message = createBaseDiscount();
    message.name = object.name ?? undefined;
    return message;
  },
};

function createBaseLineItem(): LineItem {
  return {
    subtotal: 0,
    total: undefined,
    description: undefined,
    start: undefined,
    end: undefined,
    plan: undefined,
    proration: false,
    quantity: undefined,
    discounts: [],
  };
}

export const LineItem = {
  encode(message: LineItem, writer: _m0.Writer = _m0.Writer.create()): _m0.Writer {
    if (message.subtotal !== 0) {
      writer.uint32(8).int64(message.subtotal);
    }
    if (message.total !== undefined) {
      writer.uint32(16).int64(message.total);
    }
    if (message.description !== undefined) {
      writer.uint32(26).string(message.description);
    }
    if (message.start !== undefined) {
      Timestamp.encode(toTimestamp(message.start), writer.uint32(34).fork()).ldelim();
    }
    if (message.end !== undefined) {
      Timestamp.encode(toTimestamp(message.end), writer.uint32(42).fork()).ldelim();
    }
    if (message.plan !== undefined) {
      writer.uint32(50).string(message.plan);
    }
    if (message.proration === true) {
      writer.uint32(56).bool(message.proration);
    }
    if (message.quantity !== undefined) {
      writer.uint32(64).uint64(message.quantity);
    }
    for (const v of message.discounts) {
      LineItemDiscount.encode(v!, writer.uint32(74).fork()).ldelim();
    }
    return writer;
  },

  decode(input: _m0.Reader | Uint8Array, length?: number): LineItem {
    const reader = input instanceof _m0.Reader ? input : _m0.Reader.create(input);
    let end = length === undefined ? reader.len : reader.pos + length;
    const message = createBaseLineItem();
    while (reader.pos < end) {
      const tag = reader.uint32();
      switch (tag >>> 3) {
        case 1:
          if (tag !== 8) {
            break;
          }

          message.subtotal = longToNumber(reader.int64() as Long);
          continue;
        case 2:
          if (tag !== 16) {
            break;
          }

          message.total = longToNumber(reader.int64() as Long);
          continue;
        case 3:
          if (tag !== 26) {
            break;
          }

          message.description = reader.string();
          continue;
        case 4:
          if (tag !== 34) {
            break;
          }

          message.start = fromTimestamp(Timestamp.decode(reader, reader.uint32()));
          continue;
        case 5:
          if (tag !== 42) {
            break;
          }

          message.end = fromTimestamp(Timestamp.decode(reader, reader.uint32()));
          continue;
        case 6:
          if (tag !== 50) {
            break;
          }

          message.plan = reader.string();
          continue;
        case 7:
          if (tag !== 56) {
            break;
          }

          message.proration = reader.bool();
          continue;
        case 8:
          if (tag !== 64) {
            break;
          }

          message.quantity = longToNumber(reader.uint64() as Long);
          continue;
        case 9:
          if (tag !== 74) {
            break;
          }

          message.discounts.push(LineItemDiscount.decode(reader, reader.uint32()));
          continue;
      }
      if ((tag & 7) === 4 || tag === 0) {
        break;
      }
      reader.skipType(tag & 7);
    }
    return message;
  },

  create(base?: DeepPartial<LineItem>): LineItem {
    return LineItem.fromPartial(base ?? {});
  },

  fromPartial(object: DeepPartial<LineItem>): LineItem {
    const message = createBaseLineItem();
    message.subtotal = object.subtotal ?? 0;
    message.total = object.total ?? undefined;
    message.description = object.description ?? undefined;
    message.start = object.start ?? undefined;
    message.end = object.end ?? undefined;
    message.plan = object.plan ?? undefined;
    message.proration = object.proration ?? false;
    message.quantity = object.quantity ?? undefined;
    message.discounts = object.discounts?.map((e) => LineItemDiscount.fromPartial(e)) || [];
    return message;
  },
};

function createBaseLineItemDiscount(): LineItemDiscount {
  return { name: undefined, amount: undefined };
}

export const LineItemDiscount = {
  encode(message: LineItemDiscount, writer: _m0.Writer = _m0.Writer.create()): _m0.Writer {
    if (message.name !== undefined) {
      writer.uint32(10).string(message.name);
    }
    if (message.amount !== undefined) {
      Amount.encode(message.amount, writer.uint32(18).fork()).ldelim();
    }
    return writer;
  },

  decode(input: _m0.Reader | Uint8Array, length?: number): LineItemDiscount {
    const reader = input instanceof _m0.Reader ? input : _m0.Reader.create(input);
    let end = length === undefined ? reader.len : reader.pos + length;
    const message = createBaseLineItemDiscount();
    while (reader.pos < end) {
      const tag = reader.uint32();
      switch (tag >>> 3) {
        case 1:
          if (tag !== 10) {
            break;
          }

          message.name = reader.string();
          continue;
        case 2:
          if (tag !== 18) {
            break;
          }

          message.amount = Amount.decode(reader, reader.uint32());
          continue;
      }
      if ((tag & 7) === 4 || tag === 0) {
        break;
      }
      reader.skipType(tag & 7);
    }
    return message;
  },

  create(base?: DeepPartial<LineItemDiscount>): LineItemDiscount {
    return LineItemDiscount.fromPartial(base ?? {});
  },

  fromPartial(object: DeepPartial<LineItemDiscount>): LineItemDiscount {
    const message = createBaseLineItemDiscount();
    message.name = object.name ?? undefined;
    message.amount = (object.amount !== undefined && object.amount !== null)
      ? Amount.fromPartial(object.amount)
      : undefined;
    return message;
  },
};

/** Service for managing organizations. */
export type OrgServiceDefinition = typeof OrgServiceDefinition;
export const OrgServiceDefinition = {
  name: "OrgService",
  fullName: "blockjoy.v1.OrgService",
  methods: {
    /** Get all the organizations for a user. */
    get: {
      name: "Get",
      requestType: OrgServiceGetRequest,
      requestStream: false,
      responseType: OrgServiceGetResponse,
      responseStream: false,
      options: {},
    },
    /** List all members of orgs matching a set of criteria. */
    list: {
      name: "List",
      requestType: OrgServiceListRequest,
      requestStream: false,
      responseType: OrgServiceListResponse,
      responseStream: false,
      options: {},
    },
    /** Create a new organization. */
    create: {
      name: "Create",
      requestType: OrgServiceCreateRequest,
      requestStream: false,
      responseType: OrgServiceCreateResponse,
      responseStream: false,
      options: {},
    },
    /** Update an existing organization. */
    update: {
      name: "Update",
      requestType: OrgServiceUpdateRequest,
      requestStream: false,
      responseType: OrgServiceUpdateResponse,
      responseStream: false,
      options: {},
    },
    /** Mark an organization as deleted. */
    delete: {
      name: "Delete",
      requestType: OrgServiceDeleteRequest,
      requestStream: false,
      responseType: OrgServiceDeleteResponse,
      responseStream: false,
      options: {},
    },
    /** Remove a member from an organization. */
    removeMember: {
      name: "RemoveMember",
      requestType: OrgServiceRemoveMemberRequest,
      requestStream: false,
      responseType: OrgServiceRemoveMemberResponse,
      responseStream: false,
      options: {},
    },
    /** Get the host provision token for a user and organization. */
    getProvisionToken: {
      name: "GetProvisionToken",
      requestType: OrgServiceGetProvisionTokenRequest,
      requestStream: false,
      responseType: OrgServiceGetProvisionTokenResponse,
      responseStream: false,
      options: {},
    },
    /** Regenerates the host provision token for a user and organization. */
    resetProvisionToken: {
      name: "ResetProvisionToken",
      requestType: OrgServiceResetProvisionTokenRequest,
      requestStream: false,
      responseType: OrgServiceResetProvisionTokenResponse,
      responseStream: false,
      options: {},
    },
    /** Add a new card to this org. */
    initCard: {
      name: "InitCard",
      requestType: OrgServiceInitCardRequest,
      requestStream: false,
      responseType: OrgServiceInitCardResponse,
      responseStream: false,
      options: {},
    },
    /** List all payment methods for the current org. */
    listPaymentMethods: {
      name: "ListPaymentMethods",
      requestType: OrgServiceListPaymentMethodsRequest,
      requestStream: false,
      responseType: OrgServiceListPaymentMethodsResponse,
      responseStream: false,
      options: {},
    },
    /** Returns details about the billing and billing cycle for this org. */
    billingDetails: {
      name: "BillingDetails",
      requestType: OrgServiceBillingDetailsRequest,
      requestStream: false,
      responseType: OrgServiceBillingDetailsResponse,
      responseStream: false,
      options: {},
    },
    /** Returns the address for this organisation if there is one. */
    getAddress: {
      name: "GetAddress",
      requestType: OrgServiceGetAddressRequest,
      requestStream: false,
      responseType: OrgServiceGetAddressResponse,
      responseStream: false,
      options: {},
    },
    /** Sets the address for this org, overwriting the previous value. */
    setAddress: {
      name: "SetAddress",
      requestType: OrgServiceSetAddressRequest,
      requestStream: false,
      responseType: OrgServiceSetAddressResponse,
      responseStream: false,
      options: {},
    },
    /** Removes the address set for this org. */
    deleteAddress: {
      name: "DeleteAddress",
      requestType: OrgServiceDeleteAddressRequest,
      requestStream: false,
      responseType: OrgServiceDeleteAddressResponse,
      responseStream: false,
      options: {},
    },
    /** Returns the data */
    getInvoices: {
      name: "GetInvoices",
      requestType: OrgServiceGetInvoicesRequest,
      requestStream: false,
      responseType: OrgServiceGetInvoicesResponse,
      responseStream: false,
      options: {},
    },
  },
} as const;

export interface OrgServiceImplementation<CallContextExt = {}> {
  /** Get all the organizations for a user. */
  get(
    request: OrgServiceGetRequest,
    context: CallContext & CallContextExt,
  ): Promise<DeepPartial<OrgServiceGetResponse>>;
  /** List all members of orgs matching a set of criteria. */
  list(
    request: OrgServiceListRequest,
    context: CallContext & CallContextExt,
  ): Promise<DeepPartial<OrgServiceListResponse>>;
  /** Create a new organization. */
  create(
    request: OrgServiceCreateRequest,
    context: CallContext & CallContextExt,
  ): Promise<DeepPartial<OrgServiceCreateResponse>>;
  /** Update an existing organization. */
  update(
    request: OrgServiceUpdateRequest,
    context: CallContext & CallContextExt,
  ): Promise<DeepPartial<OrgServiceUpdateResponse>>;
  /** Mark an organization as deleted. */
  delete(
    request: OrgServiceDeleteRequest,
    context: CallContext & CallContextExt,
  ): Promise<DeepPartial<OrgServiceDeleteResponse>>;
  /** Remove a member from an organization. */
  removeMember(
    request: OrgServiceRemoveMemberRequest,
    context: CallContext & CallContextExt,
  ): Promise<DeepPartial<OrgServiceRemoveMemberResponse>>;
  /** Get the host provision token for a user and organization. */
  getProvisionToken(
    request: OrgServiceGetProvisionTokenRequest,
    context: CallContext & CallContextExt,
  ): Promise<DeepPartial<OrgServiceGetProvisionTokenResponse>>;
  /** Regenerates the host provision token for a user and organization. */
  resetProvisionToken(
    request: OrgServiceResetProvisionTokenRequest,
    context: CallContext & CallContextExt,
  ): Promise<DeepPartial<OrgServiceResetProvisionTokenResponse>>;
  /** Add a new card to this org. */
  initCard(
    request: OrgServiceInitCardRequest,
    context: CallContext & CallContextExt,
  ): Promise<DeepPartial<OrgServiceInitCardResponse>>;
  /** List all payment methods for the current org. */
  listPaymentMethods(
    request: OrgServiceListPaymentMethodsRequest,
    context: CallContext & CallContextExt,
  ): Promise<DeepPartial<OrgServiceListPaymentMethodsResponse>>;
  /** Returns details about the billing and billing cycle for this org. */
  billingDetails(
    request: OrgServiceBillingDetailsRequest,
    context: CallContext & CallContextExt,
  ): Promise<DeepPartial<OrgServiceBillingDetailsResponse>>;
  /** Returns the address for this organisation if there is one. */
  getAddress(
    request: OrgServiceGetAddressRequest,
    context: CallContext & CallContextExt,
  ): Promise<DeepPartial<OrgServiceGetAddressResponse>>;
  /** Sets the address for this org, overwriting the previous value. */
  setAddress(
    request: OrgServiceSetAddressRequest,
    context: CallContext & CallContextExt,
  ): Promise<DeepPartial<OrgServiceSetAddressResponse>>;
  /** Removes the address set for this org. */
  deleteAddress(
    request: OrgServiceDeleteAddressRequest,
    context: CallContext & CallContextExt,
  ): Promise<DeepPartial<OrgServiceDeleteAddressResponse>>;
  /** Returns the data */
  getInvoices(
    request: OrgServiceGetInvoicesRequest,
    context: CallContext & CallContextExt,
  ): Promise<DeepPartial<OrgServiceGetInvoicesResponse>>;
}

export interface OrgServiceClient<CallOptionsExt = {}> {
  /** Get all the organizations for a user. */
  get(
    request: DeepPartial<OrgServiceGetRequest>,
    options?: CallOptions & CallOptionsExt,
  ): Promise<OrgServiceGetResponse>;
  /** List all members of orgs matching a set of criteria. */
  list(
    request: DeepPartial<OrgServiceListRequest>,
    options?: CallOptions & CallOptionsExt,
  ): Promise<OrgServiceListResponse>;
  /** Create a new organization. */
  create(
    request: DeepPartial<OrgServiceCreateRequest>,
    options?: CallOptions & CallOptionsExt,
  ): Promise<OrgServiceCreateResponse>;
  /** Update an existing organization. */
  update(
    request: DeepPartial<OrgServiceUpdateRequest>,
    options?: CallOptions & CallOptionsExt,
  ): Promise<OrgServiceUpdateResponse>;
  /** Mark an organization as deleted. */
  delete(
    request: DeepPartial<OrgServiceDeleteRequest>,
    options?: CallOptions & CallOptionsExt,
  ): Promise<OrgServiceDeleteResponse>;
  /** Remove a member from an organization. */
  removeMember(
    request: DeepPartial<OrgServiceRemoveMemberRequest>,
    options?: CallOptions & CallOptionsExt,
  ): Promise<OrgServiceRemoveMemberResponse>;
  /** Get the host provision token for a user and organization. */
  getProvisionToken(
    request: DeepPartial<OrgServiceGetProvisionTokenRequest>,
    options?: CallOptions & CallOptionsExt,
  ): Promise<OrgServiceGetProvisionTokenResponse>;
  /** Regenerates the host provision token for a user and organization. */
  resetProvisionToken(
    request: DeepPartial<OrgServiceResetProvisionTokenRequest>,
    options?: CallOptions & CallOptionsExt,
  ): Promise<OrgServiceResetProvisionTokenResponse>;
  /** Add a new card to this org. */
  initCard(
    request: DeepPartial<OrgServiceInitCardRequest>,
    options?: CallOptions & CallOptionsExt,
  ): Promise<OrgServiceInitCardResponse>;
  /** List all payment methods for the current org. */
  listPaymentMethods(
    request: DeepPartial<OrgServiceListPaymentMethodsRequest>,
    options?: CallOptions & CallOptionsExt,
  ): Promise<OrgServiceListPaymentMethodsResponse>;
  /** Returns details about the billing and billing cycle for this org. */
  billingDetails(
    request: DeepPartial<OrgServiceBillingDetailsRequest>,
    options?: CallOptions & CallOptionsExt,
  ): Promise<OrgServiceBillingDetailsResponse>;
  /** Returns the address for this organisation if there is one. */
  getAddress(
    request: DeepPartial<OrgServiceGetAddressRequest>,
    options?: CallOptions & CallOptionsExt,
  ): Promise<OrgServiceGetAddressResponse>;
  /** Sets the address for this org, overwriting the previous value. */
  setAddress(
    request: DeepPartial<OrgServiceSetAddressRequest>,
    options?: CallOptions & CallOptionsExt,
  ): Promise<OrgServiceSetAddressResponse>;
  /** Removes the address set for this org. */
  deleteAddress(
    request: DeepPartial<OrgServiceDeleteAddressRequest>,
    options?: CallOptions & CallOptionsExt,
  ): Promise<OrgServiceDeleteAddressResponse>;
  /** Returns the data */
  getInvoices(
    request: DeepPartial<OrgServiceGetInvoicesRequest>,
    options?: CallOptions & CallOptionsExt,
  ): Promise<OrgServiceGetInvoicesResponse>;
}

declare const self: any | undefined;
declare const window: any | undefined;
declare const global: any | undefined;
const tsProtoGlobalThis: any = (() => {
  if (typeof globalThis !== "undefined") {
    return globalThis;
  }
  if (typeof self !== "undefined") {
    return self;
  }
  if (typeof window !== "undefined") {
    return window;
  }
  if (typeof global !== "undefined") {
    return global;
  }
  throw "Unable to locate global object";
})();

type Builtin = Date | Function | Uint8Array | string | number | boolean | undefined;

export type DeepPartial<T> = T extends Builtin ? T
  : T extends Array<infer U> ? Array<DeepPartial<U>> : T extends ReadonlyArray<infer U> ? ReadonlyArray<DeepPartial<U>>
  : T extends {} ? { [K in keyof T]?: DeepPartial<T[K]> }
  : Partial<T>;

function toTimestamp(date: Date): Timestamp {
  const seconds = date.getTime() / 1_000;
  const nanos = (date.getTime() % 1_000) * 1_000_000;
  return { seconds, nanos };
}

function fromTimestamp(t: Timestamp): Date {
  let millis = (t.seconds || 0) * 1_000;
  millis += (t.nanos || 0) / 1_000_000;
  return new Date(millis);
}

function longToNumber(long: Long): number {
  if (long.gt(Number.MAX_SAFE_INTEGER)) {
    throw new tsProtoGlobalThis.Error("Value is larger than Number.MAX_SAFE_INTEGER");
  }
  return long.toNumber();
}

if (_m0.util.Long !== Long) {
  _m0.util.Long = Long as any;
  _m0.configure();
}
