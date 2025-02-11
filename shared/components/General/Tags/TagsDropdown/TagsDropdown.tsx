import { useMemo, useRef } from 'react';
import { useRecoilValue } from 'recoil';
import { Tag } from '@modules/grpc/library/blockjoy/common/v1/tag';
import { layoutSelectors } from '@modules/layout';
import { TAG_VALIDATION_MESSAGES, TAG_VALIDATION_REGEX } from '@shared/index';
import { Dropdown, SvgIcon, withSearchDropdown } from '@shared/components';
import { Tag as SingleTag } from '../Tag';
import { styles } from './TagsDropdown.styles';
import IconTag from '@public/assets/icons/common/Tag.svg';

type TagsProps = {
  name?: string;
  isOpen: boolean;
  tags?: Tag[];
  inactiveTags?: Tag[];
  itemsPerView?: number;
  handleOpen: (open?: boolean) => void;
  handleNew?: (tag: string) => void;
  handleRemove?: (tag: Tag) => void;
};

export const TagsDropdown = ({
  name,
  isOpen,
  tags,
  inactiveTags = [],
  itemsPerView,
  handleOpen,
  handleNew,
  handleRemove,
}: TagsProps) => {
  const isSidebarOpen = useRecoilValue(layoutSelectors.isSidebarOpen);
  const dropdownButtonRef = useRef<HTMLButtonElement | null>(null);

  const handleSubmit = (tag: string) => {
    handleOpen(false);
    handleNew?.(tag);
  };

  const handleValidate = (value?: string) => {
    if (!value?.trim()) return TAG_VALIDATION_MESSAGES?.required;

    if (value.length < 3) return TAG_VALIDATION_MESSAGES?.minLength;

    if (!TAG_VALIDATION_REGEX.test(value))
      return TAG_VALIDATION_MESSAGES?.invalidFormat;

    return '';
  };

  const TagsDropdownWSearch = useMemo(
    () =>
      withSearchDropdown<Tag>(Dropdown, {
        searchPlaceholder: 'Search or Create new',
        emptyMessage: tags?.length ? 'Create a new tag' : 'No tags created',
        addNewMessage: 'Press Enter to create a new tag',
        onSubmit: handleSubmit,
        validation: {
          required: TAG_VALIDATION_MESSAGES.required,
          callback: handleValidate,
        },
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
      isInner
      /*handleUpdate={handleUpdate} */
    />
  );

  const dropdownItemStyles = (item: Tag) => [styles.dropdownItem];

  const invisibleTags = tags?.slice(itemsPerView ?? 3) ?? [];

  const renderHeader = useMemo(
    () =>
      invisibleTags.length ? (
        <div css={styles.dropdownHeader}>
          {invisibleTags.map((tag) => (
            <SingleTag
              key={tag.name}
              tag={tag}
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

  const dropdownButtonRect =
    dropdownButtonRef?.current?.getBoundingClientRect();

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
      dropdownMenuPosition={[
        styles.dropdownMenuPosition(
          dropdownButtonRect,
          isSidebarOpen,
          tags?.length,
        ),
      ]}
    />
  );
};
