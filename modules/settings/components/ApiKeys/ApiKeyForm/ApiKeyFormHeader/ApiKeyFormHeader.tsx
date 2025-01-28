import { OrganizationPicker, SvgIcon } from '@shared/components';
import { styles } from './ApiKeyFormHeader.styles';
import IconKey from '@public/assets/icons/common/Key.svg';

type Props = {
  view?: ApiKeysView['drawer'];
};

export const ApiKeyFormHeader = ({ view }: Props) => {
  return (
    <div css={styles.wrapper}>
      {view === 'create' && (
        <div css={styles.orgPicker}>
          <OrganizationPicker />
          <span css={styles.separator}>/</span>
        </div>
      )}
      <div css={styles.title}>
        <SvgIcon isDefaultColor size="16px">
          <IconKey />
        </SvgIcon>
        <h4>{`${view === 'create' ? 'Add' : ''} API key`}</h4>
      </div>
    </div>
  );
};
