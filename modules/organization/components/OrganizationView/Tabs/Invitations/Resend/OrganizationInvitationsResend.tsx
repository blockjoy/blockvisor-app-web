import { useEffect, useRef, useState } from 'react';
import { css } from '@emotion/react';
import { Invitation } from '@modules/grpc/library/blockjoy/v1/invitation';
import { useResendInvitation } from '@modules/organization';
import { Button } from '@shared/components';

type Props = {
  invitation: Invitation;
};

export const OrganizationInvitationsResend = ({ invitation }: Props) => {
  const { resendInvitation } = useResendInvitation();
  const [isSent, setIsSent] = useState(false);
  const [isSending, setIsSending] = useState(false);
  const timeoutRef = useRef<NodeJS.Timeout>();

  const handleClick = async () => {
    if (!isSending) {
      setIsSending(true);
      await resendInvitation(invitation.inviteeEmail!, invitation.id!);
      setIsSent(true);
      setIsSending(false);
      timeoutRef.current = setTimeout(() => setIsSent(false), 5000);
    }
  };

  useEffect(() => clearTimeout(timeoutRef.current), []);

  return (
    <Button
      disabled={isSent}
      loading={isSending}
      type="button"
      onClick={handleClick}
      style="outline"
      size="small"
      customCss={[
        css`
          min-width: 86px;
        `,
      ]}
    >
      {isSent ? 'Sent' : 'Resend'}
    </Button>
  );
};
