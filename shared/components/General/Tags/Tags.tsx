import { useRef, useState, useEffect } from 'react';
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
  adjust?: boolean;
  additionalStyles?: SerializedStyles[];
  handleNew?: (tag: string) => void;
  handleRemove?: (tag: Tag) => void;
};

export const Tags = ({
  name,
  tags = [],
  inactiveTags = [],
  autoHide,
  itemsPerView,
  adjust,
  additionalStyles,
  handleNew,
  handleRemove,
}: TagsProps) => {
  const ref = useRef<HTMLDivElement>(null);

  const [isOpen, setIsOpen] = useState(false);
  const [fitItemsPerPage, setFitItemsPerPage] = useState<number | null>(null);

  useEffect(() => {
    if (ref.current && tags.length && adjust) {
      const width = ref.current.clientWidth;
      const calculated = Math.floor((width - 25) / 55);
      setFitItemsPerPage(calculated);
    }
  }, [ref.current?.clientWidth, tags.length]);

  let localItemsPerView = itemsPerView ?? 3;
  if (fitItemsPerPage && fitItemsPerPage < localItemsPerView) {
    localItemsPerView = fitItemsPerPage;
  }

  const visibleTags = tags?.slice(0, localItemsPerView);

  const handleWrapperClick = (e: React.MouseEvent<HTMLSpanElement>) => {
    e.stopPropagation();
  };

  const handleOpen = (open: boolean = true) => setIsOpen(open);

  const shouldAutoHide = autoHide && !Boolean(tags.length) && !isOpen;

  return (
    <>
      {isOpen && <Global styles={globalStyles} />}
      <div
        ref={ref}
        css={[
          styles.wrapper(shouldAutoHide, Boolean(tags.length)),
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
            <SingleTag key={tag.name} tag={tag} handleRemove={handleRemove} />
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
          itemsPerView={localItemsPerView}
        />
      </div>
    </>
  );
};
