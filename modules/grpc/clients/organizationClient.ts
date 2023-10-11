import {
  Org,
  OrgSearch,
  OrgServiceClient,
  OrgServiceDefinition,
  OrgServiceGetProvisionTokenResponse,
  OrgServiceListRequest,
  OrgServiceListResponse,
  OrgServiceResetProvisionTokenResponse,
  OrgServiceUpdateResponse,
  OrgSort,
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
import { StatusResponse, StatusResponseFactory } from '../status_response';
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

<<<<<<< HEAD
  async getOrganizations(
    pagination?: UIPagination,
    sort?: OrgSort[],
    keyword?: string,
    isAdmin?: boolean,
  ): Promise<OrgServiceListResponse> {
    const request: OrgServiceListRequest = {
      memberId: !isAdmin ? getIdentity().id : undefined,
      offset: getPaginationOffset(pagination!),
      limit: pagination?.items_per_page!,
      personal: isAdmin ? false : undefined,
      sort: sort || [],
    };

    if (keyword) {
      const search: OrgSearch = {
        id: createSearch(keyword),
        name: createSearch(keyword),
        operator: SearchOperator.SEARCH_OPERATOR_OR,
      };
      request.search = search;
    }

=======
  async getOrganizations(): Promise<Org[] | StatusResponse> {
    const request = { memberId: getIdentity().id, offset: 0, limit: 100 };
>>>>>>> f4bccfe2 (fix: ruined branch due to api changes)
    console.log('listOrganizationsRequest', request);
    try {
      await authClient.refreshToken();
      const response = await this.client.list(request, getOptions());
      console.log('listOrganizationsResponse', response);
<<<<<<< HEAD
      return response;
=======
      return response.orgs;
>>>>>>> f4bccfe2 (fix: ruined branch due to api changes)
    } catch (err: any) {
      return handleError(err);
    }
  }

  async createOrganization(name: string): Promise<Org | StatusResponse> {
    const request = { name };
    console.log('createOrganizationRequest', request);
    try {
      await authClient.refreshToken();
      const response = await this.client.create(request, getOptions());
      console.log('createOrganizationResponse', response);
      return response.org!;
    } catch (err) {
      return StatusResponseFactory.getOrganizationsResponse(err, 'grpcClient');
    }
  }

  async updateOrganization(
    id: string,
    name: string,
  ): Promise<OrgServiceUpdateResponse | StatusResponse> {
    try {
      await authClient.refreshToken();
      return await this.client.update({ id, name }, getOptions());
    } catch (err) {
      return StatusResponseFactory.deleteOrganizationResponse(
        err,
        'grpcClient',
      );
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
    try {
      await authClient.refreshToken();
      await this.client.removeMember({ userId, orgId }, getOptions());
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
  ): Promise<OrgServiceResetProvisionTokenResponse | StatusResponse> {
    try {
      await authClient.refreshToken();
      return this.client.resetProvisionToken({ userId, orgId }, getOptions());
    } catch (err) {
      return StatusResponseFactory.getHostProvisionResponse(err, 'grpcClient');
    }
  }
}

export const organizationClient = new OrganizationClient();
