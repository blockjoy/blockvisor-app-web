import { useRecoilState } from 'recoil';
import { GridTableViewPicker } from '@shared/components';
import { styles } from './HostListHeader.styles';
import { hostAtoms } from '@modules/host/store/hostAtoms';

export const HostListHeader = () => {
  const [activeListType, setActiveListType] = useRecoilState(
    hostAtoms.activeListType,
  );

  const handleActiveListType = (type: string) => {
    setActiveListType(type);
  };

  return (
    <div css={styles.wrapper}>
      <div css={[styles.endBlock, styles.listTypePicker]}>
        <GridTableViewPicker
          onChange={handleActiveListType}
          activeListType={activeListType}
        />
      </div>
    </div>
  );
};
