import { styles } from './List.styles';
import { SvgIcon } from '@shared/components';
import IconCheckmark from '@public/assets/icons/common/Checkmark.svg';

type ListItem = {
  name: string;
  title: string;
  description: string;
};

type ListProps = {
  items: ListItem[];
};

export const List = ({ items }: ListProps) => {
  return (
    <div css={styles.container}>
      <ul>
        {items.map((li: ListItem) => (
          <li key={li.name} css={styles.li}>
            <SvgIcon size="12px" isDefaultColor>
              <IconCheckmark />
            </SvgIcon>
            <p>
              <span css={styles.title}>{li.title}</span>:{' '}
              <span>{li.description}</span>
            </p>
          </li>
        ))}
      </ul>
    </div>
  );
};
