import { useRecoilState } from 'recoil';

import { layoutState } from '@modules/layout/store';

import { PageSection, PageHeader, BlockButton } from '../shared';

export default () => {
  const [layout, setLayout] = useRecoilState(layoutState);

  const handleAddHost = () => {
    setLayout({
      ...layout,
      isHostsAddOpen: true,
    });
  };

  return (
    <PageSection>
      <PageHeader>
        Host Edit
        <BlockButton onClick={handleAddHost}>Add Host</BlockButton>
      </PageHeader>
    </PageSection>
  );
};
