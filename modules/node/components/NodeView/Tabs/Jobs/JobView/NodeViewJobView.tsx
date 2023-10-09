import { useNodeView } from '@modules/node/hooks/useNodeView';
import { DetailsTable, FormHeaderCaps } from '@shared/components';
import { ROUTES } from '@shared/constants/routes';
import { useRouter } from 'next/router';
import { spacing } from 'styles/utils.spacing.styles';
import { styles } from './NodeViewJobView.styles';
import { NodeViewJobViewLogs } from './JobViewLogs/NodeViewJobViewLogs';

export const NodeViewJobView = () => {
  const { node } = useNodeView();

  const router = useRouter();
  const { name } = router.query;

  const job = node?.jobs.find((job) => job.name === (name as string));

  const handleBackClicked = () => router.push(`${ROUTES.NODE(node?.id!)}/jobs`);

  return (
    <section css={styles.wrapper}>
      <div css={styles.breadcrumb}>
        <a onClick={handleBackClicked} css={styles.backButton}>
          Jobs
        </a>
        <span css={styles.separator}>/</span>
        <h3 css={styles.title}>{job?.name}</h3>
      </div>
      <DetailsTable
        bodyElements={[
          {
            label: 'Restarts',
            data: job?.restarts,
          },
          {
            label: 'Exit Code',
            data: job?.exitCode || '-',
          },
          {
            label: 'Message',
            data: job?.message || '-',
          },
        ]}
      />
      <div css={spacing.top.xLarge}>
        <FormHeaderCaps>Logs</FormHeaderCaps>
        <NodeViewJobViewLogs job={job!} />
      </div>
    </section>
  );
};
