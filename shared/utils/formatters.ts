export const formatters = {
  plain: (value: number) => value,
  formatBytes: (bytes: number) => {
    const gb = bytes / Math.pow(1024, 3);
    if (gb < 1024) return `${gb} GB`;

    const tb = gb / 1024;
    return `${tb} TB`;
  },
};
