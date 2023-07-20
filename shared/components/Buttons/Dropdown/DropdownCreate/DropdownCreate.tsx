import { styles } from './DropdownCreate.styles';
import IconPlus from '@public/assets/icons/common/Plus.svg';

type DropdownCreateProps = {
  title: string;
  handleClick: VoidFunction;
};

export const DropdownCreate = ({ title, handleClick }: DropdownCreateProps) => {
  return (
    <button css={[styles.button]} onClick={handleClick}>
      <IconPlus />
      {title}
    </button>
  );
};
