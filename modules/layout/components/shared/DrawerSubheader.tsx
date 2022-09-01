import styled from "@emotion/styled";

const StyledHeader = styled.header`
  color: #A5A8A3;
  letter-spacing: 1.5px;
  font-size: 10px;
  margin-bottom: 16px;
`;

type Props = {
    children: React.ReactNode
}

const ProfileSubheader: React.FC<Props> = ({ children }) => {
  return (
   <StyledHeader>
      {children}
   </StyledHeader>
  );
}

export default ProfileSubheader;
