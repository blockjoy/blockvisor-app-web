import { styles } from './ProfileSwitch.styles';

type Props = {
  isChecked: boolean;
  onChecked: () => void;
};

const ProfileSwitch: React.FC<Props> = ({ isChecked, onChecked }) => {
  return (
    <>
      <input
        css={[styles.input]}
        id="darkmode-switch"
        type="checkbox"
        checked={isChecked}
        onChange={onChecked}
      />
      <label css={[styles.switch]} htmlFor="darkmode-switch">
        <span css={[styles.handle]} />
      </label>
    </>
  );
};

export default ProfileSwitch;
