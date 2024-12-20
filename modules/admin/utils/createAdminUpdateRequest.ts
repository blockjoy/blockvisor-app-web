export const createAdminUpdateRequest = <T = any>(
  defaultRequest: T,
  properties: AdminDetailProperty[],
) => {
  for (let property of properties) {
    const { field, isNumber, isBoolean, isArray, defaultValue } =
      property.editSettings!;
    defaultRequest[field!] = isNumber
      ? Number(defaultValue)
      : isArray
      ? JSON.parse(defaultValue!)
      : isBoolean
      ? defaultValue === 'true'
        ? true
        : false
      : defaultValue;
  }
  return defaultRequest;
};
