export const formatters = {
  plain: (value: number) => value,
  formatBytes: (bytes: number) => {
    const gb = bytes / Math.pow(1024, 3);
    if (gb < 1024) return `${gb.toFixed(0)} GB`;

    const tb = gb / 1024;
    return `${tb.toFixed(0)} TB`;
  },
};
