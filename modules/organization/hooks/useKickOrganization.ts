import { authAtoms } from '@modules/auth';
import { ROUTES } from '@shared/index';
import { useRouter } from 'next/router';
import { useRecoilState, useRecoilValue } from 'recoil';
import { organizationAtoms } from '../store/organizationAtoms';
import { useDeleteOrganization } from './useDeleteOrganization';
import { OrgUser } from '@blockjoy/blockjoy-grpc/dist/out/common_pb';

export function useKickOrganization(): IKickOrganizationHook {
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

    const { membersList, ...org }: ClientOrganization = organization;

    const isRemoved: boolean = !membersList?.some(
      (member: OrgUser.AsObject) => member.userId === user?.id,
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
