export const createAdminUpdateRequest = (
  defaultRequest: any,
  properties: AdminDetailProperty[],
) => {
  for (let property of properties) {
    const { field, isNumber, defaultValue } = property.editSettings!;
    defaultRequest[field!] = isNumber ? +defaultValue! : defaultValue;
  }
  return defaultRequest;
};
