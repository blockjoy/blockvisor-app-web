import { styles } from './NodeView.styles';
import { useNodeView } from '@modules/node/hooks/useNodeView';
import { useRouter } from 'next/router';
import { ReactNode, useEffect } from 'react';
import { NodeViewTitle } from './Title/NodeViewTitle';
import { NodeViewHeader } from './Header/NodeViewHeader';
import { NodeViewSidePanel } from './SidePanel/NodeViewSidePanel';
import { NodeViewTabs } from './Tabs/NodeViewTabs';
import { wrapper } from 'styles/wrapper.styles';
import { EmptyColumn, SkeletonView } from '@shared/components';
import { useCommands } from '@modules/commands';

type Props = {
  children?: ReactNode;
  hideEditPanel?: boolean;
};

export const NodeView = ({ children, hideEditPanel }: Props) => {
  const router = useRouter();
  const { id } = router.query;

  const { node, loadNode, unloadNode, isLoading, setIsLoading } = useNodeView();
  const { getCommands } = useCommands();

  useEffect(() => {
    if (router.isReady) {
      loadNode(id);
      getCommands({ nodeId: id });
    }

    return () => {
      setIsLoading('loading');
      unloadNode();
    };
  }, [id]);

  return (
    <>
      <NodeViewTitle />

      {isLoading ? (
        <div css={[styles.wrapper, wrapper.main]}>
          <div css={styles.loader}>
            <SkeletonView />
          </div>
        </div>
      ) : !node?.id ? (
        <EmptyColumn
          title="Node Not Found"
          description="No node exists with this ID"
        />
      ) : (
        <>
          <NodeViewHeader />
          <NodeViewTabs />
          <div css={[styles.wrapper, wrapper.main]}>
            <>
              <div css={styles.content}>{children}</div>
              {!hideEditPanel && (
                <div css={styles.sidePanel}>
                  <NodeViewSidePanel />
                </div>
              )}
            </>
          </div>
        </>
      )}
    </>
  );
};
