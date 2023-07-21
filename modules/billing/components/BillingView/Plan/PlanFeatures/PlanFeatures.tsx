import { styles } from './PlanFeatures.styles';
import { SvgIcon } from '@shared/components';
import IconCheckmark from '@public/assets/icons/common/Checkmark.svg';

type Feature = {
  id: string;
  title: string;
  description: string;
};

type PlanFeaturesProps = {
  features: Feature[];
};

export const PlanFeatures = ({ features }: PlanFeaturesProps) => {
  return (
    <div css={styles.listContainer}>
      <ul css={styles.list}>
        {features.map((feature: Feature) => (
          <li key={feature.id} css={styles.listItem}>
            <SvgIcon size="12px" isDefaultColor>
              <IconCheckmark />
            </SvgIcon>
            <p>
              <span css={styles.listTitle}>{feature.title}</span>:{' '}
              <span>{feature.description}</span>
            </p>
          </li>
        ))}
      </ul>
    </div>
  );
};
