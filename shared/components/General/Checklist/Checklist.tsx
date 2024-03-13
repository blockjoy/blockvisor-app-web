import { styles } from './Checklist.styles';
import { SvgIcon } from '@shared/components';
import IconCheckmark from '@public/assets/icons/common/Checkmark.svg';

type ChecklistItem = {
  name: string;
  title: string;
  description: string;
};

type ChecklistProps = {
  items: ChecklistItem[];
};

export const Checklist = ({ items }: ChecklistProps) => {
  return (
    <div css={styles.container}>
      <ul>
        {items.map((li: ChecklistItem) => (
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
