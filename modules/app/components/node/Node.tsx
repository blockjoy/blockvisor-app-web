import { useRecoilState } from 'recoil';

import { layoutState } from '@modules/layout/store';

import { PageSection, PageHeader, BlockButton } from '../shared';
import { BackButton } from '@shared/components/BackButton/BackButton';
import { DetailsHeader } from '../shared/details-header/DetailsHeader';
import { DetailsTable } from '../shared/details-table/DetailsTable';
import { DangerZone } from '../shared/danger-zone/DangerZone';

const tableElements = [
  {
    label: 'Type',
    data: 'Node/api',
  },
  {
    label: 'Blockchain',
    data: 'Bitcoin',
  },
  {
    label: 'Host',
    data: 'BlockJoy Host',
  },
  {
    label: 'Wallet address',
    data: 'mizAjYud6o9oLh2UZH13o9zyR9crKYRPEm',
  },
  {
    label: 'Version',
    data: '1.6.2',
  },
  {
    label: 'Block Height',
    data: '1206202',
  },
];

export default () => {
  const [layout, setLayout] = useRecoilState(layoutState);

  return (
    <>
      <PageSection>
        <PageHeader>
          <BackButton />
        </PageHeader>
        <DetailsHeader
          status="consensus"
          title="YellowBeaver"
          ip="212.213.214.2"
          date="5 weeks ago"
          id="cv0983t48cv09820348"
        />
        <DetailsTable bodyElements={tableElements} />
      </PageSection>
      <PageSection>chart</PageSection>
      <PageSection>
        <DangerZone handleDelete={() => console.log('handle delete')}>
          <p>No longer need this node?</p>
          <small>Click the button below to delete it.</small>
        </DangerZone>
      </PageSection>
    </>
  );
};
