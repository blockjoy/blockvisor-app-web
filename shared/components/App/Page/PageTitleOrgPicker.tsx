import { OrganizationPicker } from '@shared/components';
import { styles } from './PageTitleOrgPicker.styles';

export const PageTitleOrgPicker = () => {
  return (
    <div css={styles.wrapper}>
      <OrganizationPicker />
    </div>
  );
};
