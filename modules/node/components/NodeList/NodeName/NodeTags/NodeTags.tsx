import { useRecoilValue } from 'recoil';
import { SerializedStyles } from '@emotion/react';
import { Tag } from '@modules/grpc/library/blockjoy/common/v1/tag';
import { Node } from '@modules/grpc/library/blockjoy/v1/node';
import { useNodeUpdate, nodeSelectors, nodeAtoms } from '@modules/node';
import { Tags } from '@shared/components';

type NodeTagsProps = {
  node: Node;
  itemsPerView?: number;
  autoHide?: boolean;
  additionalStyles?: SerializedStyles[];
};

export const NodeTags = ({
  node,
  itemsPerView,
  autoHide = true,
  additionalStyles,
}: NodeTagsProps) => {
  const nodeLoadingState = useRecoilValue(nodeAtoms.nodeLoadingState);

  const nodeTags = node?.tags?.tags ?? [];
  const inactiveTags = useRecoilValue(nodeSelectors.inactiveTags(nodeTags));

  const { updateNode } = useNodeUpdate();

  const handleNewTag = async (tag: string) => {
    if (!node?.id) return;

    await updateNode({
      ids: [node?.id!],
      updateTags: { addTag: { name: tag } },
    });
  };

  const handleRemoveTag = async (tag: Tag) => {
    if (!node?.id) return;

    const newTags: Tag[] =
      node.tags?.tags.filter((nodeTag) => nodeTag.name !== tag.name) ?? [];

    await updateNode({
      ids: [node?.id!],
      updateTags: { overwriteTags: { tags: newTags } },
    });
  };

  return (
    <Tags
      name={node.id}
      tags={nodeTags}
      inactiveTags={inactiveTags}
      autoHide={autoHide}
      itemsPerView={itemsPerView}
      isLoading={nodeLoadingState !== 'finished'}
      handleNew={handleNewTag}
      handleRemove={handleRemoveTag}
      additionalStyles={additionalStyles}
    />
  );
};
