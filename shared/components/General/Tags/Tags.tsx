import { useEffect, useRef, useState } from 'react';
import { Global } from '@emotion/react';
import { Tag } from '@modules/grpc/library/blockjoy/common/v1/tag';
import { Tag as SingleTag } from './Tag';
import { TagsDropdown } from './TagsDropdown/TagsDropdown';
import { globalStyles, styles } from './Tags.styles';

type TagsProps = {
  name?: string;
  tags?: Tag[];
  inactiveTags?: Tag[];
  // colors?: TagColor;
  handleNew?: (tag: string) => void;
  handleRemove?: (tag: Tag) => void;
};

export const Tags = ({
  name,
  tags,
  inactiveTags = [],
  // colors,
  handleNew,
  handleRemove,
}: TagsProps) => {
  const [isOpen, setIsOpen] = useState(false);
  const [isContainerAvailable, setIsContainerAvailable] = useState(false);

  const containerRef = useRef<HTMLDivElement | null>(null);

  useEffect(() => {
    if (containerRef.current) setIsContainerAvailable(true);
  }, []);

  const containerWidth = containerRef.current?.offsetWidth;
  const visibleTags = tags?.slice(0, 3) ?? [];

  const handleWrapperClick = (e: React.MouseEvent<HTMLSpanElement>) => {
    e.stopPropagation();
  };

  const handleOpen = (open: boolean = true) => setIsOpen(open);

  const maxWidth = containerWidth
    ? (containerWidth - 32) / visibleTags.length
    : undefined;

  return (
    <>
      {isOpen && <Global styles={globalStyles} />}
      <div css={styles.wrapper} ref={containerRef} onClick={handleWrapperClick}>
        {Boolean(visibleTags.length) && isContainerAvailable && (
          <div css={styles.list}>
            {visibleTags?.map((tag) => (
              <SingleTag
                key={tag.name}
                tag={tag}
                // color={colors?.[tag.name]}
                // handleUpdate={handleUpdate}
                handleRemove={handleRemove}
                maxWidth={maxWidth}
              />
            ))}
          </div>
        )}
        <TagsDropdown
          name={name}
          isOpen={isOpen}
          handleOpen={handleOpen}
          tags={tags}
          // colors={colors}
          inactiveTags={inactiveTags}
          handleNew={handleNew}
          handleRemove={handleRemove}
        />
      </div>
    </>
  );
};
