import {
  Org,
  OrgsClient,
  OrgsDefinition,
  UpdateOrgResponse,
} from '../library/organization';

import { getOptions, getIdentity, handleError } from '@modules/grpc';
import { createChannel, createClient } from 'nice-grpc-web';
import { StatusResponse, StatusResponseFactory } from '../status_response';

class OrganizationClient {
  private client: OrgsClient;

  constructor() {
    const channel = createChannel(process.env.NEXT_PUBLIC_API_URL!);
    this.client = createClient(OrgsDefinition, channel);
  }

  async getOrganization(orgId: string): Promise<Org | StatusResponse> {
    try {
      const response = await this.client.get({ orgId }, getOptions());
      return response.org!;
    } catch (err) {
      return StatusResponseFactory.getOrganizationsResponse(err, 'grpcClient');
    }
  }

  async getOrganizations(): Promise<Org[] | StatusResponse> {
    try {
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
      const response = await this.client.create({ name }, getOptions());
      return response.org!;
    } catch (err) {
      return StatusResponseFactory.getOrganizationsResponse(err, 'grpcClient');
    }
  }

  async updateOrganization(
    id: string,
    name: string,
  ): Promise<UpdateOrgResponse | StatusResponse> {
    try {
      const response = await this.client.update({ id, name }, getOptions());
      return response;
    } catch (err) {
      return StatusResponseFactory.deleteOrganizationResponse(
        err,
        'grpcClient',
      );
    }
  }

  async deleteOrganization(id: string): Promise<void> {
    try {
      await this.client.delete({ id }, getOptions());
    } catch (err: any) {
      handleError(err);
    }
  }

  async restoreOrganization(id: string): Promise<Org | undefined> {
    try {
      const response = await this.client.restore({ id }, getOptions());
      return response.org!;
    } catch (err) {
      handleError(err);
    }
  }

  async removeOrganizationMember(
    userId: string,
    orgId: string,
  ): Promise<void | StatusResponse> {
    try {
      await this.client.removeMember({ orgId, userId }, getOptions());
    } catch (err) {
      return StatusResponseFactory.removeOrganizationMemberResponse(
        err,
        'grpcClient',
      );
    }
  }

  async leaveOrganization(orgId: string): Promise<void | StatusResponse> {
    try {
      await this.client.leave({ orgId }, getOptions());
    } catch (err) {
      return StatusResponseFactory.leaveOrganizationResponse(err, 'grpcClient');
    }
  }
}

export const organizationClient = new OrganizationClient();
