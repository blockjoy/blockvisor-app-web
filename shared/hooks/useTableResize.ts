import { useState, useRef, useEffect } from 'react';

export const useTableResize = (
  headersRef: React.MutableRefObject<(HTMLTableCellElement | null)[]>,
  columns?: TableHeader[],
  setColumns?: React.Dispatch<React.SetStateAction<TableHeader[]>>,
  handleUpdateColumns?: (columns: TableColumn[]) => void,
) => {
  const [isResizing, setIsResizing] = useState(false);

  const resizeStartX = useRef(0);
  const resizeIndex = useRef<number | null>(null);
  const initialWidth = useRef(0);
  const finalWidth = useRef(0);

  const handleMouseDown = (
    e: React.MouseEvent<HTMLDivElement>,
    index: number,
  ) => {
    e.preventDefault();
    e.stopPropagation();

    setIsResizing(true);

    resizeIndex.current = index;
    resizeStartX.current = e.clientX;

    const header = headersRef.current[index];

    if (header) {
      const headerWidth = header.getBoundingClientRect().width;
      initialWidth.current = headerWidth;
      finalWidth.current = headerWidth;
    }

    document.addEventListener('mousemove', handleMouseMove);
    document.addEventListener('mouseup', handleMouseUp);
  };

  const handleMouseMove = (e: MouseEvent) => {
    if (resizeIndex.current === null) return;

    const delta = e.clientX - resizeStartX.current;

    const activeCol = columns?.[resizeIndex.current];
    const minWidth = activeCol?.minWidth ? parseInt(activeCol.minWidth) : 100;
    const maxWidth = activeCol?.maxWidth ? parseInt(activeCol.maxWidth) : 1000;

    const newWidth = initialWidth.current + delta;

    if (!newWidth) return;

    finalWidth.current = Math.max(minWidth, Math.min(newWidth, maxWidth));

    const updatedColumns = [...(columns ?? [])];
    updatedColumns[resizeIndex.current] = {
      ...updatedColumns[resizeIndex.current],
      width: `${finalWidth.current}px`,
    };
    setColumns?.(updatedColumns);
  };

  const handleMouseUp = () => {
    const column =
      resizeIndex.current !== null ? columns?.[resizeIndex.current] : null;

    if (column && initialWidth.current !== finalWidth.current) {
      handleUpdateColumns?.([
        {
          key: column.key,
          width: `${finalWidth.current}px`,
        },
      ]);
    }

    setIsResizing(false);

    resizeIndex.current = null;
    initialWidth.current = 0;
    finalWidth.current = 0;

    document.removeEventListener('mousemove', handleMouseMove);
    document.removeEventListener('mouseup', handleMouseUp);
  };

  useEffect(() => {
    return () => {
      document.removeEventListener('mousemove', handleMouseMove);
      document.removeEventListener('mouseup', handleMouseUp);
    };
  }, []);

  return {
    isResizing,
    resizeIndex: resizeIndex.current,
    handleMouseDown,
  };
};
