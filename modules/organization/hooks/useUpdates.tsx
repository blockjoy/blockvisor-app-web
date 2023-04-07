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

export const useUpdates = () => {
  const { modifyOrganization } = useUpdateOrganization();
  const { removeOrganization } = useDeleteOrganization();

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

        const { createdByName }: OrgCreated.AsObject =
          payloadDeserialized.created!;

        showNotification(type, `${createdByName} just created an organization`);
        break;
      }

      case !!payloadDeserialized.updated: {
        console.log(
          'MQTT payload (organization updated): ',
          payloadDeserialized.updated,
        );

        const { org, updatedByName }: OrgUpdated.AsObject =
          payloadDeserialized.updated!;
        modifyOrganization(org!);

        showNotification(type, `${updatedByName} just updated an organization`);
        break;
      }

      case !!payloadDeserialized.deleted: {
        console.log(
          'MQTT payload (organization deleted): ',
          payloadDeserialized.deleted,
        );

        const { organizationId, deletedByName }: OrgDeleted.AsObject =
          payloadDeserialized.deleted!;

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
