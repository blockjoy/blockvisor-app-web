export const sortIpStringArray = (ips: string[]) => {
  const ipsCopy = [...ips];
  const sortedIps = ipsCopy.sort((a, b) => {
    const num1 = Number(
      a
        .split('.')
        .map((num) => `000${num}`.slice(-3))
        .join(''),
    );
    const num2 = Number(
      b
        .split('.')
        .map((num) => `000${num}`.slice(-3))
        .join(''),
    );
    return num1 - num2;
  });

  return sortedIps;
};
