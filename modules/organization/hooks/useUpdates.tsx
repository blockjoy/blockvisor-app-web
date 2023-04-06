import { OrgMessage } from '@blockjoy/blockjoy-grpc/dist/out/mqtt_pb';
import { useUpdateOrganization } from './useUpdateOrganization';
import { toast } from 'react-toastify';
import { useDeleteOrganization } from './useDeleteOrganization';

export const useUpdates = () => {
  const { modifyOrganization } = useUpdateOrganization();
  const { removeOrganization } = useDeleteOrganization();

  const handleOrganizationUpdate = (message: Message) => {
    const { payload } = message;

    let payloadDeserialized = OrgMessage.deserializeBinary(
      new Uint8Array(payload),
    ).toObject();

    if (payloadDeserialized.created) {
      console.log(
        'MQTT payload (organization created): ',
        payloadDeserialized.created,
      );

      const { createdBy, createdByName, createdByEmail } =
        payloadDeserialized.created;

      toast.success(`${createdByName} just created an organization`, {
        autoClose: 5000,
        hideProgressBar: false,
      });
    } else if (payloadDeserialized.deleted) {
      console.log(
        'MQTT payload (organization deleted): ',
        payloadDeserialized.deleted,
      );

      const { organizationId, deletedBy, deletedByName, deletedByEmail } =
        payloadDeserialized.deleted;

      removeOrganization(organizationId);

      toast.success(`${deletedByName} just deleted an organization`, {
        autoClose: 5000,
        hideProgressBar: false,
      });
    } else if (payloadDeserialized.updated) {
      console.log(
        'MQTT payload (organization updated): ',
        payloadDeserialized.updated,
      );

      const { org, updatedBy, updatedByName, updatedByEmail } =
        payloadDeserialized.updated;
      modifyOrganization(org!);

      toast.success(`${updatedByName} just updated an organization`, {
        autoClose: 5000,
        hideProgressBar: false,
      });
    }
  };

  return {
    handleOrganizationUpdate,
  };
};
