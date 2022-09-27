export const queryAsString = (param: string | string[] | undefined) => {
  if (!param) {
    return '';
  }

  return Array.isArray(param) ? param[0] : param;
};
