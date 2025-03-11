import { ImageProperty } from '@modules/grpc/library/blockjoy/v1/image';
import { NodePropertyGroup } from '@modules/node/types/common';

export const generateProperties = (imageProperties?: ImageProperty[]) => {
  if (!imageProperties?.length) return [];

  const properties: NodePropertyGroup[] = [];

  const keyGroups = Array.from(
    new Set(
      imageProperties
        ?.filter((property) => property.keyGroup)
        ?.map((property) => property.keyGroup),
    ),
  );

  const propertyGroupsWithoutKey: NodePropertyGroup[] =
    imageProperties
      .filter((property) => !property.keyGroup)
      .map((property) => ({
        key: property.key,
        uiType: property.uiType,
        value: property.defaultValue || '',
        properties: [property],
        displayName: property.displayName!,
        displayGroup: property.displayGroup,
      })) ?? [];

  properties.push(...propertyGroupsWithoutKey!);

  for (let keyGroup of keyGroups) {
    const keyGroupProperties = imageProperties.filter(
      (property) => property.keyGroup === keyGroup,
    );

    const firstProperty = keyGroupProperties?.[0];

    if (!firstProperty) continue;

    const defaultProperty = imageProperties.find(
      (property) => property.keyGroup === keyGroup && property.isGroupDefault,
    );

    properties.push({
      key: defaultProperty?.key!,
      keyGroup: keyGroup!,
      uiType: firstProperty.uiType,
      value: defaultProperty?.key!,
      properties: keyGroupProperties!,
      displayName: firstProperty.displayName!,
      displayGroup: defaultProperty?.displayGroup,
    });
  }

  return properties;
};
