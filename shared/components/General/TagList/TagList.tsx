import {
  ChangeEvent,
  KeyboardEvent,
  MouseEvent,
  useEffect,
  useRef,
  useState,
} from 'react';
import { toast } from 'react-toastify';
import { styles } from './TagList.styles';
import { SvgIcon, Tag } from '@shared/components';
import IconClose from '@public/assets/icons/common/Close.svg';
import IconCheck from '@public/assets/icons/common/Check2.svg';

type Props = {
  id?: string;
  tags: string[];
  isInTable?: boolean;
  shouldWrap?: boolean;
  showToasts?: boolean;
  onRemove?: (newTags: string[], id?: string) => void;
  onAdd?: (newTag: string, id?: string) => void;
};

export const TagList = ({
  id,
  tags,
  isInTable = false,
  shouldWrap,
  showToasts = true,
  onAdd,
  onRemove,
}: Props) => {
  const [isAddMode, setIsAddMode] = useState(false);

  const [newTag, setNewTag] = useState('');

  const inputRef = useRef<HTMLInputElement>(null);

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
    onAdd?.(newTag, id);
    setIsAddMode(false);
    setNewTag('');
    if (showToasts) toast.success('Tag Added');
  };

  const handleInput = (e: ChangeEvent<HTMLSpanElement>) =>
    setNewTag(e.target.innerText.replace(/\n/g, ''));

  const handleEnterSubmit = (e: KeyboardEvent<HTMLInputElement>) => {
    if (e.key === 'Enter') {
      e.stopPropagation();
      e.preventDefault();
      handleAddConfirm();
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
    <ul css={[styles.tagList, shouldWrap && styles.tagListWrap]}>
      {tags.map((tag) => (
        <li key={tag}>
          <Tag name={tag} onRemove={handleRemove!} />
        </li>
      ))}
      <li css={styles.listItem}>
        {!isAddMode && (
          <button
            className="add-tag-button"
            css={[
              styles.tagAddButton,
              tags?.length && isInTable && styles.tagAddButtonNotEmpty,
            ]}
            type="button"
            onClick={handleAdd}
          >
            Add Tag
          </button>
        )}
        {isAddMode && (
          <>
            <span
              ref={inputRef}
              onInput={handleInput}
              onKeyUp={handleEnterSubmit}
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
              disabled={!newTag?.length}
            >
              <span>
                <SvgIcon size="12px">
                  <IconCheck />
                </SvgIcon>
              </span>
            </button>
          </>
        )}
      </li>
    </ul>
  );
};
