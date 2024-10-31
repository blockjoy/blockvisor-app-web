import { useState } from 'react';
import { Global, SerializedStyles } from '@emotion/react';
import { Tag } from '@modules/grpc/library/blockjoy/common/v1/tag';
import { Tag as SingleTag } from './Tag';
import { TagsDropdown } from './TagsDropdown/TagsDropdown';
import { globalStyles, styles } from './Tags.styles';

type TagsProps = {
  name?: string;
  tags?: Tag[];
  inactiveTags?: Tag[];
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
  autoHide,
  itemsPerView,
  additionalStyles,
  handleNew,
  handleRemove,
}: TagsProps) => {
  const [isOpen, setIsOpen] = useState(false);

  const visibleTags = tags?.slice(0, itemsPerView ?? 3) ?? [];

  const handleWrapperClick = (e: React.MouseEvent<HTMLSpanElement>) => {
    e.stopPropagation();
  };

  const handleOpen = (open: boolean = true) => setIsOpen(open);

  const shouldAutoHide = autoHide && !Boolean(tags?.length) && !isOpen;

  return (
    <>
      {isOpen && <Global styles={globalStyles} />}
      <div
        css={[
          styles.wrapper(shouldAutoHide, Boolean(tags?.length)),
          additionalStyles && additionalStyles,
        ]}
        {...(isOpen && { onClick: handleWrapperClick })}
        className="tags"
      >
        <div
          css={styles.list}
          {...(!isOpen && { onClick: handleWrapperClick })}
        >
          {visibleTags?.map((tag) => (
            <SingleTag
              key={tag.name}
              tag={tag}
              // handleUpdate={handleUpdate}
              handleRemove={handleRemove}
              // maxWidth={maxWidth}
            />
          ))}
        </div>
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
