export const calcNextAutoRenew = (autoRenew: string): Date => {
  let nextRenew = null;
  const today = new Date();

  switch (autoRenew) {
    case 'month':
      nextRenew = new Date(today.setMonth(today.getMonth() + 1));
      break;
    case 'year':
      nextRenew = new Date(today.setFullYear(today.getFullYear() + 1));
      break;
    default:
      nextRenew = null;
  }

  return nextRenew!;
};
