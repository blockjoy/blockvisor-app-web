import { useRecoilValue } from 'recoil';

import { appState } from '@modules/app/store';

import styled from '@emotion/styled';

import { Button } from '@shared/components';

import { HostStatus } from './HostStatus';

const StyledHeader = styled.div`
  flex: 1 1 auto;
  display: flex;
  align-items: center;
  justify-content: space-between;
`;

const StyledTitle = styled.span`
  display: flex;
  align-items: center;
  justify-content: space-between;
  gap: 14px;
`;

const StyledTitleText = styled.span`
  font-size: 20px;
`;

const StyledActions = styled.span`
  display: flex;
  gap: 8px;
`;

const StyledFooter = styled.div`
  display: flex;
  gap: 12px;
  margin-top: 12px;
  color: ${(p) => p.theme.colorLabel};
`;

const StyledSkeleton = styled.span`
  display: block;
  background: #4d4f4d;
  border-radius: 4px;
  width: 100px;
  height: 20px;
`;

export default () => {
  const { activeHost } = useRecoilValue(appState);
  const handleStopClicked = () => null;
  const handleStartClicked = () => null;

  return (
    <>
      <StyledHeader>
        <StyledTitle>
          <StyledTitleText>
            {activeHost?.name || <StyledSkeleton style={{ width: '260px' }} />}
          </StyledTitleText>
          <HostStatus status={activeHost?.status} />
        </StyledTitle>
        <StyledActions>
          <Button
            style="secondary"
            size="small"
            type="button"
            // loading={loading}
            // customCss={[styles.action]}
          >
            Stop
          </Button>
          <Button
            disabled
            style="secondary"
            size="small"
            type="button"
            // loading={loading}
            // customCss={[styles.action]}
          >
            Start
          </Button>
        </StyledActions>
      </StyledHeader>
      <StyledFooter>
        <span>{activeHost.ip || <StyledSkeleton />}</span>
        <span>{activeHost.location}</span>
      </StyledFooter>
    </>
  );
};
