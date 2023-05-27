import { styles } from './NodeView.styles';
import { useNodeView } from '@modules/node/hooks/useNodeView';
import { useRouter } from 'next/router';
import { ReactNode, useEffect, useState } from 'react';
import { NodeViewTitle } from './Title/NodeViewTitle';
import { NodeViewHeader } from './Header/NodeViewHeader';
import { NodeViewEdit } from './Edit/NodeViewEdit';
import { NodeViewTabs } from './Tabs/NodeViewTabs';
import { wrapper } from 'styles/wrapper.styles';
import { EmptyColumn, TableSkeleton } from '@shared/components';

type Props = {
  children: ReactNode;
  hideEditPanel?: boolean;
};

export const NodeView = ({ children, hideEditPanel }: Props) => {
  const [, setNodeError] = useState<boolean>(false);
  const [, setIsDeleting] = useState<boolean>(false);

  const router = useRouter();
  const { id } = router.query;

  const { node, loadNode, unloadNode, isLoading } = useNodeView();

  const handleNodeError = () => setNodeError(true);

  useEffect(() => {
    if (router.isReady) {
      loadNode(id, handleNodeError);
      setIsDeleting(false);
    }
    return () => unloadNode();
  }, [id]);

  return (
    <>
      <NodeViewTitle />
      {!isLoading && !node?.id ? (
        <EmptyColumn
          title="Node Not Found"
          description="No node exists with this ID"
        />
      ) : (
        <>
          {node?.id && (
            <>
              <NodeViewHeader />
              <NodeViewTabs />
            </>
          )}
          <div css={[styles.wrapper, wrapper.main]}>
            {isLoading && !node?.id ? (
              <div css={styles.loader}>
                <TableSkeleton />
              </div>
            ) : (
              <>
                <div css={styles.content}>{children}</div>
                {!hideEditPanel && (
                  <div css={styles.quickEdit}>
                    <NodeViewEdit />
                  </div>
                )}
              </>
            )}
          </div>
        </>
      )}
    </>
  );
};
