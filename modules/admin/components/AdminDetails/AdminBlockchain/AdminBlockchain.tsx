import { useRouter } from 'next/router';
import { css } from '@emotion/react';
import { blockchainClient } from '@modules/grpc';
import {
  Blockchain,
  BlockchainVisibility,
} from '@modules/grpc/library/blockjoy/v1/blockchain';
import { capitalize } from 'utils/capitalize';
import { AdminDetail } from '../AdminDetail/AdminDetail';
import { AdminBlockchainVersionAdd } from './AdminBlockchainVersionAdd/AdminBlockchainVersionAdd';
import { spacing } from 'styles/utils.spacing.styles';
import { sortVersions } from '@modules/node';
import { getBlockchainDisplayName } from '@shared/utils/getBlockchainDisplayName';
import { breakpoints } from 'styles/variables.styles';

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
};

export const AdminBlockchain = () => {
  const router = useRouter();
  const { id } = router.query;

  const getItem = async () =>
    await blockchainClient.getBlockchain(id as string);

  const customItems = (item: Blockchain): AdminDetailProperty[] => [
    {
      id: 'name',
      label: 'Name',
      data: getBlockchainDisplayName(item.name),
      copyValue: getBlockchainDisplayName(item.name),
    },
    { id: 'id', label: 'Id', data: item.id, copyValue: item.id },
    {
      id: 'visibilityText',
      label: 'Visibility',
      data: capitalize(
        BlockchainVisibility[item.visibility]
          ?.toString()
          .replace('BLOCKCHAIN_VISIBILITY_', '')
          .toLowerCase(),
      ),
    },
    {
      id: 'versions',
      label: 'Versions',
      data: (
        <ul css={item.nodeTypes[0].versions.length >= 10 && styles.versionList}>
          {sortVersions(item.nodeTypes[0].versions).map((version) => (
            <li key={version.id} css={spacing.bottom.small}>
              {version.version}
            </li>
          ))}
        </ul>
      ),
    },
  ];

  return (
    <AdminDetail
      getItem={getItem}
      detailsName="name"
      ignoreItems={[
        'name',
        'id',
        'nodeTypes',
        'stats',
        'visibility',
        'updatedAt',
      ]}
      customItems={customItems}
      additionalHeaderButtons={<AdminBlockchainVersionAdd />}
    />
  );
};
