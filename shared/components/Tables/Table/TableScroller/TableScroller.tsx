import {
  useEffect,
  useLayoutEffect,
  useRef,
  useState,
  useCallback,
} from 'react';
import { styles } from './TableScroller.styles';

type Props = {
  wrapperRef?: React.MutableRefObject<HTMLDivElement | null>;
  tableRef?: React.MutableRefObject<HTMLTableElement | null>;
};

export const TableScroller = ({ tableRef, wrapperRef }: Props) => {
  const scrollbarRef = useRef<HTMLDivElement | null>(null);

  const [tableWidth, setTableWidth] = useState(0);
  const [wrapperWidth, setWrapperWidth] = useState(0);

  const [isVisible, setIsVisible] = useState(false);

  useLayoutEffect(() => {
    if (!tableRef?.current || !wrapperRef?.current) return;

    const updateWidths = () => {
      setTableWidth(tableRef.current!.offsetWidth);
      setWrapperWidth(wrapperRef.current!.offsetWidth);
    };

    updateWidths();

    const tableObserver = new ResizeObserver(updateWidths);
    const wrapperObserver = new ResizeObserver(updateWidths);

    tableObserver.observe(tableRef.current);
    wrapperObserver.observe(wrapperRef.current);

    return () => {
      tableObserver.disconnect();
      wrapperObserver.disconnect();
    };
  }, [tableRef, wrapperRef]);

  useEffect(() => {
    const tableContainer = wrapperRef?.current;
    const scrollbar = scrollbarRef.current;

    if (!tableContainer || !scrollbar) return;

    scrollbar.scrollLeft = tableContainer.scrollLeft;

    const handleTableScroll = () => {
      scrollbar.scrollLeft = tableContainer.scrollLeft;
    };

    const handleScrollbarScroll = () => {
      tableContainer.scrollLeft = scrollbar.scrollLeft;
    };

    tableContainer.addEventListener('scroll', handleTableScroll);
    scrollbar.addEventListener('scroll', handleScrollbarScroll);

    return () => {
      tableContainer.removeEventListener('scroll', handleTableScroll);
      scrollbar.removeEventListener('scroll', handleScrollbarScroll);
    };
  }, [wrapperRef, isVisible]);

  const handleWindowSizeChange = useCallback(() => {
    const tableHeight = tableRef?.current?.clientHeight || 0;
    const isNowVisible = tableHeight > window.innerHeight - 172;

    if (isNowVisible !== isVisible) setIsVisible(isNowVisible);
  }, [isVisible, tableRef]);

  useLayoutEffect(() => {
    handleWindowSizeChange();

    window.addEventListener('resize', handleWindowSizeChange);

    return () => {
      window.removeEventListener('resize', handleWindowSizeChange);
    };
  }, [handleWindowSizeChange]);

  return (
    <div
      ref={scrollbarRef}
      css={styles.wrapper(isVisible)}
      style={{ width: wrapperWidth }}
    >
      <div style={{ width: tableWidth }} css={styles.scroller}></div>
    </div>
  );
};
