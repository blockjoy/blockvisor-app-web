import { useRef, useEffect, MouseEvent } from 'react';
import { Tag } from '@modules/grpc/library/blockjoy/common/v1/tag';
import { Dropdown, SvgIcon } from '@shared/components';
import { UPDATE_TAG_FUNCTIONS } from '@shared/index';
import { TagColors } from '../TagColors/TagColors';
import { styles } from './TagActions.styles';
import IconDots from '@public/assets/icons/common/Dots.svg';
import IconClose from '@public/assets/icons/common/Close.svg';

type TagActionsProps = {
  isOpen: boolean;
  updateMode: TagUpdateMode | null;
  tag: Tag;
  handleUpdate?: (id: string, tag?: Tag) => void;
  handleRemove?: (tag: Tag) => void;
  handleUpdateMode?: (item: TagUpdateItem | null) => void;
  handleOpen?: (open?: boolean) => void;
};

export const TagActions = ({
  isOpen,
  updateMode,
  tag,
  handleUpdate,
  handleRemove,
  handleUpdateMode,
  handleOpen,
}: TagActionsProps) => {
  const inputRef = useRef<HTMLInputElement>(null);

  const handleExitUpdateMode = () => handleUpdateMode?.(null);

  const renderItem = (item: TagUpdateItem) => (
    <div css={styles.edit}>
      <SvgIcon size="10px">{item.icon}</SvgIcon>
      <span>{item.name}</span>
    </div>
  );

  const dropdownItemStyles = (item: TagUpdateItem) => [styles.dropdownItem];

  useEffect(() => {
    switch (updateMode) {
      case 'rename':
        inputRef?.current?.focus();
        break;
      default:
        break;
    }
  }, [updateMode]);

  const handleUpdateColor = (color: string) => {
    // handleUpdate?.(tag.id, {
    //   ...tag,
    //   color,
    // });
  };

  const handleRemoveAction = (event: MouseEvent<HTMLAnchorElement>) => {
    event.stopPropagation();
    if (!tag?.name) return;

    handleRemove?.(tag);
  };

  return (
    <>
      <div className="actions" css={styles.actions}>
        {handleUpdate && handleUpdateMode && handleOpen && (
          <Dropdown
            items={UPDATE_TAG_FUNCTIONS}
            handleSelected={handleUpdateMode}
            selectedItem={null}
            isOpen={isOpen}
            handleOpen={handleOpen}
            noBottomMargin={true}
            hideDropdownIcon={true}
            renderButtonText={
              <SvgIcon size="16px">
                <IconDots />
              </SvgIcon>
            }
            renderItem={renderItem}
            dropdownButtonStyles={[styles.dropdownButton]}
            dropdownMenuStyles={[styles.dropdown]}
            dropdownItemStyles={dropdownItemStyles}
          />
        )}
        {handleRemove && (
          <a onClick={handleRemoveAction} css={styles.action}>
            <SvgIcon size="16px">
              <IconClose />
            </SvgIcon>
          </a>
        )}
      </div>
      {updateMode === 'change-color' && (
        <TagColors
          handleClick={handleUpdateColor}
          onHide={handleExitUpdateMode}
        />
      )}
    </>
  );
};
