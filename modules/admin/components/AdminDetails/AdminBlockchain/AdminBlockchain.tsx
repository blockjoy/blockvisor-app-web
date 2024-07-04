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
import { breakpoints } from 'styles/variables.styles';
import { ITheme } from 'types/theme';

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

export const AdminBlockchain = () => {
  const router = useRouter();
  const { id } = router.query;

  const getItem = async () =>
    await blockchainClient.getBlockchain(id as string);

  const customItems = (item: Blockchain): AdminDetailProperty[] => [
    {
      id: 'name',
      label: 'Name',
      data: item.name,
      copyValue: item.name,
    },
    {
      id: 'displayName',
      label: 'Display Name',
      data: item.displayName,
      copyValue: item.displayName,
    },
    { id: 'id', label: 'Id', data: item.id, copyValue: item.id },
    {
      id: 'visibilityText',
      label: 'Visibility',
      data: capitalize(
        BlockchainVisibility[item.visibility]
          ?.toString()
          ?.replace('BLOCKCHAIN_VISIBILITY_', '')
          ?.toLowerCase(),
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
              {version.description && (
                <span css={styles.versionDescription}>
                  {version.description}
                </span>
              )}
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
        'displayName',
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
