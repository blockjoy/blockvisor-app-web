import styled from "@emotion/styled";

type Props = {
    address: string,
    location: string,
    name: string
}

const StyledWrapper = styled.span`
    display: block;
`;

const StyledName = styled.span`
  display: block;
  margin-bottom: 10px;
`;

const StyledRow = styled.span`
  display: flex;
  flex-direction: column;
  gap: 8px;

  @media only screen and (min-width: ${p => p.theme.screenSm}) {
    flex-direction: row;
    gap: 16px;
  }
`;

const StyledLocation = styled.span`
    color: ${p => p.theme.colorLabel};
`;

const StyledAddress = styled.span`
  color: ${p => p.theme.colorLabel};

  @media only screen and (min-width: ${p => p.theme.screenSm}) {
    flex-direction: row;
    gap: 0;
  }
`;

const NodesTableBlock: React.FC<Props> = ({ name, id, address, location }) => (
    <StyledWrapper>
        <StyledName className="has-hover-color">
            {name}
        </StyledName>
        <StyledRow>
            <StyledAddress>
                {address}
            </StyledAddress>
            <StyledLocation>
                <span className="uil uil-location-point" />
                {location}
            </StyledLocation>
        </StyledRow>
    </StyledWrapper>
);

export default NodesTableBlock;