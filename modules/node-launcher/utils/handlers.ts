import { NodePropertyGroup } from '@modules/node';
import { Mixpanel } from '@shared/services/mixpanel';

export const handleNodeConfigProperties =
  (
    properties?: NodePropertyGroup[],
    updateProperties?: (nextProperties?: NodePropertyGroup[]) => void,
    resetError?: VoidFunction,
  ) =>
  (key: string, keyGroup: string, value: boolean | string) => {
    resetError?.();

    if (!properties?.length) return;

    const nextProperties = [...properties];

    const propertyIndex = nextProperties.findIndex(
      (property) => property.keyGroup === keyGroup,
    );

    if (propertyIndex === -1) return;

    const updatedProperty = {
      ...nextProperties[propertyIndex],
      key,
      value: value?.toString(),
    };

    nextProperties[propertyIndex] = updatedProperty;

    updateProperties?.(nextProperties);

    Mixpanel.track('Launch Node - Node Config Property Changed', {
      propertyName: updatedProperty.keyGroup,
      propertyValue: value?.toString(),
    });
  };
