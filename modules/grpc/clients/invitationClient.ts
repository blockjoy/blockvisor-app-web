import {
  InvitationServiceClient,
  InvitationServiceDefinition,
  Invitation,
  InvitationStatus,
} from '../library/blockjoy/v1/invitation';

import {
  authClient,
  getIdentity,
  getOptions,
  handleError,
} from '@modules/grpc';
import { createChannel, createClient } from 'nice-grpc-web';

class InvitationClient {
  private client: InvitationServiceClient;

  constructor() {
    const channel = createChannel(process.env.NEXT_PUBLIC_API_URL!);
    this.client = createClient(InvitationServiceDefinition, channel);
  }

  async inviteOrgMember(
    inviteeEmail: string,
    orgId: string,
  ): Promise<Invitation> {
    try {
      await authClient.refreshToken();
      const response = await this.client.create(
        { inviteeEmail, orgId },
        getOptions(),
      );
      return response.invitation!;
    } catch (err) {
      return handleError(err);
    }
  }

  async acceptInvitation(invitationId?: string): Promise<void> {
    if (getIdentity().accessToken) await authClient.refreshToken();
    try {
      await this.client.accept({ invitationId }, getOptions());
    } catch (err) {
      return handleError(err, false);
    }
  }

  async declineInvitation(invitationId: string, token?: string): Promise<void> {
    if (getIdentity().accessToken) await authClient.refreshToken();
    try {
      await this.client.decline({ invitationId }, getOptions(token));
    } catch (err) {
      return handleError(err, false);
    }
  }

  async revokeInvitation(invitationId?: string): Promise<void> {
    try {
      await authClient.refreshToken();
      await this.client.revoke({ invitationId }, getOptions());
    } catch (err) {
      return handleError(err);
    }
  }

  async receivedInvitations(inviteeEmail: string): Promise<Invitation[]> {
    try {
      await authClient.refreshToken();
      const response = await this.client.list(
        { inviteeEmail, status: InvitationStatus.INVITATION_STATUS_OPEN },
        getOptions(),
      );
      return response.invitations;
    } catch (err) {
      return handleError(err);
    }
  }

  async pendingInvitations(orgId: string): Promise<Invitation[]> {
    try {
      await authClient.refreshToken();
      const response = await this.client.list(
        { orgId, status: InvitationStatus.INVITATION_STATUS_OPEN },
        getOptions(),
      );
      return response.invitations;
    } catch (err) {
      return handleError(err);
    }
  }
}

export const invitationClient = new InvitationClient();
