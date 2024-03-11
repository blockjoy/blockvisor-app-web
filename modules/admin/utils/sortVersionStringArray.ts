export const sortVersionStringArray = (list: string[] | undefined) => {
  if (!list) return [];

  const toVersion = (raw: string) =>
    raw.split('.').map((elem) => +elem.replace(/\D/g, ''));

  const compareVersions = (v1: number[], v2: number[]) => {
    const len = v1.length > v2.length ? v2.length : v1.length;
    for (let idx = 0; idx < len; ++idx) {
      if (v1[idx] < v2[idx]) {
        return 1;
      } else if (v1[idx] > v2[idx]) {
        return -1;
      }
    }
    return 0;
  };

  return [...list].sort((v1, v2) =>
    compareVersions(toVersion(v1), toVersion(v2)),
  );
};
