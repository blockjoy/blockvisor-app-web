import {
  Org,
  OrgSearch,
  OrgServiceBillingDetailsResponse,
  OrgServiceClient,
  OrgServiceDefinition,
  OrgServiceGetProvisionTokenResponse,
  OrgServiceListRequest,
  OrgServiceListResponse,
  OrgServiceResetProvisionTokenResponse,
  OrgServiceUpdateRequest,
  OrgServiceUpdateResponse,
  OrgSort,
  OrgSortField,
  PaymentMethod,
} from '../library/blockjoy/v1/org';
import {
  getOptions,
  getIdentity,
  handleError,
  authClient,
  UIPagination,
  getPaginationOffset,
  createSearch,
} from '@modules/grpc';
import { createChannel, createClient } from 'nice-grpc-web';
import {
  SearchOperator,
  SortOrder,
} from '../library/blockjoy/common/v1/search';

class OrganizationClient {
  private client: OrgServiceClient;

  constructor() {
    const channel = createChannel(process.env.NEXT_PUBLIC_API_URL!);
    this.client = createClient(OrgServiceDefinition, channel);
  }

  async getOrganization(id: string): Promise<Org> {
    const request = { id };
    console.log('getOrganizationRequest', request);
    try {
      await authClient.refreshToken();
      const response = await this.client.get(request, getOptions());
      console.log('getOrganizationResponse', response.org);
      return response.org!;
    } catch (err) {
      return handleError(err);
    }
  }

  async listOrganizations(
    pagination?: UIPagination,
    sort?: OrgSort[],
    keyword?: string,
    isAdmin?: boolean,
    includePersonal?: boolean,
  ): Promise<OrgServiceListResponse> {
    const request: OrgServiceListRequest = {
      memberId: !isAdmin ? getIdentity().id : undefined,
      offset: getPaginationOffset(
        pagination || { currentPage: 0, itemsPerPage: 1000 },
      ),
      limit: pagination?.itemsPerPage || 1000,
      personal: includePersonal,
      sort: sort || [
        {
          field: OrgSortField.ORG_SORT_FIELD_NAME,
          order: SortOrder.SORT_ORDER_ASCENDING,
        },
      ],
    };

    if (keyword) {
      const search: OrgSearch = {
        id: createSearch(keyword),
        name: createSearch(keyword),
        operator: SearchOperator.SEARCH_OPERATOR_OR,
      };
      request.search = search;
    }

    console.log('listOrganizationsRequest', request);
    try {
      await authClient.refreshToken();
      const response = await this.client.list(request, getOptions());
      console.log('listOrganizationsResponse', response);
      return response;
    } catch (err: any) {
      return handleError(err);
    }
  }

  async createOrganization(name: string): Promise<Org> {
    const request = { name };
    console.log('createOrganizationRequest', request);
    try {
      await authClient.refreshToken();
      const response = await this.client.create(request, getOptions());
      console.log('createOrganizationResponse', response);
      return response.org!;
    } catch (err) {
      return handleError(err);
    }
  }

  async updateOrganization(
    request: OrgServiceUpdateRequest,
  ): Promise<OrgServiceUpdateResponse> {
    try {
      await authClient.refreshToken();
      return await this.client.update(request, getOptions());
    } catch (err) {
      return handleError(err);
    }
  }

  async deleteOrganization(id: string): Promise<void> {
    try {
      await authClient.refreshToken();
      await this.client.delete({ id }, getOptions());
    } catch (err: any) {
      handleError(err);
    }
  }

  async removeMember(userId: string, orgId: string): Promise<void> {
    const request = {
      userId,
      orgId,
    };
    console.log('removeMemberRequest', request);
    try {
      await authClient.refreshToken();
      await this.client.removeMember(request, getOptions());
    } catch (err) {
      return handleError(err);
    }
  }

  async getProvisionToken(
    userId: string,
    orgId: string,
  ): Promise<OrgServiceGetProvisionTokenResponse> {
    try {
      await authClient.refreshToken();
      return this.client.getProvisionToken({ userId, orgId }, getOptions());
    } catch (err) {
      return handleError(err);
    }
  }

  async resetProvisionToken(
    userId: string,
    orgId: string,
  ): Promise<OrgServiceResetProvisionTokenResponse> {
    try {
      await authClient.refreshToken();
      return this.client.resetProvisionToken({ userId, orgId }, getOptions());
    } catch (err) {
      return handleError(err);
    }
  }

  // BILLING
  async initCard(orgId: string, userId: string): Promise<string> {
    try {
      await authClient.refreshToken();
      const response = await this.client.initCard(
        { orgId, userId },
        getOptions(),
      );

      return response.clientSecret!;
    } catch (err) {
      return handleError(err);
    }
  }

  async listPaymentMethods(orgId: string): Promise<PaymentMethod[]> {
    try {
      await authClient.refreshToken();
      const response = await this.client.listPaymentMethods(
        { orgId },
        getOptions(),
      );

      return response.methods!;
    } catch (err) {
      return handleError(err);
    }
  }

  async getSubscription(
    orgId: string,
  ): Promise<OrgServiceBillingDetailsResponse> {
    try {
      const req = { orgId };
      console.log('this.client.billingDetails req', req);
      await authClient.refreshToken();
      const response = await this.client.billingDetails(req, getOptions());

      return response;
    } catch (err) {
      return handleError(err);
    }
  }
}

export const organizationClient = new OrganizationClient();
