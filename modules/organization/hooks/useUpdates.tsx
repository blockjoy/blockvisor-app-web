import {
  OrgCreated,
  OrgDeleted,
  OrgMessage,
  OrgUpdated,
} from '@blockjoy/blockjoy-grpc/dist/out/mqtt_pb';
import {
  useUpdateOrganization,
  useDeleteOrganization,
} from '@modules/organization';
import { showNotification } from '@modules/mqtt';
import { useRecoilValue } from 'recoil';
import { authAtoms } from '@modules/auth';
import { useKickOrganization } from './useKickOrganization';

export const useUpdates = () => {
  const user = useRecoilValue(authAtoms.user);

  const { modifyOrganization } = useUpdateOrganization();
  const { removeOrganization } = useDeleteOrganization();
  const { kickOrganization } = useKickOrganization();

  const handleOrganizationUpdate = (message: Message) => {
    const { type, payload }: Message = message;

    let payloadDeserialized = OrgMessage.deserializeBinary(
      new Uint8Array(payload),
    ).toObject();

    switch (true) {
      case !!payloadDeserialized.created: {
        console.log(
          'MQTT payload (organization created): ',
          payloadDeserialized.created,
        );

        const { createdBy, createdByName }: OrgCreated.AsObject =
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

        const { org, updatedBy, updatedByName }: OrgUpdated.AsObject =
          payloadDeserialized.updated!;

        if (updatedBy === user?.id) break;

        modifyOrganization(org!);

        kickOrganization(org!);

        showNotification(type, `${updatedByName} just updated an organization`);
        break;
      }

      case !!payloadDeserialized.deleted: {
        console.log(
          'MQTT payload (organization deleted): ',
          payloadDeserialized.deleted,
        );

        const {
          organizationId,
          deletedBy,
          deletedByName,
        }: OrgDeleted.AsObject = payloadDeserialized.deleted!;

        if (deletedBy === user?.id) break;

        removeOrganization(organizationId);

        showNotification(type, `${deletedByName} just deleted an organization`);
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
