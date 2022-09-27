import { styles } from './OrganisationDetails.styles';
import IconPencil from 'public/assets/icons/pencil-3-16.svg';
import { FocusEventHandler, useEffect, useRef, useState } from 'react';
import { Button } from '@shared/components';
import { useOrganisations } from '@modules/organisations/hooks/useOrganisations';
import { toast } from 'react-toastify';

type Props = {
  name: string;
  id: string;
};

export function OrganisationDetails({ name, id }: Props) {
  const { renameOrganisation } = useOrganisations();
  const [isEditable, setIsEditable] = useState(false);
  const fieldRef = useRef<HTMLHeadingElement>(null);

  useEffect(() => {
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
  }, [isEditable]);

  const handleBlur: FocusEventHandler<HTMLHeadingElement> = (e) => {
    const id = e.currentTarget.id;
    const value = e.currentTarget.innerHTML;
    renameOrganisation(id, value);
    toast.success('Organisation renamed');
    setIsEditable(false);
  };

  const handleOnClick = () => {
    if (fieldRef.current) {
      setIsEditable(true);
      fieldRef.current.focus();
    }
  };

  return (
    <header css={styles.base}>
      <h2
        onFocus={() => console.log('focused')}
        tabIndex={0}
        id={id}
        ref={fieldRef}
        css={[styles.title]}
        onBlur={handleBlur}
        contentEditable={isEditable}
        suppressContentEditableWarning={true}
      >
        {name}{' '}
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
