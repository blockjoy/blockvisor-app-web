export const getNameFromEnum = (
  prefix: string,
  enumList: any,
  key: number,
): string | undefined => {
  try {
    const nameString = enumList[key].replace(prefix, '')?.toString();

    return (
      nameString.charAt(0).toUpperCase() + nameString.toLowerCase().slice(1)
    );
  } catch (err) {
    console.log('getNameFromEnumError: Invalid prefix or enumList');
  }
};
