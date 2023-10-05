import { useNodeView } from '@modules/node/hooks/useNodeView';
import { useRouter } from 'next/router';

export const NodeViewJobView = () => {
  const { node } = useNodeView();

  const router = useRouter();
  const { name } = router.query;

  const job = node?.jobs.find((job) => job.name === (name as string));

  return (
    <>
      <h2>{job?.name}</h2>
      Progress {job?.progress}%{job?.logs.map((log) => log)}
    </>
  );
};
