import { PageTitle } from '@shared/components';
import { useRouter } from 'next/router';
import { ROUTES } from '@shared/constants/routes';
import { useNodeView } from '@modules/node';
import IconNode from '@public/assets/icons/app/Node.svg';

export const NodeViewTitle = () => {
  const router = useRouter();

  const { node, isLoading } = useNodeView();

  const handleNodesClicked = () => router.push(ROUTES.NODES);

  return (
    <PageTitle
      title="Nodes"
      icon={<IconNode />}
      onTitleClick={handleNodesClicked}
      isLoading={isLoading}
      childTitle={node?.id}
      canCopyChild
    />
  );
};
