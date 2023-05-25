export const formatDate = (timestamp: number | Date): string => {
  let date = null;

  if (typeof timestamp === 'number') {
    date = new Date(timestamp * 1000);
  } else {
    date = timestamp;
  }
  return date!.toLocaleDateString('en-US');
};
