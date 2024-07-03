import { authAtoms } from '@modules/auth';
import { DangerZone } from '@shared/components';
import { useRouter } from 'next/router';
import { useState } from 'react';
import { useRecoilValue } from 'recoil';
import { delay } from '@shared/utils/delay';

export const ProfileDeleteAccount = () => {
  const user = useRecoilValue(authAtoms.user);

  const router = useRouter();

  const [isDeleting, setIsDeleting] = useState(false);

  const handleDelete = async () => {
    setIsDeleting(true);
    await delay(500);
    router.push('/deactivated');
  };

  return (
    <DangerZone
      elementName="Need to leave BlockJoy"
      placeholder="your email address"
      elementNameToCompare={user?.email!}
      handleAction={handleDelete}
      isLoading={isDeleting}
      isDisabled={isDeleting}
      activeAction="deactivate your account"
      buttonText="Deactivate"
      size="small"
    />
  );
};
