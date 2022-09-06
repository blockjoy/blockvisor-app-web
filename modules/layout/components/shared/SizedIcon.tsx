import styled from "@emotion/styled";

type Props = {
    children?: React.ReactNode,
    className?: string,
    size: string
}

const StyledIconWrapper = styled.span<Props>`
  display: grid;
  place-items: center;
  width: ${p => p.size};
  height: ${p => p.size};

  & svg {
    width: 100%;
    height: 100%;
  }

  & path {
    color: ${p => p.theme.colorLabel};
  }
`;

const SizedIcon: React.FC<Props> = ({children, size, className}) => (
    <StyledIconWrapper size={size} className={className}>
      {children}
    </StyledIconWrapper>
);

export default SizedIcon;