import { useEffect, useRef, useState } from 'react';
import { Global, SerializedStyles } from '@emotion/react';
import { Tag } from '@modules/grpc/library/blockjoy/common/v1/tag';
import { Tag as SingleTag } from './Tag';
import { TagsDropdown } from './TagsDropdown/TagsDropdown';
import { globalStyles, styles } from './Tags.styles';

type TagsProps = {
  name?: string;
  tags?: Tag[];
  inactiveTags?: Tag[];
  isLoading?: boolean;
  autoHide?: boolean;
  itemsPerView?: number;
  additionalStyles?: SerializedStyles[];
  handleNew?: (tag: string) => void;
  handleRemove?: (tag: Tag) => void;
};

export const Tags = ({
  name,
  tags,
  inactiveTags = [],
  isLoading,
  autoHide,
  itemsPerView,
  additionalStyles,
  handleNew,
  handleRemove,
}: TagsProps) => {
  const [isOpen, setIsOpen] = useState(false);
  const [isContainerAvailable, setIsContainerAvailable] = useState(false);

  const containerRef = useRef<HTMLDivElement | null>(null);

  useEffect(() => {
    if (containerRef.current && !isLoading) setIsContainerAvailable(true);
  }, [isLoading]);

  const containerWidth = containerRef.current?.offsetWidth;
  const visibleTags = tags?.slice(0, itemsPerView ?? 3) ?? [];

  const handleWrapperClick = (e: React.MouseEvent<HTMLSpanElement>) => {
    e.stopPropagation();
  };

  const handleOpen = (open: boolean = true) => setIsOpen(open);

  const maxWidth = containerWidth
    ? (containerWidth - 32) / visibleTags.length
    : undefined;

  const shouldAutoHide = autoHide && !Boolean(tags?.length) && !isOpen;

  return (
    <>
      {isOpen && <Global styles={globalStyles} />}
      <div
        css={[
          styles.wrapper(shouldAutoHide, Boolean(tags?.length)),
          additionalStyles && additionalStyles,
        ]}
        ref={containerRef}
        onClick={handleWrapperClick}
        className="tags"
      >
        {Boolean(visibleTags.length) && isContainerAvailable && (
          <div css={styles.list}>
            {visibleTags?.map((tag) => (
              <SingleTag
                key={tag.name}
                tag={tag}
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
          inactiveTags={inactiveTags}
          handleNew={handleNew}
          handleRemove={handleRemove}
          itemsPerView={itemsPerView}
        />
      </div>
    </>
  );
};
