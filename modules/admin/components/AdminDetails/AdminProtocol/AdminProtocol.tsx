import { useRouter } from 'next/router';
import { css } from '@emotion/react';
import { protocolClient } from '@modules/grpc';
import {
  Protocol,
  ProtocolServiceUpdateProtocolRequest,
} from '@modules/grpc/library/blockjoy/v1/protocol';
import { AdminDetail } from '../AdminDetail/AdminDetail';
import { breakpoints } from 'styles/variables.styles';
import { ITheme } from 'types/theme';
import { useState } from 'react';
import { delay } from '@shared/utils/delay';
import {
  createAdminUpdateRequest,
  createDropdownValuesFromEnum,
} from '@modules/admin/utils';
import { Visibility } from '@modules/grpc/library/blockjoy/common/v1/protocol';
import { capitalize } from 'utils/capitalize';

const styles = {
  versionList: css`
    @media ${breakpoints.fromLrg} {
      columns: 2;

      li {
        padding-right: 30px;
      }
    }

    @media ${breakpoints.fromXLrg} {
      columns: 3;

      li {
        padding-right: 30px;
      }
    }
  `,
  versionDescription: (theme: ITheme) => css`
    color: ${theme.colorDefault};
    margin-left: 10px;
    font-size: 14px;
  `,
};

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

  // TODO: render versions
  // const renderVersions = (item: Protocol) => {
  //   const versions: any[] = [];

  //   item.versions.forEach((version) => {
  //     versions.push({
  //       id: `blockchainVersion${version}`,
  //       label: `${capitalize(
  //         convertNodeTypeToName(nodeType.nodeType),
  //       )} Versions`,
  //       data: (
  //         <ul css={nodeType.versions.length >= 10 && styles.versionList}>
  //           {sortVersions(nodeType.versions).map((version) => (
  //             <li key={version.id} css={spacing.bottom.small}>
  //               {version.version}
  //               {version.description && (
  //                 <span css={styles.versionDescription}>
  //                   {version.description}
  //                 </span>
  //               )}
  //             </li>
  //           ))}
  //         </ul>
  //       ),
  //     });
  //   });

  //   return versions;
  // };

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

  const customItems = (item: Protocol): AdminDetailProperty[] => [
    {
      id: 'name',
      label: 'Name',
      data: item.name,
      copyValue: item.name,
      editSettings: {
        field: 'name',
        isNumber: false,
        controlType: 'text',
        defaultValue: item.name,
      },
    },
    {
      id: 'protocolId',
      label: 'Protocol Id',
      data: item.protocolId,
      copyValue: item.protocolId,
    },
    {
      id: 'visibilityText',
      label: 'Visibility',
      data: capitalize(
        Visibility[item.visibility]
          ?.toString()
          ?.replace('VISIBILITY_', '')
          ?.toLowerCase(),
      ),
      editSettings: {
        field: 'visibility',
        isNumber: true,
        controlType: 'dropdown',
        dropdownValues: createDropdownValuesFromEnum(Visibility, 'VISIBILITY_'),
        defaultValue: item.visibility?.toString(),
      },
    },
    {
      id: 'orgId',
      label: 'Org Id',
      data: item.orgId,
    },
    // ...[...renderVersions(item)],
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
        'protocolId',
        'nodeTypes',
        'stats',
        'visibility',
        'updatedAt',
        'orgId',
      ]}
      customItems={customItems}
    />
  );
};
