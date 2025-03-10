import { useRouter } from 'next/router';
import { protocolClient } from '@modules/grpc';
import {
  Protocol,
  ProtocolServiceUpdateProtocolRequest,
  ProtocolVersion,
} from '@modules/grpc/library/blockjoy/v1/protocol';
import { AdminDetail } from '../AdminDetail/AdminDetail';
import { useState } from 'react';
import { delay } from '@shared/utils/delay';
import {
  createAdminUpdateRequest,
  createDropdownValuesFromEnum,
} from '@modules/admin/utils';
import { Visibility } from '@modules/grpc/library/blockjoy/common/v1/protocol';
import { capitalize } from 'utils/capitalize';
import { AdminProtocolVariants } from './AdminProtocolVariants/AdminProtocolVariants';
import { AdminProtocolVersionEdit } from './AdminProtocolVersionEdit/AdminProtocolVersionEdit';
import { toast } from 'react-toastify';

export const AdminProtocol = () => {
  const router = useRouter();
  const { id } = router.query;

  const [shouldRefresh, setShouldRefresh] = useState(false);

  const [isVisibilityModalOpen, setIsVisibilityModalOpen] = useState(false);
  const [isUpdating, setIsUpdating] = useState(false);

  const [selectedVersion, setSelectedVersion] =
    useState<ProtocolVersion | null>(null);

  const handleRefreshed = async () => {
    setShouldRefresh(true);
    await delay(250);
    setShouldRefresh(false);
  };

  const getItem = async () => await protocolClient.getProtocol(id as string);

  const customItems = (protocol: Protocol): AdminDetailProperty[] => [
    {
      id: 'name',
      label: 'Name',
      data: protocol.name,
      copyValue: protocol.name,
      editSettings: {
        field: 'name',
        isNumber: false,
        controlType: 'text',
        defaultValue: protocol.name,
      },
    },
    {
      id: 'key',
      label: 'Key',
      data: protocol.key,
      copyValue: protocol.key,
    },
    {
      id: 'protocolId',
      label: 'Protocol Id',
      data: protocol.protocolId,
      copyValue: protocol.protocolId,
    },
    {
      id: 'visibilityText',
      label: 'Visibility',
      data: capitalize(
        Visibility[protocol.visibility]
          ?.toString()
          ?.replace('VISIBILITY_', '')
          ?.toLowerCase(),
      ),
      editSettings: {
        field: 'visibility',
        isNumber: true,
        controlType: 'dropdown',
        dropdownValues: createDropdownValuesFromEnum(Visibility, 'VISIBILITY_'),
        defaultValue: protocol.visibility?.toString(),
      },
    },
    {
      id: 'orgId',
      label: 'Org Id',
      data: protocol.orgId,
    },
    {
      id: `variants`,
      label: 'Variants',
      data: !protocol.versions.length ? (
        '-'
      ) : (
        <AdminProtocolVariants
          protocol={protocol}
          onSelectVersion={handleSelectVersion}
        />
      ),
    },
  ];

  const handleSaveChanges = async (
    properties: AdminDetailProperty[],
    onSuccess: VoidFunction,
  ) => {
    const defaultRequest: ProtocolServiceUpdateProtocolRequest = {
      protocolId: id as string,
    };
    const request =
      createAdminUpdateRequest<ProtocolServiceUpdateProtocolRequest>(
        defaultRequest,
        properties,
      );
    await protocolClient.updateProtocol(request);
    onSuccess();
  };

  const handleClose = () => {
    setSelectedVersion(null);
    setIsVisibilityModalOpen(false);
  };

  const handleSelectVersion = (version: ProtocolVersion) => {
    setIsVisibilityModalOpen(true);
    setSelectedVersion(version);
  };

  const updateVersion = async () => {
    setIsUpdating(true);

    if (!selectedVersion) return;

    try {
      await protocolClient.updateVersion({
        protocolVersionId: selectedVersion.protocolVersionId,
        visibility: selectedVersion.visibility,
      });

      handleRefreshed();

      toast.success('Version Updated');

      setIsVisibilityModalOpen(false);
      setSelectedVersion(null);
    } catch (err) {
      toast.error('Error Updating Version');
    } finally {
      setIsUpdating(false);
    }
  };

  return (
    <>
      <AdminProtocolVersionEdit
        isOpen={isVisibilityModalOpen}
        isUpdating={isUpdating}
        onUpdate={updateVersion}
        onClose={handleClose}
        onSelectVersion={handleSelectVersion}
        selectedVersion={selectedVersion}
      />
      <AdminDetail
        shouldRefresh={shouldRefresh}
        onRefreshed={handleRefreshed}
        onSaveChanges={handleSaveChanges}
        getItem={getItem}
        detailsName="name"
        ignoreItems={[
          'name',
          'key',
          'protocolId',
          'nodeTypes',
          'stats',
          'visibility',
          'updatedAt',
          'orgId',
          'versions',
        ]}
        customItems={customItems}
      />
    </>
  );
};
