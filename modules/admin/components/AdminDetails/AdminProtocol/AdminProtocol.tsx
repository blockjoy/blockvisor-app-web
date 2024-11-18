import { useRouter } from 'next/router';
import { css } from '@emotion/react';
import { protocolClient } from '@modules/grpc';
import { Protocol } from '@modules/grpc/library/blockjoy/v1/protocol';
import { AdminDetail } from '../AdminDetail/AdminDetail';
// import { AdminBlockchainVersionAdd } from './AdminProtocolVersionAdd/AdminBlockchainVersionAdd';
import { breakpoints } from 'styles/variables.styles';
import { ITheme } from 'types/theme';
import { useState } from 'react';
import { delay } from '@shared/utils/delay';

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

  const customItems = (item: Protocol): AdminDetailProperty[] => [
    {
      id: 'name',
      label: 'Name',
      data: item.name,
      copyValue: item.name,
    },
    // {
    //   id: 'displayName',
    //   label: 'Display Name',
    //   data: item.displayName,
    //   copyValue: item.displayName,
    // },
    {
      id: 'protocolId',
      label: 'Protocol Id',
      data: item.protocolId,
      copyValue: item.protocolId,
    },
    // {
    //   id: 'visibilityText',
    //   label: 'Visibility',
    //   data: capitalize(
    //     BlockchainVisibility[item.visibility]
    //       ?.toString()
    //       ?.replace('BLOCKCHAIN_VISIBILITY_', '')
    //       ?.toLowerCase(),
    //   ),
    // },
    // ...[...renderVersions(item)],
  ];

  return (
    <AdminDetail
      shouldRefresh={shouldRefresh}
      onRefreshed={handleRefreshed}
      getItem={getItem}
      detailsName="name"
      ignoreItems={[
        'name',
        'protocolId',
        'nodeTypes',
        'stats',
        'visibility',
        'updatedAt',
      ]}
      customItems={customItems}
      // additionalHeaderButtons={
      //   <AdminBlockchainVersionAdd onRefreshed={handleRefreshed} />
      // }
    />
  );
};
