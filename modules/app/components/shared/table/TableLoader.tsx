import styled from "@emotion/styled";

import { keyframes, css } from "@emotion/react";

type Props = {
    isLoading: boolean
}

const loadingStyles = css`
    visibility: visible;
    opacity: 1;
`;

const StyledWrapper = styled.div<Props>`
    position: absolute;
    top: 0;
    left: 0;
    display: grid;
    place-items: center;
    width: 100%;
    height: 100%;
    backdrop-filter: blur( 4px );
    -webkit-backdrop-filter: blur( 4px );
    visibility: hidden;
    opacity: 0;
    transition: all 0.4s;

    ${p => p.isLoading && loadingStyles};
`;

const spinKeyframes = keyframes`
    100% { transform: rotate(360deg); }
`;

const StyledSpinner = styled.div`
  width: 80px;
  height: 80px;
  border-radius: 50%;
  border: 3px solid ${p => p.theme.colorLightGrey};
  border-top-color: ${p => p.theme.colorPrimary};
  animation: ${spinKeyframes} 0.7s infinite linear;
`;


const TableLoader: React.FC<Props> = ({ isLoading }) => {
    return (
        <StyledWrapper isLoading={isLoading}>
            <StyledSpinner />
        </StyledWrapper>
    )
}

export default TableLoader;