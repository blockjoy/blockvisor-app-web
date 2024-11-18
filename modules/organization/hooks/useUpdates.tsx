import {
  OrgCreated,
  OrgDeleted,
  OrgMessage,
  OrgUpdated,
} from '@modules/grpc/library/blockjoy/v1/mqtt';
import {
  useUpdateOrganization,
  useDeleteOrganization,
  useGetOrganizations,
  useDefaultOrganization,
} from '@modules/organization';
import { showNotification } from '@modules/mqtt';
import { useRecoilValue } from 'recoil';
import { authAtoms } from '@modules/auth';
import { useUpdateMembers } from './useUpdateMembers';
import { useRouter } from 'next/router';
import { ROUTES } from '@shared/constants/routes';

export const useUpdates = () => {
  const user = useRecoilValue(authAtoms.user);
  const router = useRouter();

  const { modifyOrganization } = useUpdateOrganization();
  const { updateMembersList } = useUpdateMembers();
  const { defaultOrganization, setDefaultOrganization } =
    useDefaultOrganization();
  const { organizations, removeFromOrganizations, addToOrganizations } =
    useGetOrganizations();

  const kickFromOrganization = () => {
    const newOrg = organizations[0];

    setDefaultOrganization({
      orgId: newOrg.orgId,
      name: newOrg.name,
    });

    if (router.pathname.includes('/organizations/')) {
      router.push(ROUTES.ORGANIZATION(newOrg.orgId));
    }
  };

  const handleOrganizationUpdate = (message: Message) => {
    const { type, payload }: Message = message;

    const payloadDeserialized = OrgMessage.decode(new Uint8Array(payload));

    switch (true) {
      case !!payloadDeserialized.created: {
        console.log(
          'MQTT payload (organization created): ',
          payloadDeserialized.created,
        );

        const { createdBy, org }: OrgCreated = payloadDeserialized.created!;

        addToOrganizations(org!);

        if (createdBy === user?.userId) break;

        showNotification(
          type,
          `${createdBy?.resourceId} just created an organization`,
        );
        break;
      }

      case !!payloadDeserialized.updated: {
        console.log(
          'MQTT payload (organization updated): ',
          payloadDeserialized.updated,
        );

        const { org, updatedBy }: OrgUpdated = payloadDeserialized.updated!;

        modifyOrganization(org!);

        updateMembersList(org!);

        if (updatedBy?.resourceId === user?.userId) break;

        const isKicked = !org?.members.find((m) => m.userId === user?.userId);

        if (isKicked) {
          showNotification(
            type,
            `You've just been removed from ${org?.name} organization`,
          );
          kickFromOrganization();
        }

        break;
      }

      case !!payloadDeserialized.deleted: {
        console.log(
          'MQTT payload (organization deleted): ',
          payloadDeserialized.deleted,
        );

        const { orgId, deletedBy }: OrgDeleted = payloadDeserialized.deleted!;

        removeFromOrganizations(orgId);

        if (deletedBy?.resourceId === user?.userId) break;

        if (orgId === defaultOrganization?.orgId) {
          showNotification(
            type,
            `${deletedBy?.resourceId} just deleted your default organization`,
          );
          kickFromOrganization();
        }

        break;
      }

      default:
        break;
    }
  };

  return {
    handleOrganizationUpdate,
  };
};
