import { authAtoms } from '@modules/auth';
import { ROUTES } from '@shared/index';
import { useRouter } from 'next/router';
import { useRecoilState, useRecoilValue } from 'recoil';
import { organizationAtoms } from '../store/organizationAtoms';
import { useDeleteOrganization } from './useDeleteOrganization';

export function useKickOrganization() {
  const router = useRouter();

  const user = useRecoilValue(authAtoms.user);
  const selectedOrganization = useRecoilValue(
    organizationAtoms.selectedOrganization,
  );
  const [loadingState, setLoadingState] = useRecoilState(
    organizationAtoms.organizationLoadingState,
  );

  const { removeOrganization } = useDeleteOrganization();

  const kickOrganization = async (organization: ClientOrganization) => {
    setLoadingState('loading');

    const { members, ...org }: ClientOrganization = organization;

    const isRemoved = !members?.some(
      (member: ClientOrganizationMember) => member.id === user?.id,
    );

    if (!isRemoved) {
      setLoadingState('finished');
      return;
    }

    removeOrganization(org?.id!);

    if (selectedOrganization && selectedOrganization.id === org?.id)
      router.push(ROUTES.ORGANIZATIONS);

    setLoadingState('finished');
  };

  return {
    loading: loadingState,
    kickOrganization,
  };
}
