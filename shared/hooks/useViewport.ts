import { useLayoutEffect, useState } from 'react';
import { viewportBreakpoints } from '@shared/constants/viewport';

export const useViewport = () => {
  const [width, setWidth] = useState(0);

  const handleWindowSizeChange = () => {
    setWidth(window.innerWidth);
  };

  useLayoutEffect(() => {
    handleWindowSizeChange();

    window.addEventListener('resize', handleWindowSizeChange);

    return () => {
      window.removeEventListener('resize', handleWindowSizeChange);
    };
  }, []);

  const isTny = width < viewportBreakpoints.tny;
  const isSml = width < viewportBreakpoints.sml;
  const isMed = width < viewportBreakpoints.med;
  const isLrg = width < viewportBreakpoints.lrg;
  const isXlrg = width < viewportBreakpoints.xLrg;
  const isHuge = width < viewportBreakpoints.huge;
  const isXHuge = width < viewportBreakpoints.xHuge;

  return {
    isTny,
    isSml,
    isMed,
    isLrg,
    isXlrg,
    isHuge,
    isXHuge,
  };
};
