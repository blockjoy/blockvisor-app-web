import { useRecoilState } from 'recoil';

import { layoutState } from '@modules/layout/store';

import { PageSection, PageHeader, BlockButton } from '../shared';
import { BackButton } from '@shared/components/BackButton/BackButton';
import { DetailsHeader } from '../shared/details-header/DetailsHeader';
import { DetailsTable } from '../shared/details-table/DetailsTable';

const tableElements = [
  {
    label: 'test',
    data: 'test',
  },
  {
    label: 'test',
    data: 'test',
  },
  {
    label: 'test',
    data: 'test',
  },
  {
    label: 'test',
    data: 'test',
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
          title="YellowBeaver"
          ip="212.213.214.2"
          date="5 weeks ago"
          id="cv0983t48cv09820348"
        />
        <DetailsTable bodyElements={tableElements} />
      </PageSection>
      <PageSection>chart</PageSection>
      <PageSection>danger zone</PageSection>
    </>
  );
};
