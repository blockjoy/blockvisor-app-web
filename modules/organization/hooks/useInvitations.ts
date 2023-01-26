import { ApplicationError } from '@modules/auth/utils/Errors';
import { apiClient } from '@modules/client';
import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query';
import { toast } from 'react-toastify';
import { useRecoilState, useSetRecoilState } from 'recoil';
import { organizationAtoms } from '../store/organizationAtoms';
import { isStatusResponse } from '../utils/typeGuards';

export function useReceivedInvitations(userId: string) {
  const setReceivedInvitations = useSetRecoilState(
    organizationAtoms.organizationReceivedInvitations,
  );

  const fetchReceivedInvitations = async (userId: string) => {
    const response = await apiClient.receivedInvitations(userId);

    if (response && isStatusResponse(response)) {
      throw new ApplicationError('GetReceivedInvitations', response.message);
    }
    return response;
  };

  const { isLoading } = useQuery({
    queryKey: ['receivedInvitations', userId],
    queryFn: () => fetchReceivedInvitations(userId),
    onSuccess(data) {
      if (data) setReceivedInvitations(data);
    },
  });

  return { isLoading };
}

export function useSentInvitations(orgId: string) {
  const [sentInvitations, setSentInvitations] = useRecoilState(
    organizationAtoms.organizationSentInvitations,
  );
  const fetchSentInvitations = async (orgId: string) => {
    const response = await apiClient.pendingInvitations(orgId);

    if (response && isStatusResponse(response)) {
      throw new ApplicationError('GetSentInvitations', response.message);
    }
    return response;
  };

  const { isLoading, refetch } = useQuery({
    queryKey: ['sentInvitations', orgId],
    queryFn: () => fetchSentInvitations(orgId),
    onSuccess(data) {
      if (data) setSentInvitations(data);
    },
    onError() {
      setSentInvitations([]);
    },
    enabled: false, // disable from automatically running and use refetch to run manually
  });

  return { isLoading, sentInvitations, getSentInvitations: refetch };
}

export function useRevokeInvitation() {
  const [sentInvitations, setSentInvitations] = useRecoilState(
    organizationAtoms.organizationSentInvitations,
  );

  const updateInvitations = (invitation_id: string) => {
    const newSentInvitations = sentInvitations.filter(
      (invitation) => invitation.id !== invitation_id,
    );
    setSentInvitations(newSentInvitations);
  };

  const revokeInvitation = async ({
    token,
    invitationId,
    email,
  }: {
    token?: string;
    invitationId?: string;
    email?: string;
  }) => {
    const response = await apiClient.revokeInvitation({
      token,
      invitationId,
      email,
    });

    if (response && isStatusResponse(response)) {
      throw new ApplicationError('RevokeInvitation', response.message);
    }

    return;
  };

  const { mutateAsync } = useMutation({
    mutationFn: ({
      token,
      invitationId,
      email,
    }: {
      token?: string;
      invitationId?: string;
      email?: string;
    }) => revokeInvitation({ token, invitationId, email }),
    onSuccess(_, variables) {
      const { invitationId } = variables;

      if (invitationId) updateInvitations(invitationId);

      toast.success('Invitation Revoked');
    },
    onError() {
      toast.error('Invitation Revoke failed');
    },
  });

  return {
    revokeInvitation: mutateAsync,
  };
}

export function useDeclineInvitations() {
  const client = useQueryClient();
  const declineInvitation = async ({
    token,
    invitationId,
  }: {
    token?: string;
    invitationId?: string;
  }) => {
    const response = await apiClient.declineInvitation({
      token,
      invitationId,
    });

    if (response && isStatusResponse(response)) {
      throw new ApplicationError('DeclineInvitation', response.message);
    }
    return;
  };

  const { mutateAsync } = useMutation({
    mutationFn: ({
      token,
      invitationId,
    }: {
      token?: string;
      invitationId?: string;
    }) => declineInvitation({ token, invitationId }),
    onSuccess() {
      client.invalidateQueries({ queryKey: ['receivedInvitations'] });
      toast.success('Invite Declined');
    },
  });

  return {
    declineInvitation: mutateAsync,
  };
}

export function useAcceptInvitation() {
  const client = useQueryClient();
  const acceptInvitation = async ({
    token,
    invitationId,
  }: {
    token?: string;
    invitationId?: string;
  }) => {
    const response = await apiClient.acceptInvitation({
      token,
      invitationId,
    });

    if (response && isStatusResponse(response)) {
      throw new ApplicationError('AcceptInvitation', response.message);
    }
    return;
  };

  const { mutateAsync } = useMutation({
    mutationFn: ({
      token,
      invitationId,
    }: {
      token?: string;
      invitationId?: string;
    }) => acceptInvitation({ token, invitationId }),
    onSuccess() {
      client.invalidateQueries({ queryKey: ['receivedInvitations'] });
      toast.success('Invite Accepted');
    },
  });

  return {
    acceptInvitation: mutateAsync,
  };
}
