import styled from "@emotion/styled";

type Props = {
    id: string,
    address: string,
    name: string
}

const StyledWrapper = styled.span`
    display: block;
`;

const StyledName = styled.span`
  display: block;
  margin-bottom: 10px;
  color: ${p => p.theme.colorText};
`;

const StyledRow = styled.span`
  display: flex;
  flex-direction: column;
  gap: 8px;

  @media only screen and (min-width: ${p => p.theme.screenSm}) {
    flex-direction: row;
    gap: 0;
  }
`;

const StyledId = styled.span`
    color: ${p => p.theme.colorDefault};

    @media only screen and (min-width: ${p => p.theme.screenSm}) {
      overflow: hidden;
      text-overflow: ellipsis;
      white-space: nowrap;
      max-width: 130px;
    }
`;

const StyledAddress = styled.span`
  color: ${p => p.theme.colorLabel};

  @media only screen and (min-width: ${p => p.theme.screenSm}) {
    flex-direction: row;
    gap: 0;
  }
`;

const NodesTableBlock: React.FC<Props> = ({ name, id, address }) => (
    <StyledWrapper>
        <StyledName className="has-hover-color">
            {name}
        </StyledName>
        <StyledRow>
            <StyledId>
                {id}
            </StyledId>
            <StyledAddress>
                {address}
            </StyledAddress>
        </StyledRow>
    </StyledWrapper>
);

export default NodesTableBlock;