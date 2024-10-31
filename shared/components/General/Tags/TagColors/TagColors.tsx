import { useRef } from 'react';
import { Button, SvgIcon } from '@shared/components';
import { useClickOutside } from '@shared/index';
import { TAG_COLORS } from '@shared/constants/tag';
import { styles } from './TagColors.styles';
import IconClose from '@public/assets/icons/common/Close.svg';

type TagColorsProps = {
  handleClick?: any;
  onHide?: any;
};

export const TagColors = ({ handleClick, onHide }: TagColorsProps) => {
  const fieldRef = useRef<HTMLDivElement | null>(null);

  useClickOutside<HTMLDivElement>(fieldRef, onHide);

  const handleSubmit = (
    e: React.MouseEvent<HTMLButtonElement>,
    tagColor: string,
  ) => {
    e.stopPropagation();
    handleClick(tagColor);
    onHide();
  };

  const handleHide = (e: React.MouseEvent<HTMLButtonElement>) => {
    e.stopPropagation();
    onHide();
  };

  return (
    <div ref={fieldRef} css={styles.wrapper}>
      <h5 css={styles.heading}>Color</h5>
      <Button style="icon" size="small" onClick={handleHide} css={styles.close}>
        <SvgIcon size="12px">
          <IconClose />
        </SvgIcon>
      </Button>
      <ul css={styles.list}>
        {TAG_COLORS.map((tagColor) => (
          <li>
            <Button
              style="icon"
              size="small"
              customCss={[styles.button]}
              onClick={(e) => handleSubmit(e, tagColor)}
            >
              <span css={styles.item(tagColor)}></span>
            </Button>
          </li>
        ))}
      </ul>
    </div>
  );
};
