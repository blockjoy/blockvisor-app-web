import { styles } from './NodeView.styles';
import { useNodeView } from '@modules/node/hooks/useNodeView';
import { useRouter } from 'next/router';
import { useEffect, useState } from 'react';
import {
  DangerZone,
  DetailsTable,
  EmptyColumn,
  PageSection,
  Skeleton,
  SkeletonGrid,
  TableSkeleton,
} from '@shared/components';
import { NodeViewDetailsHeader } from './NodeViewDetailsHeader';
import { NodeViewConfig } from './NodeViewConfig';
import { NodeViewPageTitle } from './NodeViewPageTitle';
import { NodeViewCharts } from './NodeViewCharts';
import { NodeViewQuickEdit } from './QuickEdit/NodeViewQuickEdit';
import { mapNodeToDetails } from '@modules/node/utils/mapNodeToDetails';

export function NodeView() {
  const [nodeError, setNodeError] = useState<boolean>(false);
  const [isDeleting, setIsDeleting] = useState<boolean>(false);

  const router = useRouter();
  const { id } = router.query;

  const {
    node,
    loadNode,
    unloadNode,
    deleteNode,
    stopNode,
    restartNode,
    isLoading,
  } = useNodeView();

  const handleStop = () => stopNode(id);
  const handleRestart = () => restartNode(id!);
  const handleDelete = () => {
    setIsDeleting(true);
    deleteNode(id);
  };
  const handleNodeError = () => setNodeError(true);

  useEffect(() => {
    window.scrollTo(0, 0);
    if (router.isReady) {
      loadNode(id, handleNodeError);
      setIsDeleting(false);
    }

    return () => unloadNode();
  }, [id]);

  return (
    <>
      <NodeViewPageTitle />
      <div css={styles.wrapper}>
        <div css={styles.content}>
          <PageSection bottomBorder={false} topPadding={false}>
            {!isLoading ? (
              <>
                {!nodeError && node?.id ? (
                  <>
                    <NodeViewDetailsHeader
                      handleStop={handleStop}
                      handleRestart={handleRestart}
                      status={node?.status!}
                      blockchainName={node?.blockchainName!}
                      title={node?.name!}
                      ip={node?.ip!}
                      date={node?.createdAt!}
                      id={node?.id!}
                    />
                    {/* <NodeViewCharts nodeId={node?.id!} /> */}
                    <DetailsTable bodyElements={mapNodeToDetails(node!)} />
                  </>
                ) : (
                  <EmptyColumn
                    title="Node Not Found"
                    description="No node exists with this ID"
                  />
                )}
              </>
            ) : (
              <>
                <SkeletonGrid padding="10px 0 70px">
                  <Skeleton width="260px" />
                  <Skeleton width="180px" />
                </SkeletonGrid>
                <TableSkeleton />
              </>
            )}
          </PageSection>
          {node?.properties && !isLoading && !nodeError && (
            <PageSection bottomBorder={false}>
              <NodeViewConfig />
            </PageSection>
          )}
          {!nodeError && !isLoading && node?.id && (
            <PageSection bottomBorder={false}>
              <DangerZone
                isLoading={isDeleting}
                elementName="Node"
                elementNameToCompare={node?.name!}
                handleAction={handleDelete}
              ></DangerZone>
            </PageSection>
          )}
        </div>
        <div css={styles.quickEdit}>
          <h2 css={styles.formHeader}>
            <NodeViewQuickEdit />
          </h2>
        </div>
      </div>
    </>
  );
}
