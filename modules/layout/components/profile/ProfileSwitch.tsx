// import { useRecoilValue } from "recoil";
// import { appState } from "@modules/layout/store";

import styled from "@emotion/styled";

type Props = {
  isChecked: boolean,
  onChecked: () => void
}

type EmotionProps = {
    checked: boolean,
  }

const StyledSwitch = styled.label<any>`
    display: block;
    width: 60px;
    border-radius: 19px;
    padding: 4px;
    background: ${p => p.theme.colorActive};
    cursor: pointer;
`;

const StyledHandle = styled.span`
  display: block;
  width: 20px;
  height: 20px;
  border-radius: 15px;
  background: ${p => p.theme.colorPrimary};
  transition: transform 0.3s;
`;

const StyledInput = styled.input<EmotionProps>`
  position: absolute;
  transform: scale(0);

  &:checked ~ ${StyledSwitch} ${StyledHandle} {
    transform: translateX(32px);
  }
`;

const ProfileSwitch: React.FC<Props> = ({ isChecked, onChecked }) => {
  return (
    <>
        <StyledInput id="darkmode-switch" type="checkbox" checked={isChecked} onChange={onChecked} />
        <StyledSwitch htmlFor="darkmode-switch">
            <StyledHandle />
        </StyledSwitch>
    </>
   
  );
}

export default ProfileSwitch;