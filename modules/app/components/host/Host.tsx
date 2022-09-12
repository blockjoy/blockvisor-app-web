import { useRouter } from 'next/router';
import { PageSection, PageHeader } from '../shared';
import { BackButton } from '@shared/components/BackButton/BackButton';
import { DangerZone } from '../shared/danger-zone/DangerZone';
import { DetailsHeader } from '../shared/details-header/DetailsHeader';
import { DetailsTable } from '../shared/details-table/DetailsTable';
import { useHost } from '@modules/app/hooks/useHost';
import { useEffect } from 'react';

export default () => {
  const router = useRouter();
  const { id } = router.query;
  const { loadHost } = useHost();

  useEffect(() => {
    if (id) {
      loadHost(id.toString());
    }
  }, []);

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
      <PageSection>nodes list</PageSection>
      <PageSection>
        <DangerZone handleDelete={() => console.log('handle delete')}>
          <p>No longer need this node?</p>
          <small>Click the button below to delete it.</small>
        </DangerZone>
      </PageSection>
    </>
  );
};
