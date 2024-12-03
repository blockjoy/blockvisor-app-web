import { useRecoilValue } from 'recoil';
import { SerializedStyles } from '@emotion/react';
import { Tag } from '@modules/grpc/library/blockjoy/common/v1/tag';
import { Node } from '@modules/grpc/library/blockjoy/v1/node';
import { useNodeUpdate, nodeSelectors } from '@modules/node';
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
  const nodeTags = node?.tags?.tags ?? [];
  const inactiveTags = useRecoilValue(nodeSelectors.inactiveTags(nodeTags));

  const { updateNode } = useNodeUpdate();

  const handleNewTag = async (tag: string) => {
    if (!node?.nodeId) return;

    await updateNode({
      nodeId: node?.nodeId!,
      updateTags: { addTag: { name: tag } },
      newValues: [],
    });
  };

  const handleRemoveTag = async (tag: Tag) => {
    if (!node?.nodeId) return;

    const newTags: Tag[] =
      node.tags?.tags.filter((nodeTag) => nodeTag.name !== tag.name) ?? [];

    await updateNode({
      nodeId: node?.nodeId!,
      updateTags: { overwriteTags: { tags: newTags } },
      newValues: [],
    });
  };

  return (
    <Tags
      name={node.nodeId}
      tags={nodeTags}
      inactiveTags={inactiveTags}
      autoHide={autoHide}
      itemsPerView={itemsPerView}
      handleNew={handleNewTag}
      handleRemove={handleRemoveTag}
      additionalStyles={additionalStyles}
    />
  );
};
