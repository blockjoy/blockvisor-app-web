import styled from "@emotion/styled";

import IconBlockvisor from "@public/assets/icons/blockvisor-20.svg";

const StyledBlockvisor = styled(IconBlockvisor)`
  position: absolute;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);

  @media only screen and (min-width: ${p => p.theme.screenSm}) {
    display: none;
  }
`;

export default () => {
  return (
    <StyledBlockvisor />
  );
}
