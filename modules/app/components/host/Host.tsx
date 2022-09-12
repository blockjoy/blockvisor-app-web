import { useRecoilState } from 'recoil';

import { layoutState } from '@modules/layout/store';

import { PageSection, PageHeader } from '../shared';
import { BackButton } from '@shared/components/BackButton/BackButton';
import { DangerZone } from '../shared/danger-zone/DangerZone';
import { DetailsHeader } from '../shared/details-header/DetailsHeader';
import { DetailsTable } from '../shared/details-table/DetailsTable';

const tableElements = [
  {
    label: 'Created',
    data: '05/23/2022',
  },
  {
    label: 'Version',
    data: '1.6.2',
  },
  {
    label: 'Disk Size',
    data: '1TB',
  },
  {
    label: 'Memory size',
    data: '64GB',
  },
];

export default () => {
  const [layout, setLayout] = useRecoilState(layoutState);

  const handleAddHost = () => {
    setLayout({
      ...layout,
      isHostsAddOpen: true,
    });
  };

  return (
    <>
      <PageSection>
        <PageHeader>
          <BackButton />
        </PageHeader>
        <DetailsHeader
          title="MyHost12"
          ip="212.213.214.2"
          status="pending"
          location="Zagreb, Croatia"
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
