import {
  ChangeEvent,
  KeyboardEvent,
  FC,
  useEffect,
  useRef,
  useState,
} from 'react';
import { styles } from './EditableTitle.styles';
import IconPencil from '@public/assets/icons/common/Pencil.svg';
import IconClose from '@public/assets/icons/common/Close.svg';
import { Button } from '../../../Buttons/Button/Button';
import { SvgIcon } from '../../../General/SvgIcon/SvgIcon';
import { escapeHtml } from '@shared/utils/escapeHtml';

type Props = {
  isLoading?: boolean;
  isSaving?: boolean;
  initialValue: string;
  onSaveClicked: (value: string) => void;
  onEditClicked: VoidFunction;
  canUpdate: boolean;
};

const setCaret = (el?: HTMLInputElement) => {
  if (!el) return;

  try {
    const range: Range = document.createRange();
    const sel: Selection = window.getSelection()!;

    range.setStart(el.childNodes[0], el.innerText.length);
    range.collapse(true);

    sel.removeAllRanges();
    sel.addRange(range);
  } catch (err) {
    console.log('Error Setting Caret: ', err);
  }
};

export const EditableTitle: FC<Props> = ({
  isLoading,
  isSaving,
  initialValue,
  onSaveClicked,
  onEditClicked,
  canUpdate,
}) => {
  const [isEditMode, setIsEditMode] = useState<boolean>(false);
  const [isValid, setIsValid] = useState<boolean>(true);
  const [isDirty, setIsDirty] = useState<boolean>(false);

  const inputRef = useRef<HTMLInputElement>(null);
  const inputValue = useRef<string>('');

  const handleEditToggled = () => {
    onEditClicked();

    if (isEditMode && inputRef.current) {
      inputRef.current.focus();
      inputRef.current.value = initialValue;
      inputValue.current = initialValue;
    }

    setIsEditMode(!isEditMode);
  };

  const handleChange = (e: ChangeEvent<HTMLInputElement>) => {
    const { innerText } = e.target;
    inputValue.current = innerText;
    setIsValid(innerText?.length > 0);
    setIsDirty(escapeHtml(innerText) !== escapeHtml(initialValue));
  };

  const handleKeyDown = (e: KeyboardEvent<HTMLInputElement>) => {
    if (e.key === 'Escape') {
      handleEditToggled();
      inputRef.current?.blur();
      return;
    }

    if (e.key !== 'Enter') return;
    handleSaveClicked();
  };

  const handleSaveClicked = () => {
    onSaveClicked(inputValue.current);
  };

  const handleBlur = () => {
    if (!isDirty) {
      handleEditToggled();
    }
  };

  useEffect(() => {
    inputValue.current = initialValue;
  }, []);

  useEffect(() => {
    if (isEditMode) {
      inputRef?.current?.focus();
      setCaret(inputRef.current!);
    }
  }, [isEditMode]);

  useEffect(() => {
    if (isSaving === false) {
      setIsEditMode(false);
    }
  }, [isSaving]);

  return (
    <div css={styles.wrapper}>
      {isEditMode ? (
        <div
          contentEditable
          spellCheck={false}
          ref={inputRef}
          css={[styles.input, isEditMode && styles.inputEditable]}
          onInput={handleChange}
          onKeyDown={handleKeyDown}
          onBlur={handleBlur}
          suppressContentEditableWarning
        >
          {initialValue}
        </div>
      ) : (
        <span css={styles.span}>{escapeHtml(initialValue)}</span>
      )}

      {canUpdate && !isLoading && initialValue?.length && (
        <Button
          style="icon"
          onClick={handleEditToggled}
          tooltip={isEditMode ? 'Cancel' : 'Edit Name'}
        >
          <span css={styles.iconWrapper}>
            <SvgIcon size="24px">
              {isEditMode ? <IconClose /> : <IconPencil />}
            </SvgIcon>
          </span>
        </Button>
      )}

      {isEditMode && canUpdate && (
        <>
          <Button
            disabled={isSaving || !isValid || !isDirty}
            loading={isSaving !== null}
            onClick={handleSaveClicked}
            size="small"
            style="secondary"
          >
            Save
          </Button>
        </>
      )}
    </div>
  );
};
