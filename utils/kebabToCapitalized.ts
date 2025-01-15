export const kebabToCapitalized = (input: string): string => {
  return input
    .split('-') // Split by dashes
    .join(' ')
    .toLowerCase(); // Join with spaces
};
