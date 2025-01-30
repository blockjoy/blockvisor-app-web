import { useRouter } from 'next/router';
import { protocolClient } from '@modules/grpc';
import {
  Protocol,
  ProtocolServiceUpdateProtocolRequest,
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

export const AdminProtocol = () => {
  const router = useRouter();
  const { id } = router.query;

  const [shouldRefresh, setShouldRefresh] = useState(false);

  const handleRefreshed = async () => {
    setShouldRefresh(true);
    await delay(250);
    setShouldRefresh(false);
  };

  const getItem = async () => await protocolClient.getProtocol(id as string);

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
        <AdminProtocolVariants protocol={protocol} />
      ),
    },
  ];

  return (
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
  );
};
