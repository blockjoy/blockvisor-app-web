import { layoutState } from '@modules/layout/store/layoutAtoms';
import { useSetRecoilState } from 'recoil';

import styled from '@emotion/styled';

const StyledAvatar = styled.button`
  display: grid;
  place-items: center;
  width: 30px;
  min-width: 30px;
  max-width: 30px;
  height: 30px;
  padding: 0;
  font-size: 12px;
  border: 0;
  border-radius: 50%;
  background: #8f44fd;
  color: #f9f9f9;
  cursor: pointer;
`;

export default () => {
  const setLayout = useSetRecoilState(layoutState);

  const handleClick = () => {
    setLayout('profile');
  };

  return <StyledAvatar onClick={handleClick}>JH</StyledAvatar>;
};
