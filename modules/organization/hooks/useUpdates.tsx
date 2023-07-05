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
  const { removeOrganization } = useDeleteOrganization();
  const { updateMembersList } = useUpdateMembers();
  const { getOrganizations } = useGetOrganizations();
  const { defaultOrganization, setDefaultOrganization } =
    useDefaultOrganization();
  const { organizations } = useGetOrganizations();

  const kickFromOrganization = () => {
    const newOrg = organizations[0];

    setDefaultOrganization({
      id: newOrg.id,
      name: newOrg.name,
    });

    if (router.pathname.includes('/organizations/')) {
      router.push(ROUTES.ORGANIZATION(newOrg.id));
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

        const { createdBy, createdByName }: OrgCreated =
          payloadDeserialized.created!;

        if (createdBy === user?.id) break;

        showNotification(type, `${createdByName} just created an organization`);
        break;
      }

      case !!payloadDeserialized.updated: {
        console.log(
          'MQTT payload (organization updated): ',
          payloadDeserialized.updated,
        );

        const { org, updatedBy, updatedByName }: OrgUpdated =
          payloadDeserialized.updated!;

        if (updatedBy === user?.id) break;

        modifyOrganization(org!);

        updateMembersList(org!);

        if (!org?.members.find((m) => m.userId === user?.id)) {
          showNotification(
            type,
            `You've just been removed from ${org?.name} organization`,
          );
          kickFromOrganization();
        } else {
          showNotification(
            type,
            `${updatedByName} just updated an organization`,
          );
        }

        break;
      }

      case !!payloadDeserialized.deleted: {
        console.log(
          'MQTT payload (organization deleted): ',
          payloadDeserialized.deleted,
        );

        const { orgId, deletedBy, deletedByName }: OrgDeleted =
          payloadDeserialized.deleted!;

        if (deletedBy === user?.id) break;

        removeOrganization(orgId);

        if (orgId === defaultOrganization?.id) {
          showNotification(
            type,
            `${deletedByName} just deleted your default organization`,
          );
          kickFromOrganization();
        } else {
          showNotification(
            type,
            `${deletedByName} just deleted an organization`,
          );
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
