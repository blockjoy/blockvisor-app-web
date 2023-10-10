import {
  Org,
  OrgServiceClient,
  OrgServiceDefinition,
  OrgServiceGetProvisionTokenResponse,
  OrgServiceResetProvisionTokenResponse,
  OrgServiceUpdateResponse,
} from '../library/blockjoy/v1/org';

import {
  getOptions,
  getIdentity,
  handleError,
  authClient,
  checkForRefreshTokenError,
} from '@modules/grpc';
import { createChannel, createClient } from 'nice-grpc-web';
import { StatusResponse, StatusResponseFactory } from '../status_response';

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

  async getOrganizations(): Promise<Org[] | StatusResponse> {
    const request = { memberId: getIdentity().id, offset: 0, limit: 100 };
    console.log('listOrganizationsRequest', request);
    try {
      await authClient.refreshToken();
      const response = await this.client.list(request, getOptions());
      console.log('listOrganizationsResponse', response);
      return response.orgs;
    } catch (err: any) {
      checkForRefreshTokenError(err.message);
      return StatusResponseFactory.getOrganizationsResponse(err, 'grpcClient');
    }
  }

  async createOrganization(name: string): Promise<Org | StatusResponse> {
    try {
      await authClient.refreshToken();
      const response = await this.client.create({ name }, getOptions());
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
