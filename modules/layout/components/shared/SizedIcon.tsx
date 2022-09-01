import styled from "@emotion/styled";

type Props = {
    children?: React.ReactNode,
    size: string
}

const StyledIconWrapper = styled.span<Props>`
  display: grid;
  place-items: center;
  width: ${p => p.size};
  height: ${p => p.size};

  & path {
    color: ${p => p.theme.colorLabel};
  }
`;

const SizedIcon: React.FC<Props> = ({children, size}) => (
    <StyledIconWrapper size={size}>
      {children}
    </StyledIconWrapper>
);

export default SizedIcon;