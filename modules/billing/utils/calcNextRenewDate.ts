export const calcNextAutoRenew = (autoRenew: string): Date => {
  let nextRenew = null;
  const today = new Date();

  switch (autoRenew) {
    case 'Monthly':
      nextRenew = new Date(today.setMonth(today.getMonth() + 1));
      break;
    case 'Annual':
      nextRenew = new Date(today.setFullYear(today.getFullYear() + 1));
      break;
    default:
      nextRenew = null;
  }

  return nextRenew!;
};
