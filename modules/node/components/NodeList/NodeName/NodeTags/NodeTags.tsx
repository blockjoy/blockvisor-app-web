import { useRecoilValue } from 'recoil';
import { Tag } from '@modules/grpc/library/blockjoy/common/v1/tag';
import { Node } from '@modules/grpc/library/blockjoy/v1/node';
import { useNodeUpdate, nodeSelectors } from '@modules/node';
import { Tags } from '@shared/components';
import { TAG_COLORS, DEFAULT_TAG_COLOR } from '@shared/index';

type NodeTagsProps = {
  node: Node;
};

export const NodeTags = ({ node }: NodeTagsProps) => {
  const nodeTags = node?.tags?.tags ?? [];
  const allTags = useRecoilValue(nodeSelectors.nodesTagsAll);
  const inactiveTags = useRecoilValue(nodeSelectors.inactiveTags(nodeTags));

  const { updateNode } = useNodeUpdate();

  const handleNewTag = (tag: string) => {
    if (!node?.id) return;

    updateNode({ ids: [node?.id!], updateTags: { addTag: { name: tag } } });
  };

  const handleRemoveTag = (tag: Tag) => {
    if (!node?.id) return;

    const newTags: Tag[] =
      node.tags?.tags.filter((nodeTag) => nodeTag.name !== tag.name) ?? [];

    updateNode({
      ids: [node?.id!],
      updateTags: { overwriteTags: { tags: newTags } },
    });
  };

  // TODO: reimpl colors when avaible, atm random colors assigned
  const colors: TagColor = allTags
    .slice()
    .sort((a, b) => (a.name > b.name ? 1 : -1))
    .reduce((acc, tag, i) => {
      if (tag?.name) {
        acc[tag.name] = TAG_COLORS[i] ?? DEFAULT_TAG_COLOR;
      }
      return acc;
    }, {});

  return (
    <Tags
      name={node.id}
      tags={nodeTags}
      // colors={colors}
      inactiveTags={inactiveTags}
      handleNew={handleNewTag}
      handleRemove={handleRemoveTag}
    />
  );
};
