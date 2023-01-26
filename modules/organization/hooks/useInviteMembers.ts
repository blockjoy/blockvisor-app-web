import { isResponeMetaObject } from '@modules/auth';
import { ApplicationError } from '@modules/auth/utils/Errors';
import { apiClient } from '@modules/client';
import { useMutation, useQueryClient } from '@tanstack/react-query';
import { useRouter } from 'next/router';
import { toast } from 'react-toastify';
import { useRecoilValue } from 'recoil';
import { organizationAtoms } from '../store/organizationAtoms';

export const useInviteMembers = () => {
  const client = useQueryClient();
  const router = useRouter();
  const orgId = router.query.id;
  const selectedOrganization = useRecoilValue(
    organizationAtoms.selectedOrganization,
  );

  const inviteMembers = async (emails: string[], onComplete: VoidFunction) => {
    const formattedEmail = emails[0]?.toLowerCase();

    const response = await apiClient.inviteOrgMember(
      formattedEmail,
      selectedOrganization?.id!,
    );

    if (isResponeMetaObject(response)) {
      toast.success(
        `You've invited ${formattedEmail} to ${selectedOrganization?.name}! They'll be receiving an email shortly.`,
      );
      onComplete();
    } else {
      throw new ApplicationError('UpdateOrganization', 'Update failed');
    }
  };

  const { mutateAsync } = useMutation({
    mutationFn: ({
      emails,
      onComplete,
    }: {
      emails: string[];
      onComplete: VoidFunction;
    }) => inviteMembers(emails, onComplete),
    onSuccess() {
      client.invalidateQueries({ queryKey: ['sentInvitations', orgId] });
    },
  });

  return {
    inviteMembers: mutateAsync,
  };
};
