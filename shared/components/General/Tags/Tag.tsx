import { useEffect, useRef, useState } from 'react';
import { themeDefault } from 'themes';
import { Tag as TagType } from '@modules/grpc/library/blockjoy/common/v1/tag';
import { escapeHtml } from '@shared/utils/escapeHtml';
import { DeleteModal, Tooltip } from '@shared/components';
import { TagActions } from './TagActions/TagActions';
import { styles } from './Tag.styles';

type TagProps = {
  tag: TagType;
  color?: string;
  handleUpdate?: (id: string, tag?: TagType) => void;
  handleRemove?: (tag: TagType) => void;
  maxWidth?: number;
};

export const Tag = ({
  tag,
  color,
  handleUpdate,
  handleRemove,
  maxWidth,
}: TagProps) => {
  const tagRef = useRef<HTMLDivElement | null>(null);

  const [isOpenActions, setIsOpenActions] = useState(false);
  const [updateMode, setUpdateMode] = useState<TagUpdateMode | null>(null);

  const handleExitUpdateMode = () => setUpdateMode(null);

  const handleOpen = (open?: boolean) => {
    if (open) handleUpdateMode(null);
    setIsOpenActions(open!);
  };

  const handleDelete = () => {
    handleRemove?.(tag!);
    handleExitUpdateMode();
  };

  const handleUpdateMode = (item: TagUpdateItem | null) => {
    setUpdateMode(item?.id!);
  };

  return (
    <>
      <div
        css={styles.wrapper(
          color ?? themeDefault.colorBorder,
          isOpenActions,
          updateMode === 'change-color',
          maxWidth,
        )}
      >
        {tagRef.current &&
          maxWidth &&
          tagRef.current.scrollWidth > tagRef.current.offsetWidth && (
            <Tooltip noWrap customCss={[styles.tooltip]} tooltip={tag.name} />
          )}

        <span ref={tagRef} css={styles.tagName}>
          {tag.name}
        </span>
        {(handleRemove || handleUpdate) && (
          <TagActions
            isOpen={isOpenActions}
            updateMode={updateMode}
            tag={tag}
            // handleUpdate={handleUpdate}
            {...(handleRemove && { handleRemove: handleDelete })}
            // handleUpdateMode={handleUpdateMode}
            handleOpen={handleOpen}
          />
        )}
      </div>
      {updateMode === 'delete' && (
        <DeleteModal
          portalId="delete-node-tag"
          elementName={escapeHtml(tag.name!)}
          entityName="Tag"
          onHide={handleExitUpdateMode}
          onSubmit={handleDelete}
        />
      )}
    </>
  );
};
