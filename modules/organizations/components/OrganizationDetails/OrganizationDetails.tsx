import { styles } from './OrganizationDetails.styles';
import IconPencil from 'public/assets/icons/pencil-3-16.svg';
import {
  FocusEventHandler,
  KeyboardEventHandler,
  useEffect,
  useRef,
  useState,
} from 'react';
import { Button } from '@shared/components';
import { toast } from 'react-toastify';
import { useGetOrganizationById } from '@modules/organizations/hooks/useGetOrganizationById';
import { useRouter } from 'next/router';
import { queryAsString } from '@shared/utils/query';
import { useUpdateOrganization } from '@modules/organizations/hooks/useUpdateOrganization';
import { stripAndSanitize } from '@shared/index';

type Props = {
  name?: string;
  id?: string;
};

export function OrganizationDetails({ name, id }: Props) {
  const router = useRouter();
  const { getOrganization, organization } = useGetOrganizationById();
  const { updateOrganization } = useUpdateOrganization();
  const [isEditable, setIsEditable] = useState(false);
  const fieldRef = useRef<HTMLHeadingElement>(null);

  useEffect(() => {
    if (!id) {
      getOrganization(queryAsString(router.query.id));
    }
  }, [id, router.query.id]);

  const focusField = () => {
    if (fieldRef.current) {
      fieldRef.current.focus();
      // move caret to end
      const textLength = fieldRef.current.innerText.length;
      const range = document.createRange();
      const sel = window.getSelection();

      range.setStart(fieldRef.current.childNodes[0], textLength);
      range.collapse(true);

      sel?.removeAllRanges();
      sel?.addRange(range);
    }
  };

  const handleBlur: FocusEventHandler<HTMLHeadingElement> = async (e) => {
    if (fieldRef.current && !isEditable) {
      fieldRef.current.blur();
      fieldRef.current.textContent = name || organization?.name || '';
    }
  };

  const handleKeyDown: KeyboardEventHandler<HTMLHeadingElement> = (e) => {
    if (e.key !== 'Enter') {
      return;
    }

    const id = e.currentTarget.id;
    const value = stripAndSanitize(e.currentTarget.textContent ?? '');

    if (fieldRef.current) {
      fieldRef.current.textContent = value;
    }

    if (value) {
      try {
        updateOrganization(id, value);
        fieldRef.current?.blur();
        toast.success('Organisation renamed');
        setIsEditable(false);
      } catch (error) {
        toast.error('Rename failed');
      }
    }
  };

  const handleOnClick = () => {
    setIsEditable(true);
    focusField();
  };

  return (
    <header css={styles.base}>
      <h2
        onKeyDown={handleKeyDown}
        tabIndex={0}
        id={id ?? organization?.id}
        ref={fieldRef}
        css={[styles.title]}
        onBlur={handleBlur}
        contentEditable={isEditable}
        suppressContentEditableWarning={true}
      >
        {name ?? organization?.name}{' '}
      </h2>{' '}
      <Button
        customCss={[styles.editable]}
        size="medium"
        style="basic"
        onClick={handleOnClick}
      >
        <IconPencil />
      </Button>
    </header>
  );
}
