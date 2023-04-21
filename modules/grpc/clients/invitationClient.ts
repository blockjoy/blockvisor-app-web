import {
  InvitationsDefinition,
  InvitationsClient,
  Invitation,
} from '../library/invitation';

import { getOptions } from '@modules/grpc';
import { createChannel, createClient, Metadata } from 'nice-grpc-web';
import { StatusResponse, StatusResponseFactory } from '../status_response';

class InvitationClient {
  private client: InvitationsClient;

  constructor() {
    const channel = createChannel(process.env.NEXT_PUBLIC_API_URL!);
    this.client = createClient(InvitationsDefinition, channel);
  }

  async inviteOrgMember(
    inviteeEmail: string,
    orgId: string,
  ): Promise<void | StatusResponse> {
    try {
      await this.client.create({ inviteeEmail, orgId }, getOptions());
    } catch (err) {
      return StatusResponseFactory.inviteOrgMember(err, 'grpcClient');
    }
  }

  async acceptInvitation(
    invitationId?: string,
  ): Promise<void | StatusResponse> {
    try {
      await this.client.accept({ invitationId }, getOptions());
    } catch (err) {
      return StatusResponseFactory.acceptInvitation(err, 'grpcClient');
    }
  }

  async declineInvitation(
    invitationId?: string,
  ): Promise<void | StatusResponse> {
    try {
      await this.client.decline({ invitationId }, getOptions());
    } catch (err) {
      return StatusResponseFactory.declineInvitation(err, 'grpcClient');
    }
  }

  async revokeInvitation(
    invitationId?: string,
  ): Promise<void | StatusResponse> {
    try {
      await this.client.revoke({ invitationId }, getOptions());
    } catch (err) {
      return StatusResponseFactory.revokeInvitation(err, 'grpcClient');
    }
  }

  async receivedInvitations(
    userId: string,
  ): Promise<Invitation[] | StatusResponse> {
    try {
      const response = await this.client.listReceived({ userId }, getOptions());
      return response.invitations;
    } catch (err) {
      return StatusResponseFactory.receivedInvitations(err, 'grpcClient');
    }
  }

  async pendingInvitations(
    orgId: string,
  ): Promise<Invitation[] | StatusResponse> {
    try {
      const response = await this.client.listPending({ orgId }, getOptions());
      return response.invitations;
    } catch (err) {
      return StatusResponseFactory.pendingInvitations(err, 'grpcClient');
    }
  }
}

export const invitationClient = new InvitationClient();
