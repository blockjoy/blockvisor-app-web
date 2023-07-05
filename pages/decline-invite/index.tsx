import type { NextPage } from 'next';
import { useRouter } from 'next/router';
import { useEffect } from 'react';
import { invitationClient } from '@modules/grpc';
import { Layout } from '@shared/components';
import { readToken } from '@shared/utils/readToken';

const AcceptInvite: NextPage = () => {
  const router = useRouter();

  useEffect(() => {
    if (router.isReady) {
      const { token } = router.query;
      const tokenObject = readToken(token as string);
      const { invitation_id } = tokenObject.data;
      (async () => {
        await invitationClient.declineInvitation(
          invitation_id,
          token as string,
        );
      })();
    }
  }, [router.isReady]);

  return (
    <Layout title="Invitation Declined">
      <p>You have declined this invitation</p>
    </Layout>
  );
};

export default AcceptInvite;
