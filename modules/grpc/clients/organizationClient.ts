import {
  Org,
  OrgServiceClient,
  OrgServiceDefinition,
  OrgServiceUpdateResponse,
} from '../library/blockjoy/v1/org';

import {
  getOptions,
  getIdentity,
  handleError,
  authClient,
} from '@modules/grpc';
import { createChannel, createClient } from 'nice-grpc-web';
import { StatusResponse, StatusResponseFactory } from '../status_response';

class OrganizationClient {
  private client: OrgServiceClient;

  constructor() {
    const channel = createChannel(process.env.NEXT_PUBLIC_API_URL!);
    this.client = createClient(OrgServiceDefinition, channel);
  }

  async getOrganization(id: string): Promise<Org | StatusResponse> {
    try {
      await authClient.refreshToken();
      const response = await this.client.get({ id }, getOptions());
      console.log('getOrg', response);
      return response.org!;
    } catch (err) {
      return StatusResponseFactory.getOrganizationsResponse(err, 'grpcClient');
    }
  }

  async getOrganizations(): Promise<Org[] | StatusResponse> {
    try {
      await authClient.refreshToken();
      const response = await this.client.list(
        { memberId: getIdentity().id },
        getOptions(),
      );
      return response.orgs;
    } catch (err) {
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

  async removeMember(
    userId: string,
    orgId: string,
  ): Promise<void | StatusResponse> {
    try {
      await authClient.refreshToken();
      await this.client.removeMember({ userId, orgId }, getOptions());
    } catch (err) {
      return StatusResponseFactory.removeOrganizationMemberResponse(
        err,
        'grpcClient',
      );
    }
  }
}

export const organizationClient = new OrganizationClient();
