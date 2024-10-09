import { useMemo, useRef } from 'react';
import { Tag } from '@modules/grpc/library/blockjoy/common/v1/tag';
import { Dropdown, SvgIcon, withSearchDropdown } from '@shared/components';
import { Tag as SingleTag } from '../Tag';
import { styles } from './TagsDropdown.styles';
import IconTag from '@public/assets/icons/common/Tag.svg';

type TagsProps = {
  name?: string;
  isOpen: boolean;
  handleOpen: (open?: boolean) => void;
  tags?: Tag[];
  inactiveTags?: Tag[];
  // colors?: TagColor;
  handleNew?: (tag: string) => void;
  handleRemove?: (tag: Tag) => void;
};

export const TagsDropdown = ({
  name,
  isOpen,
  handleOpen,
  tags,
  inactiveTags = [],
  // colors,
  handleNew,
  handleRemove,
}: TagsProps) => {
  const dropdownButtonRef = useRef<HTMLButtonElement | null>(null);

  const handleSubmit = (tag: string) => {
    handleOpen(false);
    handleNew?.(tag);
  };

  const TagsDropdownWSearch = useMemo(
    () =>
      withSearchDropdown<Tag>(Dropdown, {
        searchPlaceholder: 'Search or Create new',
        emptyMessage: tags?.length ? 'Create a new tag' : 'No tags created',
        addNewMessage: 'Press Enter to create a new tag',
        onSubmit: handleSubmit,
      }),
    [tags?.length, inactiveTags.length],
  );

  const handleSelected = (tag: Tag | null) => {
    if (!tag?.name) return;

    handleNew?.(tag.name);
  };

  const renderItem = (item: Tag) => (
    <SingleTag
      tag={item}
      // color={colors?.[item.name]}
      /*handleUpdate={handleUpdate} */
    />
  );

  const dropdownItemStyles = (item: Tag) => [styles.dropdownItem];

  const invisibleTags = tags?.slice(3) ?? [];

  const renderHeader = useMemo(
    () =>
      invisibleTags.length ? (
        <div css={styles.dropdownHeader}>
          {invisibleTags.map((tag) => (
            <SingleTag
              key={tag.name}
              tag={tag}
              // color={colors?.[tag.name]}
              // handleUpdate={handleUpdate}
              handleRemove={handleRemove}
            />
          ))}
        </div>
      ) : null,
    [invisibleTags, handleRemove],
  );

  const renderButtonText = useMemo(
    () =>
      invisibleTags.length ? (
        <>+{invisibleTags.length}</>
      ) : (
        <SvgIcon isDefaultColor size="20px">
          <IconTag />
        </SvgIcon>
      ),
    [invisibleTags],
  );

  return (
    <TagsDropdownWSearch
      items={inactiveTags}
      itemKey={name}
      handleSelected={handleSelected}
      selectedItem={null}
      isOpen={isOpen}
      handleOpen={handleOpen}
      noBottomMargin={true}
      hideDropdownIcon={true}
      renderHeader={renderHeader}
      renderButtonText={renderButtonText}
      renderItem={renderItem}
      dropdownButtonRef={dropdownButtonRef}
      dropdownButtonStyles={[
        styles.dropdownButtonMain(isOpen),
        invisibleTags.length ? styles.dropdownCount : styles.dropdownButton,
      ]}
      dropdownMenuStyles={[styles.dropdown]}
      dropdownItemStyles={dropdownItemStyles}
      dropdownScrollbarStyles={[styles.dropdownScrollbar]}
      dropdownMenuPosition={styles.dropdownMenuPosition}
    />
  );
};
