import {
  ChangeEvent,
  KeyboardEvent,
  MouseEvent,
  useEffect,
  useRef,
  useState,
} from 'react';
import { styles } from './TagList.styles';
import { SvgIcon, Tag } from '@shared/components';
import IconClose from '@public/assets/icons/common/Close.svg';
import IconCheck from '@public/assets/icons/common/Check2.svg';
import IconPlus from '@public/assets/icons/common/Plus.svg';

type Props = {
  id?: string;
  tags: string[];
  isInTable?: boolean;
  shouldWrap?: boolean;
  onRemove?: (newTags: string[], id?: string) => void;
  onAdd?: (newTag: string, id?: string) => void;
};

export const TagList = ({
  id,
  tags,
  isInTable = false,
  shouldWrap,
  onAdd,
  onRemove,
}: Props) => {
  const [isAddMode, setIsAddMode] = useState(false);

  const [newTag, setNewTag] = useState('');

  const inputRef = useRef<HTMLInputElement>(null);

  const isValid =
    newTag?.length > 0 &&
    !tags.some(
      (tag) => tag.trim().toLowerCase() === newTag.trim().toLowerCase(),
    );

  const handleRemove = (name: string) => {
    const newTags = tags.filter((tag) => tag !== name);
    onRemove?.(newTags, id);
  };

  const handleAdd = (e: MouseEvent<HTMLButtonElement>) => {
    e.stopPropagation();
    e.preventDefault();
    setIsAddMode(true);
  };

  const handleAddConfirm = () => {
    if (!isValid) return;
    onAdd?.(newTag, id);
    setIsAddMode(false);
    setNewTag('');
  };

  const handleInput = (e: ChangeEvent<HTMLSpanElement>) =>
    setNewTag(e.target.innerText.trim());

  const handleKeyUp = (e: KeyboardEvent<HTMLSpanElement>) => {
    if (e.key === 'Enter' && isValid) {
      e.stopPropagation();
      e.preventDefault();
      handleAddConfirm();
    }
  };

  const handleKeyDown = (e: KeyboardEvent<HTMLSpanElement>) => {
    if (e.key === 'Enter') {
      e.preventDefault();
    }
  };

  const handleCancel = () => {
    setNewTag('');
    setIsAddMode(false);
  };

  useEffect(() => {
    if (isAddMode) {
      inputRef.current?.focus();
    }
  }, [isAddMode]);

  return (
    <>
      <ul css={[styles.tagList, shouldWrap && styles.tagListWrap]}>
        {tags?.map((tag) => (
          <li key={tag}>
            <Tag name={tag} onRemove={handleRemove!} />
          </li>
        ))}
        <li css={styles.listItem}>
          {!isAddMode && (
            <button
              className="add-tag-button"
              css={[
                styles.tagAddButton(!tags?.length),
                tags?.length && isInTable && styles.tagAddButtonNotEmpty,
              ]}
              type="button"
              onClick={handleAdd}
            >
              <SvgIcon size="11px" isDefaultColor>
                <IconPlus />
              </SvgIcon>
              {!tags?.length && 'Add Tag'}
            </button>
          )}
          {isAddMode && (
            <div css={styles.addControls}>
              <span
                ref={inputRef}
                onInput={handleInput}
                onKeyUp={handleKeyUp}
                onKeyDown={handleKeyDown}
                css={[
                  styles.tagAddInput,
                  newTag !== '' && styles.tagAddInputNotEmpty,
                ]}
                contentEditable={isAddMode}
              />
              <button
                type="button"
                css={styles.iconButton}
                onClick={handleCancel}
              >
                <span>
                  <SvgIcon size="12px">
                    <IconClose />
                  </SvgIcon>
                </span>
              </button>
              <button
                type="button"
                css={styles.iconButton}
                onClick={handleAddConfirm}
                disabled={!isValid}
              >
                <span>
                  <SvgIcon size="12px">
                    <IconCheck />
                  </SvgIcon>
                </span>
              </button>
            </div>
          )}
        </li>
      </ul>
    </>
  );
};
