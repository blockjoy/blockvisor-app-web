import { useRouter } from 'next/router';
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
        <ul>
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
