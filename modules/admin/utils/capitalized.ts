export const capitalized = (word: string) => {
  if (!word) return;
  const result = word.replace(/([A-Z])/g, ' $1');
  return result.charAt(0).toUpperCase() + result.slice(1);
};
